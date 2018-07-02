<?php

namespace App\Http\Controllers;
use App\Alumno;
use App\Asistencia;
use Foo\DataProviderIssue2833\SecondTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

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
//            return view ('asistencia.noasistencia',compact ('alumnos'));
            echo "
                <div class='row'>
                  <div class='col-lg-3'>
                </div>
                
                <div class='col-lg-6'>
                <div style='background-color: #f0ad4e; color: black; border-radius: 5px;'><b>No se Encuentra en la base de datos..!!<br>
                
                </div>
                
                <div class='col-lg-3'>
                </div>
                ";
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