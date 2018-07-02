<?php

namespace App\Http\Controllers;

use App\Alumno;
use App\Asistencia;
use App\Tipodecurso;
use App\Teacher;
use App\Materia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Mockery\Generator\ClassWithFinalMethod;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

//        Session::forget('UserName');
        $nombre_user = Auth::user()->name;
        Session::put('UserName',$nombre_user);

        $alumnos_max = Alumno::max('id');
        $teachers_max = Teacher::max('id');
        $materias_max = Materia::max('id');
        return view('home',compact ('alumnos_max','teachers_max','materias_max'));
    }

    public function get($id){
        $num = $id;
        $alumno = Alumno::findOrFail($id);
        return view('export.xportalumnos',compact ('num','alumno'));

    }

    public function reporte(){
//        $count = DB::table('assistance')->count('id');
        $alumno = Asistencia::all();
        return view('alumnos.reporte',compact('alumno'));
//        foreach ($alumno as $alumnos){
//            $asis = Alumno::find($alumnos->person_id);
//            return $asis->nombre;
//        }


//        $alumnos = Alumno::all ();
//        $tipos_cursos = Tipodecurso::all ();
//
//        $suma_alumnos = Alumno::where('formas_de_pago','=',1)->sum('id');
//        echo $suma_alumnos;
//
//        $curso1 = Alumno::where('tipo_de_curso', '=', 1)->count();
//        echo $curso1;
//        $curso2 = Alumno::where('tipo_de_curso', '=', 2)->count();
//        echo $curso2;
//        $curso3 = Alumno::where('tipo_de_curso', '=', 3)->count();
//        echo $curso3;
//        $curso4 = Alumno::where('tipo_de_curso', '=', 4)->count();
//        echo $curso4;
//        $curso5 = Alumno::where('tipo_de_curso', '=', 5)->count();
//        echo $curso5;
//        $curso6 = Alumno::where('tipo_de_curso', '=', 6)->count();
//        echo $curso6;
//        return view ('alumnos.reporte');
    }

}
