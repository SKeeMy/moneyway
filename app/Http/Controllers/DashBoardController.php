<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiHelloResource;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function dashboard(Request $request)
    {
        $remember_token = $request -> {"remember_token"};
        $date_num = 30;
        $start_balance = Client::firstWhere('remember_token', $remember_token);
        $incomeController = new IncomeController();
        $income = $incomeController -> income_dashboard($remember_token, $date_num);
        $expensesController = new ExpensesController();
        $expenses = $expensesController -> expenses_dashboard($remember_token, $date_num);
        $balance = $start_balance->start_balance + $income - $expenses;
        return new ApiHelloResource(
            [
                'income'=> $income,
                'expenses' => $expenses, 
                'balance' => $balance
            ]);
    }

    public function give(Request $request)
    {
        $remember_token = $request -> {"remember_token"};
        $user = Client::firstWhere('remember_token', $remember_token);
        if ($user) 
        {
            if ($user -> start_balance == null) 
            {
                return new ApiHelloResource(["start_balance" => 0]);
            }
            else
            {
                return new ApiHelloResource(["start_balance" => $user->start_balance]);
            }
        }
        return response()-> noContent(204);
    }

    public function add(Request $request)
    {
        $remember_token = $request -> {"remember_token"}; 
        $balance = $request -> {'balance'};
        $user = Client::firstWhere('remember_token', $remember_token);
        if ($user) 
        {
            $user ->start_balance = $balance;
            $user-> save();
            return new ApiHelloResource(['start_balance' => $balance]);
        }
        return response() -> noContent(204);
    }

    public function balance_week(Request $request)
    {
        $remember_token = $request -> {"remember_token"};
        $remember_token = '"test" 3';
        $balance = Client::firstWhere('remember_token', $remember_token);
        $balance = $balance['start_balance'];
        $incomeController = new IncomeController();
        $incomeC = $incomeController -> week($remember_token);
        $income = $incomeC['diagram'];
        $expensesController = new ExpensesController();
        $expensesC = $expensesController -> week($remember_token);
        $expenses = $expensesC['diagram'];
        $balance_week = [];
        for ($i=0; $i<7; $i++) 
        { 
            if ($i==0) 
            {
                $res = $balance +$income[$i]['balance'] - $expenses[$i]['balance'];
                $balance_week[$i] = 
                [
                    'balance'=> $res,
                    'created_at'=>$income[$i]['created_at']
                ];
                continue;
            }
            $balance_week[$i] = 
            [
                'balance' => $income[$i]['balance'] - $expenses[$i]['balance'],
                'created_at' => $income[$i]['created_at']
            ];
        }
        $balance_week = $this -> balance_formatting($balance_week);
        return new ApiHelloResource($balance_week);
    }
    public function balance_month(Request $request)
    {
        $remember_token = $request -> {"remember_token"};
        $balance = Client::firstWhere('remember_token', $remember_token);
        $balance = $balance['start_balance'];
        $incomeController = new IncomeController();
        $incomeC = $incomeController -> month($remember_token);
        $income = $incomeC['diagram'];
        $expensesController = new ExpensesController();
        $expensesC = $expensesController -> month($remember_token);
        $expenses = $expensesC['diagram'];
        $balance_week = [];
        for ($i=0; $i<30; $i++) 
        { 
            if ($i==0) 
            {
                $res = $balance +$income[$i]['balance'] - $expenses[$i]['balance'];
                $balance_week[$i] = 
                [
                    'balance'=> $res,
                    'created_at'=>$income[$i]['created_at']
                ];
                continue;
            }
            $balance_week[$i] = 
            [
                'balance' => $income[$i]['balance'] - $expenses[$i]['balance'],
                'created_at' => $income[$i]['created_at']
            ];
        }
        $balance_week = $this -> balance_formatting($balance_week);
        return new ApiHelloResource($balance_week);
    }

    private function balance_formatting($balance_week){
        for ($i=1; $i < count($balance_week); $i++) 
        { 
            if ($balance_week[$i]['balance'] == 0) 
            {
                $balance_week[$i]['balance']=$balance_week[$i-1]['balance'];
            }
        }
        return $balance_week;
    }
}

