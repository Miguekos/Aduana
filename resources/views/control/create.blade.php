@extends('layouts.app')

@section('title', 'Asignar Cursos')
@section('pagina', '')

@section('content')

<style media="screen">
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #b9c2cc;
  border-bottom: 1px solid #c8ced3;
}
.card-footer {
    padding: 0.75rem 1.25rem;
    background-color: #b9c2cc;
    border-top: 1px solid #c8ced3;
}
</style>
<div class="col-lg-12">
        <form action="{{ route('control.store') }}" method="POST">
            {{ csrf_field() }}
            <div class="container-fluid">
              <div class="animated fadeIn">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-header">
                        Asignar materias para <strong><h1>{{ $alumno->nombre . " " . $alumno->apellidos }}</h1></strong>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="materia">Materia</label>
                          <select class="form-control" name="materia" id="materia">
                            <option value="">---Elige una Materia---</option>
                            @foreach ($materia as $materias)
                            <option value="{{ $materias->nombre_materia }}">{{ $materias->nombre_materia }}</option>
                            @endforeach
                          </select>
                        </div>
                      </div>
                      <div class="card-footer">
                          <button type="submit" class="btn btn-sm btn-primary">
                              <i class="fa fa-dot-circle-o"></i> Guardar</button>
                          <button type="reset" class="btn btn-sm btn-danger">
                              <i class="fa fa-ban"></i> Reiniciar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" name="id_alumno" value="{{ $alumno->id }}">
        </form>
</div>
@endsection()