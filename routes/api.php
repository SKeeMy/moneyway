<?php

use App\Http\Controllers\ApiHello;
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
    Route::get('/hello', [ApiHello::class,'index']
    );
    //Route на регистрацию пользователя
    Route::post('/registration',[ClientController::class,'registration']
    );
    //Route на аутентификацию пользователя
    Route::post('/login',[ClientController::class,'login']
    );

    Route::prefix('settings')->group(function(){
        //Изменение пароля
        Route::post('/change_password',[ClientController::class,'change_password']
        );
    });
});

