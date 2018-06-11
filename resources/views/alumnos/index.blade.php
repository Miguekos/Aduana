@extends('layouts.app')

@section('title', 'Alumnos')
@section('pagina', 'Alumnos')

@section('content')

        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Alumnos <a class="btn btn-sm btn-primary pull-right" href="{{ route('alumno.create') }}">Agregar Alumno</a>
                </div>
                <div class="card-body">
                    <table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">
                    {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
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
                            <th>Telf.</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($alumnos as $alumno)
                            <tr>
                                <td>{{ $alumno->id }}</td>
                                <td>{{ $alumno->nombre ." ". $alumno->apellidos }}</td>
                                <td>{{ $alumno->dni }}</td>
                                <td>{{ $alumno->fecha_de_inicio  }}</td>
                                <td>{{ $alumno->tipos_cursos()  }}</td>
                                <td>{{ $alumno->modalidad()  }}</td>
                                <td>{{ $alumno->horarios  }}</td>
                                <td>{{ $alumno->frecuencia  }}</td>
                                <td>{{ $alumno->celular_p  }}</td>
                                <td>
                                    <span class="badge badge-success">{{ $alumno->status }}</span>
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
