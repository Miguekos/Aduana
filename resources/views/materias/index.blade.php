@extends('layouts.app')

@section('tittle','Materias')

@section('content')



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
                            <a type="" href="#" class="btn btn-sm btn-warning"> Editar</a>
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
