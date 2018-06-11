<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tipodecurso extends Model
{
    public function alumnos(){
        return $this->hasOne(Alumno::class);
    }
}