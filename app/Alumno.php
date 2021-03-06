<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
//     protected $table = 'alumnos';
    protected $guarded = array();

    public function tipo_de_curso_id($alumno)
    {
        $tipo_curso = Tipodecurso::find($alumno);
        return $tipo_curso->nombre;
    }

    public function modalidad_id($alumno)
    {
        $modalidad = Modalidad::find($alumno);
        return $modalidad->nombre;
    }

    public function formas_de_pago_id($alumno)
    {
        $pagos = Pago::find($alumno);
        return $pagos->nombre;
    }

    public function frecuencia_id($alumno)
    {
        $frecuencias = Frecuencia::find($alumno);
        return $frecuencias->nombre;
    }

    public function horario_id($alumno){
        $horarios = Horario::find($alumno);
        return $horarios->nombre;
    }
    public function publicidad_id($alumno)
    {
        $publicida = Publicidad::find($alumno);
        return $publicida->nombre;
    }



}
