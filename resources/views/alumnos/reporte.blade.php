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
                        <th class="text-center">Fecha de de Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>








@endsection()
