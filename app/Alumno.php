<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Console\PackageDiscoverCommand;

class Alumno extends Model
{
//     protected $table = 'alumnos';
    protected $guarded = array();
//    protected $fillable = ['nombre','dni'];
//    public function tipodecursos(){
//      return $this->belongsTo(Tipodecurso::class);
//    }

    public function tipo_de_curso_id()
    {
        $tipo_curso = Tipodecurso::find($this->id);

        return $tipo_curso->nombre;
    }

    public function modalidad_id()
    {
        $modalidad = Modalidad::find($this->id);

        return $modalidad->nombre;
    }

    public function forma_de_pago_id()
    {
        $pagos = Pago::find($this->id);
        return $pagos->nombre;
    }

    public function frecuencia_id()
    {
        $frecuencias = Frecuencia::find($this->id);
        return $frecuencias->nombre;
    }

    public function horario_id(){
        $horarios = Horario::find($this->id);
        return $horarios->nombre;
    }

}
