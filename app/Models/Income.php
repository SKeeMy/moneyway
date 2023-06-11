<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    protected $table = 'income';
    protected $dateFormat = 'Y-m-d';
    protected $fillable = [
        'id',
        'category',
        'balance',
        'comment',
        'remember_token',
        'created_at'
        ];
}
