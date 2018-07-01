@extends('layouts.app')

@section('title', 'Promedio')
@section('pagina', 'Control')
@section('urlpagina', '/control')
@section('pagina1', 'Promedio')
@section('active1','breadcrumb-item active')

@section('content')
    <style>
    .ui.grid {
    margin-top: -1rem;
    margin-bottom: -1rem;
    margin-left: 1rem;
    margin-right: -1rem;
    }
    </style>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <h1>{{ $alumnos->nombre . " " . $alumnos->apellidos }}</h1>
                <span>DNI: {{ $alumnos->dni }}</span>
            </div>
            <div class="card-body">
            <table id="table_id" class="table" style="width:100%">
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Nota</th>
                        <th>Evaluacion</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($cursos as $curso)
                    <tr>
                        <td>{{ $curso->nombre_materia}}</td>
                        <td>{{ $curso->nota }}</td>
                        <td>{{ $curso->prueba_id($curso->prueba) }}</td>
                        <td>
                            <a class="btn btn-sm btn-warning" data-toggle="modal" data-target="#myModal{{ $curso->id }}">Cambiar nota</a>
                        </td>
                        @include('templates.modal')
                @endforeach
                        <td></td>
                    </tr>
                </tbody>
                <tfooter>
                    <tr>
                        <td><b><u>Total:</u></b></td>
                        <td>{{ $notasT }}</td>
                        <td>{{ $notasC }}</td>
                    </tr>
                </tfooter>
            </table>
            </div>
        </div>
    </div>

@endsection
