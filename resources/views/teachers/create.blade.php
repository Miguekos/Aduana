@extends('layouts.app')

@section('title', 'Alumnos')
@section('pagina', 'Nuevo Alumnos')

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

        <form action="{{ route('teacher.store') }}" method="POST">
            {{ csrf_field() }}

            <div class="container-fluid">
              <div class="animated fadeIn">


            <div class="card">
                <div class="card-body">

                <div class="card-header">
                    <strong>Profesor</strong>
                    <small>Datos</small>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label for="nombre_teacher">Nombre Completo</label>
                                <input class="form-control" id="nombre_teacher" required name="nombre_teacher" placeholder="" type="text">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="materia">Materia</label>
                                <select class="form-control" name="materia" id="materia">
                                  <option value="">---Elige una Materia---</option>
                                  @foreach ($materia as $materias)
                                  <option value="{{ $materias->nombre_materia }}">{{ $materias->nombre_materia }}</option>
                                  @endforeach
                                </select>
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="dni">Aula</label>
                                <input class="form-control" id="aula" required name="aula" placeholder="" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label for="dni">Horario</label>
                                <input class="form-control" id="horario" required name="horario" placeholder="" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                      <!--  <input type="text" id="atentido" readonly class="form-control col-sm-3" name="atentido" placeholder="Atentido" value="{{ Auth::user()->name }}"> -->
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
      </form>

</div>

@endsection('content')
