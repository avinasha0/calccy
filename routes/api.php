<?php

use App\Http\Controllers\ToolController;
use Illuminate\Support\Facades\Route;

Route::prefix('tools')->group(function (): void {
    Route::get('/', [ToolController::class, 'index']);
    Route::post('/salary/calculate', [ToolController::class, 'calculateSalary']);
});
