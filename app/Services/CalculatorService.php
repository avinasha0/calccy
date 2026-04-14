<?php

namespace App\Services;

use InvalidArgumentException;

class CalculatorService
{
    public function calculate(string $slug, array $input): array
    {
        return match ($slug) {
            'salary-calculator', 'ctc-to-in-hand-calculator', 'monthly-salary-breakdown-tool' => $this->salary($input),
            'old-vs-new-tax-regime-calculator' => $this->regimeComparison($input),
            'income-tax-calculator-india' => $this->incomeTax($input),
            'salary-hike-calculator' => $this->salaryHike($input),
            'bonus-variable-pay-calculator' => $this->bonus($input),
            'pf-calculator' => $this->pf($input),
            'home-loan-emi-calculator', 'personal-loan-emi-calculator' => $this->emi($input),
            'emi-affordability-calculator' => $this->emiAffordability($input),
            'rent-vs-buy-calculator' => $this->rentVsBuy($input),
            'rental-yield-calculator' => $this->rentalYield($input),
            'property-roi-calculator' => $this->propertyRoi($input),
            'pg-income-calculator' => $this->pgIncome($input),
            'construction-cost-calculator' => $this->construction($input),
            'stamp-duty-calculator-india' => $this->stampDuty($input),
            'sip-calculator' => $this->sip($input),
            'lumpsum-investment-calculator', 'compound-interest-calculator' => $this->lumpsum($input),
            'loan-eligibility-calculator' => $this->loanEligibility($input),
            'credit-card-interest-calculator' => $this->cardInterest($input),
            'gst-calculator-india' => $this->gst($input),
            'invoice-generator-pdf' => $this->invoice($input),
            'profit-margin-calculator' => $this->profitMargin($input),
            'break-even-calculator' => $this->breakEven($input),
            'wealth-comparison-tool-india' => $this->wealthCompare($input),
            'time-to-become-crorepati-calculator' => $this->crorepati($input),
            'can-you-afford-this-house-tool' => $this->houseAffordability($input),
            'salary-vs-lifestyle-calculator' => $this->lifestyle($input),
            default => throw new InvalidArgumentException('Unsupported tool slug.'),
        };
    }

    private function salary(array $input): array
    {
        $ctc = (float) ($input['ctc'] ?? 0);
        $pfPercent = (float) ($input['pfPercent'] ?? 12);
        $deductions = (float) ($input['deductions'] ?? 0);
        $regime = (string) ($input['taxRegime'] ?? 'new');
        $pf = $ctc * ($pfPercent / 100);
        $taxable = max($ctc - $pf - $deductions, 0);
        $tax = $this->taxByRegime($taxable, $regime);
        $cess = $tax * 0.04;
        $net = max($ctc - $pf - $deductions - $tax - $cess, 0);
        return ['monthlyInHand' => round($net / 12, 2), 'yearlyInHand' => round($net, 2), 'incomeTax' => round($tax + $cess, 2), 'employeePf' => round($pf, 2)];
    }

    private function regimeComparison(array $input): array
    {
        $income = (float) ($input['taxableIncome'] ?? 0);
        $oldTax = $this->taxByRegime($income, 'old') * 1.04;
        $newTax = $this->taxByRegime($income, 'new') * 1.04;
        return ['oldRegimeTax' => round($oldTax, 2), 'newRegimeTax' => round($newTax, 2), 'savings' => round(abs($oldTax - $newTax), 2)];
    }

    private function incomeTax(array $input): array
    {
        $income = (float) ($input['taxableIncome'] ?? 0);
        $regime = (string) ($input['taxRegime'] ?? 'new');
        $tax = $this->taxByRegime($income, $regime);
        $cess = $tax * 0.04;
        return ['taxableIncome' => round($income, 2), 'incomeTax' => round($tax, 2), 'cess' => round($cess, 2), 'totalTax' => round($tax + $cess, 2)];
    }

