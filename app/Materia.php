<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $guarded = array();
    protected $table = 'Materias';

    public function materia_nombre(){
        return $this->hasOne (Nota::class);
    }

}
