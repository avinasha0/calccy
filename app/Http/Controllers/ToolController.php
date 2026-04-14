<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToolController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'tools' => [
                [
                    'slug' => 'salary-calculator',
                    'name' => 'Salary Calculator',
                    'description' => 'Calculate monthly in-hand salary from annual CTC.',
                ],
            ],
        ]);
    }

    public function calculateSalary(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ctc' => ['required', 'numeric', 'min:1'],
            'taxRegime' => ['required', 'in:old,new'],
            'pfPercent' => ['nullable', 'numeric', 'min:0', 'max:20'],
            'deductions' => ['nullable', 'numeric', 'min:0'],
        ]);

        $ctc = (float) $validated['ctc'];
        $pfPercent = isset($validated['pfPercent']) ? (float) $validated['pfPercent'] : 12.0;
        $deductions = isset($validated['deductions']) ? (float) $validated['deductions'] : 0.0;
        $taxRegime = $validated['taxRegime'];

        $employeePfYearly = $ctc * ($pfPercent / 100);
        $taxableIncome = max($ctc - $employeePfYearly - $deductions, 0);
        $incomeTax = $this->calculateIncomeTax($taxableIncome, $taxRegime);
        $cess = $incomeTax * 0.04;
        $totalTax = $incomeTax + $cess;
        $netYearly = max($ctc - $employeePfYearly - $totalTax - $deductions, 0);

        return response()->json([
            'inputs' => [
                'ctc' => round($ctc, 2),
                'taxRegime' => $taxRegime,
                'pfPercent' => round($pfPercent, 2),
                'deductions' => round($deductions, 2),
            ],
            'results' => [
                'monthlyInHand' => round($netYearly / 12, 2),
                'yearlyInHand' => round($netYearly, 2),
                'yearlyBreakdown' => [
                    'grossCtc' => round($ctc, 2),
                    'employeePf' => round($employeePfYearly, 2),
                    'incomeTax' => round($incomeTax, 2),
                    'cess' => round($cess, 2),
                    'otherDeductions' => round($deductions, 2),
                    'totalDeductions' => round($employeePfYearly + $totalTax + $deductions, 2),
                ],
            ],
        ]);
    }

    private function calculateIncomeTax(float $income, string $regime): float
    {
        $slabs = $regime === 'old'
            ? [
                [250000, 0.0],
                [250000, 0.05],
                [500000, 0.20],
                [INF, 0.30],
            ]
            : [
                [400000, 0.0],
                [400000, 0.05],
                [400000, 0.10],
                [400000, 0.15],
                [400000, 0.20],
                [400000, 0.25],
                [INF, 0.30],
            ];

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

        return max($tax, 0);
    }
}
