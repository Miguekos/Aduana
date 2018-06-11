<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    // protected $table = 'alumnos';
    protected $guarded = array();

    public function tipodecursos(){
      return $this->belongsTo(Tipodecurso::class);
    }

    public function tipos_cursos()
    {
        $tipo_curso = Tipodecurso::find($this->id);

        return $tipo_curso->nombre;
    }

}
