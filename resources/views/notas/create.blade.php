@extends('layouts.app')

@section('content')


    <form action="{{ route ('nota.store') }}" method="post">
        {{ csrf_field() }}
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <div class="title"><h1>{{ $alumnos->nombre }} {{ $alumnos->apellidos }} </h1></div>
                <div><h5>{{ $materias->materia }}</h5></div>
                <div class="form-group">
                    <input type="text" class="form-control col-lg-6" placeholder="Agrega la nota" name="nota" id="nota">
                    <input type="hidden" name="id_alumno" value="{{ $alumnos->id }}">
                    <input type="hidden" name="id_materia" value="{{ $materias->id }}">
                </div>
                <input type="submit" class="btn btn-primary" value="Guardar">
            </div>
        </div>
    </div>
    </form>

@endsection