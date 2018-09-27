<?php

namespace App\Http\Controllers;
use App\Materia;
use App\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teacher = Teacher::all();
        return view('teachers.index', compact ('teacher'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      $materia = Materia::all();
        return view('teachers.create', compact ('materia'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $teacher = Teacher::create($request->all());
        return redirect()->route('teacher.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function edit($teacher)
    {
        $materia = Materia::all();
        $teachers = Teacher::findOrFail($teacher);
        return view('teachers.edit',compact('teachers','materia'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $teacher)
    {
        $teachers = Teacher::findOrFail($teacher);
        $teachers->nombre_teacher = $request->nombre_teacher;
        $teachers->materia = $request->materia;
        $teachers->aula = $request->aula;
        $teachers->horario = $request->horario;
        $teachers->save();
        Session::flash('success','Se actualizo Profesor correctamente');
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function destroy(Teacher $teacher)
    {
        //
    }
}
