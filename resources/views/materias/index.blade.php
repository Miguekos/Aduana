@extends('layouts.app')

@section('tittle','Materias')
@section('pagina', 'Materia')

@section('content')

@if (Session('mensaje'))
  <div class="text-center alert alert-success col-sm-3 container-fluid">
    <b>{{ Session('mensaje') }}</b>
  </div>
@endif

<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Materias <a class="btn btn-sm btn-primary pull-right" href="{{ route('materia.create') }}">Agregar Materia</a>
        </div>
        <div class="card-body">
            {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
            {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
            <table id="table_id" class="ui celled table" style="width:100%">
            {{--<table id="table_id" class="table compact display table-sm">--}}
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                @foreach($materia as $materias)
                    <tr>
                        <td>{{ $materias->id }}</td>
                        <td>{{ $materias->nombre_materia }}</td>
                        <td>
                          <form action="{{ route('materia.destroy',$materias->id) }}" method="post">
                            {{ csrf_field() }}
                            {{ method_field('delete') }}
                            <a type="" href="{{ route('materia.edit',$materias->id) }}" class="btn btn-sm btn-warning"> Editar</a>
                              <input type="submit" class="btn btn-sm btn-danger" value="Eliminar">
                            </form>
                        </td>

                    </tr>
                @endforeach
                </tbody>
            </table>
            <?php
//                        echo str_replace('/?','?', $alumnos->render());
            ?>

        </div>
    </div>
</div>

@endsection
