<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Console\PackageDiscoverCommand;

class Alumno extends Model
{
    // protected $table = 'alumnos';
    protected $guarded = array();

//    public function tipodecursos(){
//      return $this->belongsTo(Tipodecurso::class);
//    }

    public function tipos_cursos()
    {
        $tipo_curso = Tipodecurso::find($this->id);

        return $tipo_curso->nombre;
    }

    public function modalidad_nombre()
    {
        $modalidad = Modalidad::find($this->id);

        return $modalidad->nombre;
    }

    public function forma_pagos()
    {
        $pagos = Pago::find($this->id);
        return $pagos->nombre;
    }

    public function frecuencias()
    {
        $frecuencias = Frecuencia::find($this->id);
        return $frecuencias->nombre;
    }

    public function horarios(){
        $horarios = Horario::find($this->id);
        return $horarios->nombre;
    }

}
