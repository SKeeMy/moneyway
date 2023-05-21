<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    protected $table = 'balance';
    protected $dateFormat = 'Y-m-d';
    protected $fillable = [
        'id',
        'balance',
        'remember_token',	
        'created_at',
        'updated_at',
        ];
}
