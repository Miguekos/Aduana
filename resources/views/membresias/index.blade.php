@extends('layouts.app')

@section('title', 'Membresia')
@section('pagina', 'Membresia')

@section('content')

        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Alumnos <a class="btn btn-sm btn-primary pull-right" href="{{ route('membresia.create') }}">Agregar Alumno</a>
                </div>
                <div class="card-body">
                    <table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">
                    {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($membresias as $membresia)
                            <tr>
                                <td>{{ $membresia->id }}</td>
                                <td>{{ $membresia->name }}</td>
                                <td>{{ $membresia->dni }}</td>
                                <td>{{ $membresia->role  }}</td>
                                <td>
                                    <span class="badge badge-success">{{ $membresia->status }}</span>
                                </td>
                            </tr>

                        @endforeach
                        </tbody>
                    </table>
                    <?php
//                        echo str_replace('/?','?', $membresias->render());
                    ?>


                </div>
            </div>
        </div>

@endsection('content')

