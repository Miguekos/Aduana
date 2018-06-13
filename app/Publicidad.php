<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publicidad extends Model
{
    public function Alumnos(){
        return $this->hasOne ($this->Alumnos ());
    }
}
