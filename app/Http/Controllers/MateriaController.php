<?php

namespace App\Http\Controllers;

use App\Alumno;
use App\Materia;
use Illuminate\Support\Facades\Session;

use Illuminate\Http\Request;

class MateriaController extends Controller
{
  public function __construct()
  {
      $this->middleware('auth');
  }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $materia = Materia::all();
      return view('materias.index',compact('materia'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      return view('materias.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      // $all = $request->all();
      $materiaE = Materia::where('nombre_materia',$request->nombre_materia)->get();
      foreach ($materiaE as $key) {
        if ($key->nombre_materia = $request->nombre_materia) {
          Session::flash('mensaje','Esta materia ya existe..!!');
          return redirect()->route('materia.index');
        }
      }
      $materia = Materia::create($request->all());
      return redirect()->route('materia.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function show(Materia $materia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function edit($materia)
    {
        $materias = Materia::find($materia);
        return view('materias.edit',compact('materias'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $materia)
    {
        $materias  = Materia::findOrFail($materia);
        $input = $request->all();
        $materias->fill($input)->save();
        return redirect ()->route ('materia.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function destroy($materia)
    {
      $materias  = Materia::findOrFail($materia);
      $materias->delete();
      Session::flash('mensaje','Se Elimino correctamente.!!');
      return redirect ()->route ('materia.index');
    }
}
