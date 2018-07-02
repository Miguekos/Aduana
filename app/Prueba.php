<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prueba extends Model
{
    protected $guarded = array();

    public function Nota(){
        return $this->hasOne ($this->Nota ());
    }
}
