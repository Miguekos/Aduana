<?php

namespace App\Http\Controllers;
use App\Alumno;
use Illuminate\Http\Request;


class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $alumnos = Membresia::paginate(10);

        $alumno = Alumno::all ();
        return view ('alumnos.index', compact ('alumno'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view ('alumnos.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $alumnos = Alumno::create($request->all());
      return redirect()->route('alumno.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Alumno  $alumno
     * @return \Illuminate\Http\Response
     */
    public function show(Alumno $alumno)
    {
        $alumnos = Alumno::find($alumno);
//        return $alumnos;
        return "Estoy en show";
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Alumno  $alumno
     * @return \Illuminate\Http\Response
     */
    public function edit($alumno)
    {
        $alumnos  = Alumno::findOrFail($alumno);
        return view ('alumnos.edit', compact ('alumnos'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Alumno  $alumno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $alumno)
    {
        $alumnos  = Alumno::findOrFail($alumno);
        $input = $request->all();
        $alumnos->fill($input)->save();
        return redirect ()->route ('alumno.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Alumno  $alumno
     * @return \Illuminate\Http\Response
     */
    public function destroy(Alumno $alumno)
    {
        //
    }
}
