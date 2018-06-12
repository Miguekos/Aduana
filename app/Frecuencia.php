<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frecuencia extends Model
{
    protected $guarded = array();

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Alumno(){
        return $this->hasOne ($this->Alumno ());
    }
}
