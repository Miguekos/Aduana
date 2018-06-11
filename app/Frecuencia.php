<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frecuencia extends Model
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Alumno(){
        return $this->hasOne ($this->Alumno ());
    }
}
