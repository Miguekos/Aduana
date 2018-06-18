@extends('layouts.app')

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
                        <th>Total Acumulado</th>
                        <th>Cantidad de Evaluaciones</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $materias->materia}}</td>
                        <td>{{ $notas }}</td>
                        <td>{{ $notasC }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>

@endsection
