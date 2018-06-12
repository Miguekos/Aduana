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
                        @foreach($alumnos as $alumno)
                            <tr>
                                <td>{{ $alumno->id }}</td>
                                <td>{{ $alumno->nombre ." ". $alumno->apellidos }}</td>
                                <td>{{ $alumno->dni }}</td>
                                <td>{{ $alumno->fecha_de_inicio  }}</td>
                                <td>{{ $alumno->tipo_de_curso_id()  }}</td>
                                <td>{{ $alumno->modalidad_id()  }}</td>
                                <td>{{ $alumno->horario_id()  }}</td>
                                <td>{{ $alumno->frecuencia_id()  }}</td>
                                <td>
                                    <a type="" href="{{ route ('alumno.show', $alumno->id) }}" class="badge badge-success"> Ver</a>
                                    <a type="" href="{{ route ('alumno.edit', $alumno->id) }}" class="badge badge-warning"> Editar</a>
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
