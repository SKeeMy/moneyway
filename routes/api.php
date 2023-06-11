<?php

use App\Http\Controllers\ApiHello;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\IncomeController;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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
    Route::post('/present_day', [DashBoardController::class, 'dashboard']
    );

    Route::prefix('settings')->group(function(){
        //Изменение пароля
        Route::post('/change_password',[ClientController::class,'change_password']
        );
    });

    Route::prefix('balance')->group(function()
    {
        Route::post('/week',[DashBoardController::class, 'balance_week']
        );
        Route::post('/month',[DashBoardController::class, 'balance_month']
        );
    });

    Route::prefix('income')->group(function(){
        Route::post('/add',[IncomeController::class, 'add']
        );
        Route::post('/week', [IncomeController::class, 'week_api']
        );
        Route::post('/month', [IncomeController::class, 'month_api']
        );
        Route::post('/history', [IncomeController::class, 'history']
        );
        Route::post('/delete', [IncomeController::class, 'delete']
        );
    });

    Route::prefix('expenses')->group(function(){
        Route::post('/add',[IncomeController::class, 'add']
        );
        Route::post('/week', [IncomeController::class, 'week_api']
        );
        Route::post('/month', [IncomeController::class, 'month_api']
        );
        Route::post('/history', [IncomeController::class, 'history']
        );
        Route::post('/delete', [IncomeController::class, 'delete']
        );
    });

});

