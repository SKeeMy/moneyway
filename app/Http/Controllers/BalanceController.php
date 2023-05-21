<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiHelloResource;
use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BalanceController extends Controller
{
    public function present_day(Request $request){
        $remember_token = $request -> {"remember_token"};
        $balance = Balance::firstWhere([['updated_at', Carbon::now() -> format('Y-m-d')],
                                        ['remember_token', $remember_token]]);
        if (!$balance) {
            return new ApiHelloResource(['balance'=>0]);
        }
        return new ApiHelloResource(['balance' => $balance ->balance]);
    }

    public function add(Request $request){
        $remember_token = $request -> {"remember_token"};
        $sum = $request -> {"balance"};
        $balance = Balance::firstWhere([['updated_at', Carbon::now() -> format('Y-m-d')],
                                        ['remember_token', $remember_token]]);
        if ($balance) {
            $balance -> balance = $sum;
            $balance -> save();
            return response() -> noContent(200);
        }
        $new_balance = new Balance();
        $new_balance -> balance = $sum;
        $new_balance -> remember_token = $remember_token;
        $new_balance -> save();
        return response() -> noContent(200);
    }

    public function week(Request $request){
        $remember_token = $request -> {'remember_token'};
        $end_date = Carbon::now() -> format('Y-m-d');
        $start_date = Carbon::now() -> subDays(6) -> format('Y-m-dx');
        $balance_db = Balance::whereBetween('updated_at', [$start_date, $end_date])
                                ->where('remember_token', $remember_token, 'and')
                                ->get();
        foreach($balance_db as $res){
            $balance [] = ["balance" => $res -> balance, "updated_at" => $res -> updated_at -> format('Y-m-d')]; 
        }
        $balance_week = $this-> generateDateRange(Carbon::parse($start_date),
                                                  Carbon::parse($end_date) -> addDay(), $balance);
        return new ApiHelloResource($balance_week);
    }

    public function month(Request $request){
        $remember_token = $request -> {'remember_token'};
        $end_date = Carbon::now() -> format('Y-m-d');
        $start_date = Carbon::now() -> subDays(29) -> format('Y-m-dx');
        $balance_db = Balance::whereBetween('updated_at', [$start_date, $end_date])
                                ->where('remember_token', $remember_token, 'and')
                                ->get();
        foreach($balance_db as $res){
            $balance [] = ["balance" => $res -> balance, "updated_at" => $res -> updated_at -> format('Y-m-d')]; 
        }
        $balance_month = $this-> generateDateRange(Carbon::parse($start_date),
                                                  Carbon::parse($end_date) -> addDay(), $balance);
        return new ApiHelloResource($balance_month);
    }
    
    private function generateDateRange(Carbon $start_date, Carbon $end_date, $balance)
    {
        $k = 0;
        $n = 0;
        $dates = [];
        for($date = $start_date -> copy(); $date -> lte($end_date); $date -> addDay()) {
            if (count($balance) < $k || $balance[$n]["updated_at"] != $date->format('Y-m-d')) {
                $dates[$k] = ["balance" => 0,"updated_at" => $date->format('Y-m-d')];
                $k++;
                continue;
            }
            $dates[$k] = $balance[$n];
            $k++;
            $n++;
        }
        return $dates;
    }

    public function history(Request $request){
        $balance_history = Balance::where('remember_token', $request -> {'remember_token'})
                                        ->pluck(['balance', 'updated_at']);
        return new ApiHelloResource($balance_history);
    }
}
