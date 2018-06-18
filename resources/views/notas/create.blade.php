@extends('layouts.app')

@section('content')


    <form action="{{ route ('nota.store') }}" method="post">
        {{ csrf_field() }}
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <div class="title"><h1>{{ $alumnos->nombre }} {{ $alumnos->apellidos }} </h1></div>
                <div class="">
                    <h5>{{ $materias->materia }}</h5>
                </div>
            </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="nota">Agregar nota</label>
                        <input type="text" class="form-control col-lg-6" placeholder="Agrega la nota" name="nota" id="nota">
                        <input type="hidden" name="id_alumno" value="{{ $alumnos->id }}">
                        <input type="hidden" name="id_materia" value="{{ $materias->id }}">
                    </div>
                    <div class="form-group">
                        <label for="comentario">Agregar Comentario</label>
                        <textarea type="text" class="form-control col-lg-6" placeholder="Comentario" name="" id=""></textarea>
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" class="btn btn-primary" value="Guardar">
                </div>
            </div>
        </div>
    </div>
    </form>

@endsection