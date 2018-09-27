<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $guarded = array();

    public function promo_id(){
        return $this->hasOne (Cliente::class);
    }
}
