<?php

namespace App\Support;

class ToolCatalog
{
    public static function all(): array
    {
        return [
            ['slug' => 'salary-calculator', 'name' => 'Salary Calculator', 'description' => 'Estimate monthly in-hand salary from annual CTC in India.'],
            ['slug' => 'ctc-to-in-hand-calculator', 'name' => 'CTC to In-Hand Calculator', 'description' => 'Convert annual CTC into yearly and monthly take-home salary.'],
            ['slug' => 'old-vs-new-tax-regime-calculator', 'name' => 'Old vs New Tax Regime Calculator', 'description' => 'Compare tax outflow under old and new tax regimes.'],
            ['slug' => 'income-tax-calculator-india', 'name' => 'Income Tax Calculator (India)', 'description' => 'Calculate yearly income tax with cess.'],
            ['slug' => 'monthly-salary-breakdown-tool', 'name' => 'Monthly Salary Breakdown Tool', 'description' => 'Break salary into monthly components and deductions.'],
            ['slug' => 'salary-hike-calculator', 'name' => 'Salary Hike Calculator', 'description' => 'See updated CTC and monthly salary after a hike.'],
            ['slug' => 'bonus-variable-pay-calculator', 'name' => 'Bonus & Variable Pay Calculator', 'description' => 'Compute payout from bonus and variable percentages.'],
            ['slug' => 'pf-calculator', 'name' => 'PF Calculator', 'description' => 'Estimate PF contributions and total annual corpus contribution.'],
            ['slug' => 'home-loan-emi-calculator', 'name' => 'Home Loan EMI Calculator', 'description' => 'Find monthly EMI for a home loan.'],
            ['slug' => 'emi-affordability-calculator', 'name' => 'EMI Affordability Calculator', 'description' => 'Estimate affordable loan amount from monthly budget.'],
            ['slug' => 'rent-vs-buy-calculator', 'name' => 'Rent vs Buy Calculator', 'description' => 'Compare renting cost with buying cost over time.'],
            ['slug' => 'rental-yield-calculator', 'name' => 'Rental Yield Calculator', 'description' => 'Calculate annual rental yield for property.'],
            ['slug' => 'property-roi-calculator', 'name' => 'Property ROI Calculator', 'description' => 'Measure return on investment for property deals.'],
            ['slug' => 'pg-income-calculator', 'name' => 'PG Income Calculator', 'description' => 'Estimate PG rental revenue and net income.'],
            ['slug' => 'construction-cost-calculator', 'name' => 'Construction Cost Calculator', 'description' => 'Estimate construction cost from area and rate.'],
            ['slug' => 'stamp-duty-calculator-india', 'name' => 'Stamp Duty Calculator (India)', 'description' => 'Compute stamp duty and registration cost.'],
            ['slug' => 'sip-calculator', 'name' => 'SIP Calculator', 'description' => 'Project SIP maturity with expected returns.'],
            ['slug' => 'lumpsum-investment-calculator', 'name' => 'Lumpsum Investment Calculator', 'description' => 'Estimate future value of a one-time investment.'],
            ['slug' => 'compound-interest-calculator', 'name' => 'Compound Interest Calculator', 'description' => 'Calculate compound growth over time.'],
            ['slug' => 'loan-eligibility-calculator', 'name' => 'Loan Eligibility Calculator', 'description' => 'Estimate eligible loan amount from income and obligations.'],
            ['slug' => 'personal-loan-emi-calculator', 'name' => 'Personal Loan EMI Calculator', 'description' => 'Calculate EMI for personal loan scenarios.'],
            ['slug' => 'credit-card-interest-calculator', 'name' => 'Credit Card Interest Calculator', 'description' => 'Estimate revolving credit card interest cost.'],
            ['slug' => 'gst-calculator-india', 'name' => 'GST Calculator (India)', 'description' => 'Add or remove GST from an amount.'],
            ['slug' => 'invoice-generator-pdf', 'name' => 'Invoice Generator (PDF)', 'description' => 'Generate invoice totals including GST.'],
            ['slug' => 'profit-margin-calculator', 'name' => 'Profit Margin Calculator', 'description' => 'Compute gross profit and margin percentages.'],
            ['slug' => 'break-even-calculator', 'name' => 'Break-even Calculator', 'description' => 'Find units needed to break even.'],
            ['slug' => 'wealth-comparison-tool-india', 'name' => 'Wealth Comparison Tool (India)', 'description' => 'Compare your net worth to national benchmarks.'],
            ['slug' => 'time-to-become-crorepati-calculator', 'name' => 'Time to Become Crorepati Calculator', 'description' => 'Estimate years to reach one crore.'],
            ['slug' => 'can-you-afford-this-house-tool', 'name' => 'Can You Afford This House Tool', 'description' => 'Check if a property fits your income profile.'],
            ['slug' => 'salary-vs-lifestyle-calculator', 'name' => 'Salary vs Lifestyle Calculator', 'description' => 'Understand savings potential versus lifestyle expenses.'],
        ];
    }

    public static function find(string $slug): ?array
    {
        foreach (self::all() as $tool) {
            if ($tool['slug'] === $slug) {
                return $tool;
            }
        }

        return null;
    }
}
