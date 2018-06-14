<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AsistenciaController extends Controller
{
    public function index(){
        return view('asistencia.asistencia');
    }

    public function addassistance($id){
        $add = $id;
        return view ('asistencia.addassistance',compact ('add'));
    }
}
