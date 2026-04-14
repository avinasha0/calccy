<?php

use App\Http\Controllers\ToolController;
use Illuminate\Support\Facades\Route;

Route::prefix('tools')->group(function (): void {
    Route::get('/', [ToolController::class, 'index']);
    Route::get('/{slug}', [ToolController::class, 'show']);
    Route::post('/{slug}/calculate', [ToolController::class, 'calculate']);
});
