<?php

namespace App\Http\Controllers;
use App\Alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;


class AlumnoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {

//        $alumnos = Membresia::paginate(10);

        $alumno = Alumno::all();
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
        $dniV = Alumno::where('dni',$request->dni)->get();
        foreach ($dniV as $key) {
            if ($key->dni = $request->dni) {
                Session::flash('error','Este dni ya existe..!!');
                return redirect()->route('alumno.index');
            }
        }
        $alumnos = Alumno::create($request->all());
        Session::flash('success','Se registro el alumno: '.$request->nombre.' '.$request->apellido.' con DNI: '.$request->dni.'..!!');
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
        return $alumnos;

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
        Session::flash('success','Se actualizo correctamente..!!');
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
