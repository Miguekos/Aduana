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
            $alumno = Alumno::find($alumnos->id);
            DB::table('assistance')->insert([
                'person_id' => $alumno->id,
                'nombre' => $alumno->nombre,
                'dni' => $alumno->dni,
                'apellidos' => $alumno->apellidos,
                'fecha_de_inicio' => $alumno->fecha_de_inicio,
            ]);

            // $alumnos = Alumno::find($alumnos->frecuencia);
            // return $alum->nombre;
            // echo "$alum->frecuencia_id()";
            // echo "
            //
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
            return view ('asistencia.addassistance',compact ('alumno'));

        }
    }
}