    private function salaryHike(array $input): array
    {
        $current = (float) ($input['currentSalary'] ?? 0);
        $hike = (float) ($input['hikePercent'] ?? 0);
        $new = $current * (1 + ($hike / 100));
        return ['newSalary' => round($new, 2), 'monthlyIncrement' => round(($new - $current) / 12, 2), 'annualIncrement' => round($new - $current, 2)];
    }

    private function bonus(array $input): array
    {
        $base = (float) ($input['baseSalary'] ?? 0);
        $bonus = (float) ($input['bonusPercent'] ?? 0);
        $variable = (float) ($input['variablePercent'] ?? 0);
        $bonusValue = $base * $bonus / 100;
        $variableValue = $base * $variable / 100;
        return ['bonusAmount' => round($bonusValue, 2), 'variablePay' => round($variableValue, 2), 'totalPayout' => round($base + $bonusValue + $variableValue, 2)];
    }

    private function pf(array $input): array
    {
        $basic = (float) ($input['basicSalary'] ?? 0);
        $rate = (float) ($input['pfPercent'] ?? 12);
        $employee = $basic * $rate / 100;
        $employer = $employee;
        return ['employeePfMonthly' => round($employee, 2), 'employerPfMonthly' => round($employer, 2), 'yearlyTotalPf' => round(($employee + $employer) * 12, 2)];
    }

    private function emi(array $input): array
    {
        $principal = (float) ($input['principal'] ?? 0);
        $annual = (float) ($input['annualRate'] ?? 0);
        $years = (float) ($input['years'] ?? 0);
        $r = $annual / 1200;
        $n = max((int) round($years * 12), 1);
        $emi = $r == 0.0 ? $principal / $n : ($principal * $r * ((1 + $r) ** $n)) / (((1 + $r) ** $n) - 1);
        return ['monthlyEmi' => round($emi, 2), 'totalPayment' => round($emi * $n, 2), 'totalInterest' => round(($emi * $n) - $principal, 2)];
    }

    private function emiAffordability(array $input): array
    {
        $monthlyBudget = (float) ($input['monthlyBudget'] ?? 0);
        $annualRate = (float) ($input['annualRate'] ?? 8.5);
        $years = (float) ($input['years'] ?? 20);
        $r = $annualRate / 1200;
        $n = max((int) round($years * 12), 1);
        $factor = $r == 0.0 ? $n : ((((1 + $r) ** $n) - 1) / ($r * ((1 + $r) ** $n)));
        return ['affordableLoanAmount' => round($monthlyBudget * $factor, 2), 'monthlyBudget' => round($monthlyBudget, 2)];
    }

    private function rentVsBuy(array $input): array
    {
        $monthlyRent = (float) ($input['monthlyRent'] ?? 0);
        $homePrice = (float) ($input['homePrice'] ?? 0);
        $years = (float) ($input['years'] ?? 10);
        $rentCost = $monthlyRent * 12 * $years;
        $buyCost = $homePrice * 0.25;
        return ['totalRentCost' => round($rentCost, 2), 'estimatedBuyCost' => round($buyCost, 2), 'suggestion' => $rentCost < $buyCost ? 'Renting appears cheaper' : 'Buying appears better long-term'];
    }

    private function rentalYield(array $input): array
    {
        $propertyValue = (float) ($input['propertyValue'] ?? 0);
        $monthlyRent = (float) ($input['monthlyRent'] ?? 0);
        $yield = $propertyValue == 0.0 ? 0.0 : ($monthlyRent * 12 / $propertyValue) * 100;
        return ['annualRent' => round($monthlyRent * 12, 2), 'rentalYieldPercent' => round($yield, 2)];
    }

    private function propertyRoi(array $input): array
    {
        $buy = (float) ($input['purchasePrice'] ?? 0);
        $sell = (float) ($input['sellingPrice'] ?? 0);
        $expenses = (float) ($input['expenses'] ?? 0);
        $profit = $sell - $buy - $expenses;
        $roi = $buy == 0.0 ? 0.0 : ($profit / $buy) * 100;
        return ['profit' => round($profit, 2), 'roiPercent' => round($roi, 2)];
    }

