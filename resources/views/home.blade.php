@extends('layouts.app')

@section('title', 'Home')
@section('pagina', 'Escritorio')

@section('content')

        <div class="container-fluid">
          <div class="animated fadeIn">
            <div class="row">

                <div class="col-6 col-lg-3">
                    <div class="card">
                        <div class="card-body p-0 d-flex align-items-center">
                            <i class="fa fa-group bg-primary p-4 px-5 font-2xl mr-3"></i>
                            <div>
                                <div class="text-value-sm text-primary">365</div>
                                <div class="text-muted text-uppercase font-weight-bold small">Alumnos</div>
                            </div>
                        </div>
                    </div>
                </div>
              <!--/.col-->
                <div class="col-6 col-lg-3">
                    <div class="card">
                        <div class="card-body p-0 d-flex align-items-center">
                            <i class="fa fa-handshake-o bg-warning p-4 px-5 font-2xl mr-3"></i>
                            <div>
                                <div class="text-value-sm text-warning">32</div>
                                <div class="text-muted text-uppercase font-weight-bold small">Profesores</div>
                            </div>
                        </div>
                    </div>
                </div>

              <!--/.col-->
                <div class="col-6 col-lg-3">
                    <div class="card">
                        <div class="card-body p-0 d-flex align-items-center">
                            <i class="fa fa-product-hunt bg-info p-4 px-5 font-2xl mr-3"></i>
                            <div>
                                <div class="text-value-sm text-info">44</div>
                                <div class="text-muted text-uppercase font-weight-bold small">Materias</div>
                            </div>
                        </div>
                    </div>
                </div>

              <!--/.col-->
                <div class="col-6 col-lg-3">
                    <div class="card">
                        <div class="card-body p-0 d-flex align-items-center">
                            <i class="fa fa-user-o bg-danger p-4 px-5 font-2xl mr-3"></i>
                            <div>
                                <div class="text-value-sm text-danger">0</div>
                                <div class="text-muted text-uppercase font-weight-bold small">Emepleados</div>
                            </div>
                        </div>
                    </div>
                </div>
              <!--/.col-->
            </div>
            <!--/.row-->

            <div class="card">
              <div class="card-body">

            @include('templates.grafica')


              </div>
              <div class="card-footer">

              </div>
            </div>
            <!--/.card-->
            <!--/.row-->
          </div>

        </div>

@endsection('content')
