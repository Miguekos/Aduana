@extends('layouts.app')

@section('title', 'Control')
@section('pagina', 'Control')

@section('content')
    <style>
        /*table.dataTable.no-footer {*/
            /*border-bottom: 1px solid #fff;*/
        /*}*/
        /*table.dataTable thead th, table.dataTable thead td {*/
            /*padding: 10px 18px;*/
            /*border-bottom: 1px solid #20a8d8;*/
        /*}*/
    </style>

        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Control de Materias
                </div>
                <div class="card-body">
                    {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
                    {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
                    <table id="table_id" class="table compact display table-sm">
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>DNI</th>
                          <th>Fecha Inicio</th>
                          <th>Accion</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($control as $controls)
                            <tr>
                              <td>{{ $controls->id }}</td>
                              <td>{{ $controls->nombre ." ". $controls->apellidos }}</td>
                              <td>{{ $controls->dni }}</td>
                              <td>{{ $controls->fecha_de_inicio }}</td>
                                <td>
                                    <a type="" href="{{ route ('control.show', $controls->id) }}" class="badge badge-success"> Ver</a>
                                    <a type="" href="{{ route ('control.edit', $controls->id) }}" class="badge badge-warning"> Asignar  Materias</a>
                                </td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <?php
//                        echo str_replace('/?','?', $controls->render());
                    ?>

                </div>
            </div>
        </div>

@endsection('content')
