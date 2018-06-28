<?php

namespace App\Http\Controllers;
use App\Alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AsistenciaController extends Controller
{
    public function index(){
        return view('asistencia.asistencia');
    }

    public function addassistance($id){
//        $add = $id;
//        $alumnos = Alumno::where($id);
//        $dni = $alumnos->dni;
        $user = DB::table('alumnos')->where('dni', $id)->first();

        if ($user == null){
            Return "No existe en laba de datos";
        }else{
            $idd = $user->id;
            $alumnos = Alumno::find($idd);
            return view ('asistencia.addassistance',compact ('alumnos'));
        }
//        return $dni;
        // $alumnos = Alumno::find($id);
//        if ($dni == null) {
//          Toastr::success('Messages in here', 'Title', ["positionClass" => "toast-top-center"]);
//          return "{!! Toastr::message() !!}";
//            return "no existe";
//        }else{
        // return "
        // <div class='row'>
        //   <div class='col-lg-3'>
        // </div>
        //
        // <div class='col-lg-6'>
        // <div class='asistio'>Nombre: <b>"."$alumnos->nombre"." "."$alumnos->apellidos"."</b><br>
        // Registro:</u> <b></b><br>
        // Asistencia:</u> <b> </b><br>
        // Frecuencia:</u> <b>"."$alumnos->frecuencia"."</b><br>
        // Inicio el:</u> <b> "."$alumnos->fecha_de_inicio"."</b><br>
        // Modalidad:</u> <b> "."$alumnos->modalidad"."</b><br>
        // Horario:</u> <b> "."$alumnos->horarios"."</b><br>
        // Curso:</u> <b> "."$alumnos->tipo_de_curso"."</b><br>
        // </div>
        //
        // <div class='col-lg-3'>
        // </div>
        // ";
//        Toastr::success('Messages in here', 'Title', ["positionClass" => "toast-top-center"]);
//        return view ('asistencia.addassistance',compact ('alumnos'));
//        }
    }
}