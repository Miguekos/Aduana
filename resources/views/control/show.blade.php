@extends('layouts.app')


@section('content')


<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Materias de <h1>{{ $alumno->nombre }}</h1>
        </div>
        <div class="card-body">
            {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
            {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
            <table id="table_id" class="table compact display table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                @foreach($controls as $materias)
                    <tr>
                        <td>{{ $materias->id }}</td>
                        <td>{{ $materias->materia }}</td>
                        <td>
                            <a type="" href="{{ url ('/addnotas/{id}/{control}'),$alumno->id, $materias->id }}" class="badge badge-success"> Agregar notas</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>


@endsection