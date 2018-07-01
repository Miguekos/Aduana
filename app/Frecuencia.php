<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frecuencia extends Model
{
    protected $guarded = array();

    public function Alumno(){
        return $this->hasOne ($this->Alumno ());
    }
}
