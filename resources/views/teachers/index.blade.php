@extends('layouts.app')

@section('title', 'Profesores')
@section('pagina', 'Profesores')

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
                    <i class="fa fa-align-justify"></i> Profesores <a class="btn btn-sm btn-primary pull-right" href="{{ route('teacher.create') }}">Agregar Profesor</a>
                </div>
                <div class="card-body">
                    {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
                    {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
                    <table id="table_id" class="table compact display table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Materia</th>
                            <th>Alua</th>
                            <th>horario</th>
                            <th>Accion</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($teacher as $teachers)
                            <tr>
                                <td>{{ $teachers->id }}</td>
                                <td>{{ $teachers->nombre_teacher }}</td>
                                <td>{{ $teachers->materia }}</td>
                                <td>{{ $teachers->aula  }}</td>
                                <td>{{ $teachers->horario  }}</td>
                                <td>
                                    <a type="" href="{{ url ('/get', $teachers->id) }}" class="badge badge-success"> Ver</a>
                                    <a type="" href="{{ route ('teacher.edit', $teachers->id) }}" class="badge badge-warning"> Editar</a>
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

@endsection('content')
