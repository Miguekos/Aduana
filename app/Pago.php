<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    /**
     *
     */
    public function Alumnos(){
        return $this->hasOne ($this->Alumnos ());
    }
}