    private function pgIncome(array $input): array
    {
        $beds = (float) ($input['beds'] ?? 0);
        $rentPerBed = (float) ($input['rentPerBed'] ?? 0);
        $occupancy = (float) ($input['occupancyPercent'] ?? 100) / 100;
        $expenses = (float) ($input['monthlyExpenses'] ?? 0);
        $gross = $beds * $rentPerBed * $occupancy;
        return ['monthlyGrossIncome' => round($gross, 2), 'monthlyNetIncome' => round($gross - $expenses, 2)];
    }

    private function construction(array $input): array
    {
        $area = (float) ($input['areaSqft'] ?? 0);
        $rate = (float) ($input['costPerSqft'] ?? 0);
        return ['estimatedCost' => round($area * $rate, 2)];
    }

    private function stampDuty(array $input): array
    {
        $value = (float) ($input['propertyValue'] ?? 0);
        $stampRate = (float) ($input['stampRate'] ?? 6);
        $registrationRate = (float) ($input['registrationRate'] ?? 1);
        $stamp = $value * $stampRate / 100;
        $registration = $value * $registrationRate / 100;
        return ['stampDuty' => round($stamp, 2), 'registrationFee' => round($registration, 2), 'totalCharges' => round($stamp + $registration, 2)];
    }

    private function sip(array $input): array
    {
        $monthly = (float) ($input['monthlyInvestment'] ?? 0);
        $annual = (float) ($input['annualReturn'] ?? 12);
        $years = (float) ($input['years'] ?? 10);
        $r = $annual / 1200;
        $n = max((int) round($years * 12), 1);
        $maturity = $r == 0.0 ? $monthly * $n : $monthly * ((((1 + $r) ** $n) - 1) * (1 + $r) / $r);
        return ['investedAmount' => round($monthly * $n, 2), 'estimatedReturns' => round($maturity - ($monthly * $n), 2), 'maturityValue' => round($maturity, 2)];
    }

    private function lumpsum(array $input): array
    {
        $principal = (float) ($input['principal'] ?? 0);
        $annual = (float) ($input['annualReturn'] ?? 10);
        $years = (float) ($input['years'] ?? 10);
        $future = $principal * ((1 + ($annual / 100)) ** $years);
        return ['investedAmount' => round($principal, 2), 'futureValue' => round($future, 2), 'gains' => round($future - $principal, 2)];
    }

    private function loanEligibility(array $input): array
    {
        $netMonthly = (float) ($input['netMonthlyIncome'] ?? 0);
        $obligations = (float) ($input['monthlyObligations'] ?? 0);
        $foir = (float) ($input['foirPercent'] ?? 50) / 100;
        $availableEmi = max(($netMonthly * $foir) - $obligations, 0);
        $amount = $this->emiAffordability(['monthlyBudget' => $availableEmi, 'annualRate' => (float) ($input['annualRate'] ?? 9), 'years' => (float) ($input['years'] ?? 20)]);
        return ['eligibleEmi' => round($availableEmi, 2), 'eligibleLoanAmount' => $amount['affordableLoanAmount']];
    }

    private function cardInterest(array $input): array
    {
        $balance = (float) ($input['outstandingBalance'] ?? 0);
        $annualRate = (float) ($input['annualRate'] ?? 36);
        $months = (float) ($input['months'] ?? 6);
        $future = $balance * ((1 + ($annualRate / 1200)) ** $months);
        return ['interestAmount' => round($future - $balance, 2), 'totalPayable' => round($future, 2)];
    }

    private function gst(array $input): array
    {
        $amount = (float) ($input['amount'] ?? 0);
        $rate = (float) ($input['gstRate'] ?? 18);
        $mode = (string) ($input['mode'] ?? 'exclusive');
        if ($mode === 'inclusive') {
            $base = $amount / (1 + ($rate / 100));
            return ['baseAmount' => round($base, 2), 'gstAmount' => round($amount - $base, 2), 'totalAmount' => round($amount, 2)];
        }
        $gst = $amount * $rate / 100;
        return ['baseAmount' => round($amount, 2), 'gstAmount' => round($gst, 2), 'totalAmount' => round($amount + $gst, 2)];
    }

