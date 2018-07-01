<?php

namespace App\Http\Controllers;

use App\Control;
use App\Alumno;
use App\Materia;
use App\Nota;
use App\Prueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class ControlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $control = Alumno::all();
        return view('control.index', compact ('control'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($control)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $materias = $request->materia;
        $alumno = $request->id_alumno;
        if ($materias == 2){
            DB::table('controls')->insert([
                ['id_alumno' => $alumno, 'materia' => 'Marketing', ],
                ['id_alumno' => $alumno, 'materia' => 'Taller Vuce', ],
                ['id_alumno' => $alumno, 'materia' => 'Operatica del Sectorista', ],
                ['id_alumno' => $alumno, 'materia' => 'Investigacion del Mercado', ],
                ['id_alumno' => $alumno, 'materia' => 'Valoracin Aduanero II', ],
                ['id_alumno' => $alumno, 'materia' => 'Legislacio Aduanera II', ],
                ['id_alumno' => $alumno, 'materia' => 'Nomenclatura Arancelaria II', ],
                ['id_alumno' => $alumno, 'materia' => 'Tributacion Aduanera II', ],
                ['id_alumno' => $alumno, 'materia' => 'Documentacion Sintad', ]
            ]);
            return redirect ()->route('control.index');
        }elseif ($materias == 1){
            DB::table('controls')->insert([
                ['id_alumno' => $alumno, 'materia' => 'Operativa de comercio exterior', ],
                ['id_alumno' => $alumno, 'materia' => 'Legislacion Aduanera', ],
                ['id_alumno' => $alumno, 'materia' => 'Preferencias Arancelarias', ],
                ['id_alumno' => $alumno, 'materia' => 'Nomenclaturas y Clasificacion Aracelaria', ],
                ['id_alumno' => $alumno, 'materia' => 'Valoracion Aduanera', ],
                ['id_alumno' => $alumno, 'materia' => 'Tributacion Aduanera', ],
                ['id_alumno' => $alumno, 'materia' => 'Fundamentos eticos de la tributacion Aduanera', ]
            ]);
            return redirect ()->route('control.index');
        }else{
            $control = Control::create($request->all ());
            return redirect ()->route('control.index');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function show($control)
    {
        $controls = Control::all()->where ('id_alumno',$control);
        $alumno = Alumno::findOrFail($control);

        //dd ($alumno);
        //dd ($controls);
       return view ('control.show',compact ('controls','alumno'));
       // return $control;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function edit($control)
    {
        $alumno = Alumno::find($control);
        $materia = Materia::all();
        return view('control.create', compact ('alumno', 'materia'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Control $control)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Control  $control
     * @return \Illuminate\Http\Response
     */
    public function destroy(Control $control)
    {
        //
    }

    public function addNotas($id, $control)
    {
        $alumnos = Alumno::find($id);
        $materias = Control::find($control);
        $prueba = Prueba::all();
        return view ('notas.create',compact ('alumnos','materias','prueba'));
    }

    /**
     * @param $id
     * @param $control
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function proNotas($id, $control)
    {

        $alumnos = Alumno::find($id);
//        $notas = Nota::all();
//        return view('prueba',compact('notas'));
//        return $notas;

//        $pruebas = Nota::all();
//        return $notas->prueba_id;
//        return view('prueba',compact('notas'));

//        $cursos = DB::table('notas')->where('id_alumno',$alumnos->id)->get();
        $cursos = Nota::where('id_materia', $control)->get();

//        return $cursos;
//        foreach ($cursos as $alumnos) {
//            return $alumnos->prueba_id(1);
//            return Nota::find($alumnos->id)->prueba_id();
//        }

        $notas = Nota::where('id_materia',$control)->sum('nota');
        $notasC = Nota::where('id_materia',$control)->count('nota');
        //Si no hay materias no se puede promediar y se salta para evitar errores
        if ($notas == 0){
            Session::flash('error','No se puede Promediar si no tiene notas registradas..!!');
            return redirect()->route('control.show',$id);

        }
        $notasT = $notas / $notasC;
        return view ('notas.addnotas',compact ('alumnos','materias','notas','notasC', 'notasT','cursos','pruebas'));
    }

    public function prueba()
    {
//        $notas = Prueba::find(1);
//        return $notas->prueba;
//        return view('prueba',compact('notas'));
//        $nota = Nota::all();
//        return $nota->prueba_id;

//        $alumno = Nota::all();
//            foreach ($alumno as $alumnos){
//                return $alumnos->prueba_id(1);
//
//        }

//        $alumno = Alumno::all();
//        foreach ($alumno as $alumnos){
//            return $alumnos->horario_id(1);
//        }

    }

    public function redirect()
    {

    }
}
