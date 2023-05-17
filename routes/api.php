<?php

use App\Http\Controllers\ApiHello;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ClientController;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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

Route::middleware('cors')->group(function () {
    //Route на регистрацию пользователя
    Route::post('/registration', [ClientController::class,'registration']
    );
    //Route на аутентификацию пользователя
    Route::post('/login', [ClientController::class,'login']
    );

    Route::prefix('settings')->group(function(){
        //Изменение пароля
        Route::post('/change_password',[ClientController::class,'change_password']
        );
    });

    Route::prefix('balance')->group(function(){
        Route::post('/add',[BalanceController::class, 'add']
        );
        Route::post('/week', [BalanceController::class, 'week']
        );
        Route::post('/month', [BalanceController::class, 'month']
        );
        Route::post('/present_day', [BalanceController::class, 'present_day']
        );
        Route::post('/history', [BalanceController::class, 'history']
        );
    });

});

