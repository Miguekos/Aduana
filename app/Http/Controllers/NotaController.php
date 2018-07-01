<?php

namespace App\Http\Controllers;

use App\Alumno;
use App\Nota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class NotaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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


//        $id = Nota::findOrFail($request->prueba);
//        return $id;
        $id_m = $request->id_materia;
        $id_p = $request->prueba;
        $prueba = DB::table('notas')->where([
            'id_materia' => $id_m,
            'prueba' => $id_p
        ])->first();
        if ($prueba){
            Session::flash('error','Ya se registro NOTA en esta Evaluacion');
            return redirect()->route('control.show', ['id' => $request->id_alumno]);
        }else{
            Nota::create ($request->all());
            return redirect()->route('control.show', ['id' => $request->id_alumno]);
        }
//
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function show($id, Nota $nota)
    {
        $alumno = Alumno::findOrFail($id);
//        $nota = Nota::where('id_materia',$nota)
//            ->where('id_alumno',$id)->sum('nota');
        $nota = Nota::where('id_materia',$nota)->sum('nota');
        return $nota ." ". $alumno->nombre;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function updatenotas($nota, $alumno)
    {
        $alumnos = Alumno::findOrFail($alumno);
        $nota = Nota::findOrFail($nota);

        DB::table('notas')
            ->where('id', $nota->id)
            ->update(['nota' => $nota->nota]);
        Session::flash('updatenota','Se actualizo la nota correctamente');
        return redirect()->route('pronotas',$alumnos->id,$nota->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Nota $nota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nota $nota)
    {
        //
    }
}
