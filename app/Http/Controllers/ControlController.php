<?php

namespace App\Http\Controllers;

use App\Control;
use App\Alumno;
use App\Materia;
use Illuminate\Http\Request;

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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $control = Control::create($request->all ());
        return redirect ()->route('control.index');
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
}
