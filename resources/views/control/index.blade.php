@extends('layouts.app')

@section('title', 'Control')
@section('pagina', 'Control')

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
    @if( session('error') )
        <script>
            toastr.error('{{ session('error') }}');
        </script>
    @endif
    @if( session('success') )
        <script>
            toastr.success('{{ session('success') }}');
        </script>
    @endif
    @if( session('warning') )
        <script>
            toastr.warning('{{ session('warning') }}');
        </script>
    @endif
    @if(session('mensaje'))
        <script>
            toastr.warning('{{ session('mensaje') }}');
        </script>
    @endif
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Control de Cursos
                </div>
                <div class="card-body">
                    <table id="table_id" class="ui celled table" style="width:100%">
                    {{--<table id="table_id" class="table compact display table-sm">--}}
                        <thead>
                            <tr>
                              <th>#</th>
                              <th>Nombre</th>
                              <th>DNI</th>
                              <th>Fecha Inicio</th>
                              <th width="20%">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                        @foreach($control as $controls)
                            <tr>
                              <td>{{ $controls->id }}</td>
                              <td>{{ $controls->nombre ." ". $controls->apellidos }}</td>
                              <td>{{ $controls->dni }}</td>
                              <td>{{ $controls->fecha_de_inicio }}</td>
                                <td>
                                    <a type="" href="{{ route ('control.show', $controls->id) }}" class="btn btn-sm btn-success"> Ver Cursos</a>
                                    <a type="" href="{{ route ('control.edit', $controls->id) }}" class="btn btn-sm btn-warning"> Asignar Cursos</a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

@endsection()
