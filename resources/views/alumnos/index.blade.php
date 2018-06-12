@extends('layouts.app')

@section('title', 'Alumnos')
@section('pagina', 'Alumnos')

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
                    <i class="fa fa-align-justify"></i> Alumnos <a class="btn btn-sm btn-primary pull-right" href="{{ route('alumno.create') }}">Agregar Alumno</a>
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
                            <th>Tipo de Curso</th>
                            <th>Modalidad</th>
                            <th>Horarios</th>
                            <th>Frecuencia</th>
                            <th>Accion</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($alumno as $alumnos)
                            <tr>
                                <td>{{ $alumnos->id }}</td>
                                <td>{{ $alumnos->nombre ." ". $alumnos->apellidos }}</td>
                                <td>{{ $alumnos->dni }}</td>
                                <td>{{ $alumnos->fecha_de_inicio  }}</td>
                                <td>{{ $alumnos->tipo_de_curso_id($alumnos->tipo_de_curso)  }}</td>
                                <td>{{ $alumnos->modalidad_id($alumnos->modalidad)  }}</td>
                                <td>{{ $alumnos->horario_id($alumnos->horario)  }}</td>
                                <td>{{ $alumnos->frecuencia_id($alumnos->frecuencia)  }}</td>
                                <td>
                                    <a type="" href="{{ route ('alumno.show', $alumnos->id) }}" class="badge badge-success"> Ver</a>
                                    <a type="" href="{{ route ('alumno.edit', $alumnos->id) }}" class="badge badge-warning"> Editar</a>
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
