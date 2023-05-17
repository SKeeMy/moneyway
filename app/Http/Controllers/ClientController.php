<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\ApiHelloResource;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    public function registration(Request $request){
        
        if ($request -> {"password"} != $request -> {"confirmPassword"}) {
            return response() -> noContent(204, ["Пароли не совпадают"]);
        }

        $new_client = new Client();
        $new_client -> id = $request -> {"id"};
        $new_client -> login = $request -> {"login"};
        $new_client -> email =  $request -> {"email"};
        $new_client -> password = Hash::make($request -> {"password"});
        $new_client -> age = $request -> {"age"};
        $new_client -> save();
        return response()-> noContent(201);
    }

    public function login(Request $request){
        $email = $request -> {"email"};
        $password = $request -> {"password"};
        $user = Client::firstWhere('email', $email);
        if ($user && Hash::check($password, $user->password)) {
            if (!$user -> remember_token) {
                $user -> remember_token = hash('sha256',Str::random(80));
                $user -> save();
            }
            return new ApiHelloResource(['login' => $user -> login, 'remember_token' => $user -> remember_token]);
        }
        return response() -> noContent(204);
    }

    public function change_password(Request $request){
        $token = $request -> {"token"};
        $old_password = $request -> {"old_password"};
        $new_password = $request -> {"new_password"};
        $user = Client::firstWhere('remember_token', $token);
        if ($user && Hash::check($old_password, $user->password)){
            $user -> update(['password' => $new_password]);
            return response() -> noContent(201);
        }
        return response() -> noContent(204);
    }
}
