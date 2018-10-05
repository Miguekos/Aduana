<?php

namespace App\Http\Controllers;
use App\Membresia;
use Illuminate\Http\Request;

class MembresiaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
/*    public function __construct()
    {
        $this->middleware('auth');
    }*/
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $membresias = Membresia::all ();
//        $membresias = Membresia::paginate(10);
        return view ('membresias.index', compact ('membresias'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view ('membresias.create');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        {
            // validate
            // read more on validation at http://laravel.com/docs/validation
            // $rules = array(
            //     'name'       => 'required',
            //     'dni'      => 'required',
            //     'role' => 'required',
            //     'status' => 'required',
            // );
            // $validator = Validator::make(Input::all(), $rules);

            // process the login
            // if ($validator->fails()) {
            //     return Redirect::to('membresia/create')
            //         ->withErrors($validator)
            //         ->withInput(Input::except('password'));
            // } else {
                // store
                $membresia = new Membresia;
                $membresia->name = $request->name;
                $membresia->dni = $request->dni;
                $membresia->role = $request->role;
                $membresia->status = $request->status;
                $membresia->save();
                // redirect
                //Session::flash('message', 'Successfully created membresia!');
                return redirect('/membresia');
            // }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Membresia  $membresia
     * @return \Illuminate\Http\Response
     */
    public function show(Membresia $membresia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Membresia  $membresia
     * @return \Illuminate\Http\Response
     */
    public function edit(Membresia $membresia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Membresia  $membresia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Membresia $membresia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Membresia  $membresia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Membresia $membresia)
    {
        //
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInfoMembresia($id){

        $membresia = Membresia::whereId($id)->first();
        return response()->json(["membresia" => $membresia]);

//        return response()->json(['membresia' => 'miguel']);


    }

    public function allMembresia(){

        $membresia = Membresia::all();
        return response()->json(["membresia" => $membresia]);

//        return response()->json(['membresia' => 'miguel']);


    }
}
