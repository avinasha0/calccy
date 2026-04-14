<?php

namespace App\Http\Controllers;

use App\Services\CalculatorService;
use App\Support\ToolCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToolController extends Controller
{
    public function __construct(private readonly CalculatorService $calculatorService)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json(['tools' => ToolCatalog::all()]);
    }

    public function show(string $slug): JsonResponse
    {
        $tool = ToolCatalog::find($slug);
        if (!$tool) {
            abort(404, 'Tool not found.');
        }
        return response()->json(['tool' => $tool]);
    }

    public function calculate(Request $request, string $slug): JsonResponse
    {
        $tool = ToolCatalog::find($slug);
        if (!$tool) {
            abort(404, 'Tool not found.');
        }

        $results = $this->calculatorService->calculate($slug, $request->all());
        return response()->json([
            'tool' => $tool,
            'inputs' => $request->all(),
            'results' => $results,
        ]);
    }
}
