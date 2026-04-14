<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    $path = request()->path();
    $relativePath = $path === '/' ? '' : trim($path, '/');
    $prerendered = public_path('app/' . ($relativePath === '' ? 'index.html' : $relativePath . '/index.html'));

    if (file_exists($prerendered)) {
        return response()->file($prerendered);
    }

    return response()->file(public_path('app/index.html'));
})->where('any', '^$|tools(?:/.*)?|blog(?:/.*)?|404$');

Route::fallback(function () {
    $prerendered404 = public_path('app/404/index.html');
    $file = file_exists($prerendered404) ? $prerendered404 : public_path('app/index.html');
    return response()->file($file, ['Content-Type' => 'text/html'])->setStatusCode(404);
});
