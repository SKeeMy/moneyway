<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiHelloResource;
use App\Models\Expenses;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ExpensesController extends Controller
{
    public function income_dashboard($remember_token, $date_num)
    {
        $balance = Expenses::where([['remember_token', $remember_token], 
        ['created_at', '>=', now()->subDays($date_num-1)->format('Y-m-d')]])
            ->orderBy('created_at', 'asc')
            ->get();
        if (!$balance) {
            return $income = 0;
        }
        $income = $balance->sum('balance');
        return $income;
    }
    public function add(Request $request)
    {
        $remember_token = $request -> {"remember_token"};
        $category = $request -> {"category"};
        $sum = $request -> {"balance"} ;
        $comment = $request -> {"comment"};
        $created_at = Carbon::parse( $request -> {"date"});
        $new_income = new Expenses();
        $new_income -> category = $category;
        $new_income -> balance = $sum;
        $new_income -> remember_token = $remember_token;
        $new_income -> comment = $comment;
        $new_income -> created_at = $created_at -> format('Y-m-d');
        $new_income -> save();
        return response() -> noContent(200);
    }

    public function week_api(Request $request)
    {
        $remember_token = $request -> {'remember_token'};
        $week = $this -> week($remember_token);
        return new ApiHelloResource($week);
    }
    
    public function month_api(Request $request)
    {
        $remember_token = $request -> {'remember_token'};
        $month = $this -> month($remember_token);
        return new ApiHelloResource($month);
    }

    public function week($remember_token)
    {
        $income = Expenses::where([['remember_token', $remember_token], 
        ['created_at', '>=', now() -> subDays(6) -> format('Y-m-d')]])
            ->orderBy('created_at', 'asc')
            ->get(['balance', 'created_at'])
            ->toArray();
        if ($income) {
            $grouped = collect($income)->groupBy('created_at');
            $incomeByDate = [];
            foreach ($grouped as $date => $values) {
                $incomeByDate[$date] = $values->sum('balance');
            }
            $balance =[];
            $n = 0;
            foreach ($incomeByDate as $key => $value) {
                $balance[$n] = ["balance" => $value, "created_at" => $key];
                $n++;
            }
            $end_date = Carbon::today() -> format('Y-m-d');
            $start_date = Carbon::now() -> subDays(6) -> format('Y-m-d');
            $incomeByDate = $this-> generateDateRange(Carbon::parse($start_date),
            Carbon::parse($end_date), $balance);
        }
        else{
            $incomeByDate = $this -> generate_date_null(6);
        }
        $income_category = Expenses::where([['remember_token', $remember_token], 
        ['created_at', '>=', now() -> subDays(6) -> format('Y-m-d')]])
            ->orderBy('created_at', 'asc')
            ->get(['balance', 'category'])
            ->toArray();
        if($income_category){
            $grouped = collect($income_category)->groupBy('category');
            $incomeByCategory = [];
            foreach ($grouped as $date => $values) {
                $incomeByCategory[$date] = $values->sum('balance');
            }
        }
        else{
            $incomeByCategory = null;
        }
        $result = ['diagram'=>$incomeByDate, 'cicle'=>$incomeByCategory];
        return $result;
    }

    public function month($remember_token)
    {
        $income = Expenses::where([['remember_token', $remember_token], 
        ['created_at', '>=', now() -> subDays(29) -> format('Y-m-d')]])
            ->orderBy('created_at', 'asc')
            ->get(['balance', 'created_at'])
            ->toArray();
        if ($income) {
            $grouped = collect($income)->groupBy('created_at');
            $incomeByDate = [];
            foreach ($grouped as $date => $values) {
                $incomeByDate[$date] = $values->sum('balance');
            }
            $balance =[];
            $n = 0;
            foreach ($incomeByDate as $key => $value) {
                $balance[$n] = ["balance" => $value, "created_at" => $key];
                $n++;
            }
            $end_date = Carbon::today() -> format('Y-m-d');
            $start_date = Carbon::now() -> subDays(29) -> format('Y-m-d');
            $incomeByDate = $this-> generateDateRange(Carbon::parse($start_date),
            Carbon::parse($end_date), $balance);
        }
        else{
            $incomeByDate = $this -> generate_date_null(29);
        }
        $income_category = Expenses::where([['remember_token', $remember_token], 
        ['created_at', '>=', now() -> subDays(29) -> format('Y-m-d')]])
            ->orderBy('created_at', 'asc')
            ->get(['balance', 'category'])
            ->toArray();
        if($income_category){
            $grouped = collect($income_category)->groupBy('category');
            $incomeByCategory = [];
            foreach ($grouped as $date => $values) {
                $incomeByCategory[$date] = $values->sum('balance');
            }
        }
        else{
            $incomeByCategory = null;
        }
        $result = ['diagram' => $incomeByDate, 'cicle' => $incomeByCategory];
        return $result;
    }

    public function delete(Request $request){
        $delete = Expenses::firstWhere([['remember_token', $request -> {"remember_token"} ],
        ['id',$request -> {"id"}]]);
        if(!$delete){
            return response()->noContent(204);
        }
        $delete->delete();
        return response()->noContent(200);
    }

    public function history(Request $request){
        $token = $request -> {'remember_token'};
        $income_history = Expenses::where('remember_token', $token)
        ->orderBy('created_at', 'asc')
        ->get(['id','balance', 'category','created_at'])
        ->map(function($item){
            return [
                'id' => $item -> id,
                'balance' => $item -> balance,
                'category' => $item -> category,
                'created_at' => Carbon::parse($item->created_at)->format('Y-m-d')
            ];
        });
        return new ApiHelloResource($income_history);
    }

    private function generateDateRange(Carbon $start_date, Carbon $end_date, $balance)
    {
        $k = 0;
        $n = 0;
        $dates = [];
        for($date = $start_date -> copy(); $date -> lte($end_date); $date -> addDay()) {
            if (count($balance) < $k || Carbon::parse($balance[$n]["created_at"])->toDateString() !== $date->toDateString()) {
                $dates[$k] = ["balance" => 0,"created_at" => $date->format('Y-m-d')];
                $k++;
                continue;
            }
            $balance[$n]["created_at"]= Carbon::parse($balance[$n]["created_at"])->format('Y-m-d');
            $dates[$k] = $balance[$n];
            $k++;
            $n++;
        }
        return $dates;
    }

    private function generate_date_null($k){
        $dates = [];
        $n=0;
        $end_date = Carbon::now() -> format('Y-m-d');
        $start_date = Carbon::now() -> subDays($k) -> format('Y-m-d');
        for($date = Carbon::parse($start_date) -> copy(); $date -> lte(Carbon::parse($end_date)); $date -> addDay()) {
            $dates[$n] = ['balance'=>0,'created_at'=>$date->toDateString()];
            $n++;
        }
        return $dates;
    }
}
