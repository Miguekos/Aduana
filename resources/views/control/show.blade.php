@extends('layouts.app')


@section('content')

    @foreach($control as $controls)
    {{ $controls->id_alumno }}
    @endforeach


    @foreach($alumno as $alumnos)
    {{ $alumnos->nombre  }}
    @endforeach

@endsection