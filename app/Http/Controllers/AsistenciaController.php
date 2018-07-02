<?php

namespace App\Http\Controllers;
use App\Alumno;
use App\Asistencia;
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
        $alumnos = DB::table('alumnos')->where('dni', $id)->first();
        if ($alumnos == null){
            Return "No existe en la base de datos";
        }else{
//            $idd = $alumnos->id;
            $alumnos = Alumno::find($alumnos->id);
            DB::table('assistance')->insert([
                'person_id' => $alumnos->id,
                'nombre' => $alumnos->nombre,
                'dni' => $alumnos->dni,
                'apellidos' => $alumnos->apellidos,
                'fecha_de_inicio' => $alumnos->fecha_de_inicio,
            ]);
            return view ('asistencia.addassistance',compact ('alumnos'));

        }
    }
}