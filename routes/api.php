<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->get('/product', function (Request $request) {
    return $request->product();
});


Route::get('/users', [UserController::class, 'showUser'])->name('users');
Route::put('/users', [UserController::class, 'updateUser'])->name('users.update');
Route::delete('/users/{id}', [UserController::class, 'deleteUser'])->name('users.delete');
Route::get('/users/permissions/{id}', [UserController::class, 'permissions'])->name('users.permissions');


Route::get('/products', [ProductController::class, 'showProduct'])->name('products');
Route::put('/products', [ProductController::class, 'updateProduct'])->name('products.update');
Route::delete('/products/{id}', [ProductController::class, 'deleteProduct'])->name('products.delete');