    private function invoice(array $input): array
    {
        $qty = (float) ($input['quantity'] ?? 1);
        $unit = (float) ($input['unitPrice'] ?? 0);
        $gstRate = (float) ($input['gstRate'] ?? 18);
        $subTotal = $qty * $unit;
        $gst = $subTotal * $gstRate / 100;
        return ['subTotal' => round($subTotal, 2), 'gstAmount' => round($gst, 2), 'invoiceTotal' => round($subTotal + $gst, 2)];
    }

    private function profitMargin(array $input): array
    {
        $revenue = (float) ($input['revenue'] ?? 0);
        $cost = (float) ($input['cost'] ?? 0);
        $profit = $revenue - $cost;
        $margin = $revenue == 0.0 ? 0.0 : ($profit / $revenue) * 100;
        return ['profit' => round($profit, 2), 'marginPercent' => round($margin, 2)];
    }

    private function breakEven(array $input): array
    {
        $fixed = (float) ($input['fixedCosts'] ?? 0);
        $price = (float) ($input['sellingPricePerUnit'] ?? 0);
        $variable = (float) ($input['variableCostPerUnit'] ?? 0);
        $contribution = max($price - $variable, 0.01);
        $units = $fixed / $contribution;
        return ['breakEvenUnits' => round($units, 2), 'breakEvenRevenue' => round($units * $price, 2)];
    }

    private function wealthCompare(array $input): array
    {
        $netWorth = (float) ($input['netWorth'] ?? 0);
        $benchmark = (float) ($input['benchmark'] ?? 5000000);
        return ['benchmark' => round($benchmark, 2), 'difference' => round($netWorth - $benchmark, 2), 'status' => $netWorth >= $benchmark ? 'Above benchmark' : 'Below benchmark'];
    }

    private function crorepati(array $input): array
    {
        $current = (float) ($input['currentSavings'] ?? 0);
        $monthly = (float) ($input['monthlyInvestment'] ?? 0);
        $annual = (float) ($input['annualReturn'] ?? 12) / 1200;
        $target = 10000000.0;
        $months = 0;
        $value = $current;
        while ($value < $target && $months < 1200) {
            $value = ($value + $monthly) * (1 + $annual);
            $months++;
        }
        return ['yearsToCrorepati' => round($months / 12, 2), 'projectedCorpus' => round($value, 2)];
    }

    private function houseAffordability(array $input): array
    {
        $monthlyIncome = (float) ($input['monthlyIncome'] ?? 0);
        $housePrice = (float) ($input['housePrice'] ?? 0);
        $recommended = $monthlyIncome * 60;
        return ['recommendedBudget' => round($recommended, 2), 'housePrice' => round($housePrice, 2), 'affordable' => $housePrice <= $recommended];
    }

    private function lifestyle(array $input): array
    {
        $monthlySalary = (float) ($input['monthlySalary'] ?? 0);
        $monthlyExpenses = (float) ($input['monthlyExpenses'] ?? 0);
        $savings = $monthlySalary - $monthlyExpenses;
        return ['monthlySavings' => round($savings, 2), 'savingsRate' => $monthlySalary == 0.0 ? 0.0 : round(($savings / $monthlySalary) * 100, 2)];
    }

    private function taxByRegime(float $income, string $regime): float
    {
        $slabs = $regime === 'old'
            ? [[250000, 0.0], [250000, 0.05], [500000, 0.20], [INF, 0.30]]
            : [[400000, 0.0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25], [INF, 0.30]];

        $tax = 0.0;
        $remaining = $income;
        foreach ($slabs as [$limit, $rate]) {
            if ($remaining <= 0) {
                break;
            }
            $portion = min($remaining, $limit);
            $tax += $portion * $rate;
            $remaining -= $portion;
        }
        return max($tax, 0.0);
    }
}
