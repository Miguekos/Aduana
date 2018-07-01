@extends('layouts.app')

@section('tittle','Materias')
@section('pagina', 'Materia')
@section('urlpagina', '/materia')
@section('active1','breadcrumb-item active')
@section('pagina1', 'Agregar Materia')


@section('content')

<style media="screen">
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #b9c2cc;
  border-bottom: 1px solid #c8ced3;
}
.card-footer {
    padding: 0.75rem 1.25rem;
    background-color: #b9c2cc;
    border-top: 1px solid #c8ced3;
}
</style>
<div class="col-lg-12">

        <form action="{{ route('materia.store') }}" method="POST">
            {{ csrf_field() }}

            <div class="container-fluid">
              <div class="animated fadeIn">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-header">
                        <strong>Materia</strong>
                        Datos
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="nombre_materia">Materia</label>
                          <input type="text" class="form-control" name="nombre_materia" id="nombre_materia" >
                        </div>
                      </div>
                      <div class="card-footer">
                          <button type="submit" class="btn btn-sm btn-primary">
                              <i class="fa fa-dot-circle-o"></i> Guardar</button>
                          <button type="reset" class="btn btn-sm btn-danger">
                              <i class="fa fa-ban"></i> Reiniciar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

@endsection('content')
