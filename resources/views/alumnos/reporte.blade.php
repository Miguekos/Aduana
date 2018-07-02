@extends('layouts.app')

@section('title', 'Reporte')
@section('pagina', 'Reporte')

@section('content')


<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Reportes de Asistencia
        </div>
        <div class="card-body">
            <table id="table_id" class="ui celled table" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>DNI</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Asistencia</th></tr>
                </thead>
                <tbody>
                @foreach($alumno as $alumnos)
                    <tr>
                        <th>{{ $alumnos->id }}</th>
                        <th>{{ $alumnos->nombre." ".$alumnos->apellidos }}</th>
                        <th>{{ $alumnos->dni }}</th>
                        <th>{{ $alumnos->fecha_de_inicio }}</th>
                        <th>{{ $alumnos->created_at }}</th>
                    </tr>
                @endforeach
                </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>








@endsection()
