<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Resources\ApiHelloResource;

class APIHello extends Controller
{
    public function index(){
        $arr = [
            $key = 1,
            $token = 2
        ];
        return new ApiHelloResource($arr);
    }
}

