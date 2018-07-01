<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    protected $guarded = array();


//    public function prueba_id()
//    {
//        $pruebas = Prueba::find();
//        return $pruebas->prueba;
//    }
    public function prueba_id($nota)
    {
        $notas = Prueba::find($nota);
        return $notas->prueba;
    }

//    public function prueba_id()
//    {
//        $prueba = Nota::find();
//        return $prueba->nombre;
//    }
}
