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
                                <div class="text-muted text-uppercase font-weight-bold small">Membresias</div>
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
                                <div class="text-muted text-uppercase font-weight-bold small">Promosiones</div>
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
                                <div class="text-muted text-uppercase font-weight-bold small">Productos</div>
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
                                <div class="text-value-sm text-danger">3</div>
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
                <div class="row">
                  <div class="col-sm-5">
                    <h4 class="card-title mb-0">Traffic</h4>
                    <div class="small text-muted">November 2017</div>
                  </div>
                  <!--/.col-->
                  <div class="col-sm-7 d-none d-md-block">
                    <button type="button" class="btn btn-primary float-right">
                      <i class="icon-cloud-download"></i>
                    </button>
                    <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                      <label class="btn btn-outline-secondary">
                        <input type="radio" name="options" id="option1" autocomplete="off"> Day
                      </label>
                      <label class="btn btn-outline-secondary active">
                        <input type="radio" name="options" id="option2" autocomplete="off" checked> Month
                      </label>
                      <label class="btn btn-outline-secondary">
                        <input type="radio" name="options" id="option3" autocomplete="off"> Year
                      </label>
                    </div>
                  </div>
                  <!--/.col-->
                </div>
                <!--/.row-->
                <div class="chart-wrapper" style="height:300px;margin-top:40px;">
                  <canvas id="main-chart" class="chart" height="300"></canvas>
                </div>
              </div>
              <div class="card-footer">
                <div class="row text-center">
                  <div class="col-sm-12 col-md mb-sm-2 mb-0">
                    <div class="text-muted">Visits</div>
                    <strong>29.703 Users (40%)</strong>
                    <div class="progress progress-xs mt-2">
                      <div class="progress-bar bg-success" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md mb-sm-2 mb-0">
                    <div class="text-muted">Unique</div>
                    <strong>24.093 Users (20%)</strong>
                    <div class="progress progress-xs mt-2">
                      <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md mb-sm-2 mb-0">
                    <div class="text-muted">Pageviews</div>
                    <strong>78.706 Views (60%)</strong>
                    <div class="progress progress-xs mt-2">
                      <div class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md mb-sm-2 mb-0">
                    <div class="text-muted">New Users</div>
                    <strong>22.123 Users (80%)</strong>
                    <div class="progress progress-xs mt-2">
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md mb-sm-2 mb-0">
                    <div class="text-muted">Bounce Rate</div>
                    <strong>40.15%</strong>
                    <div class="progress progress-xs mt-2">
                      <div class="progress-bar" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/.card-->
            <!--/.row-->
          </div>

        </div>
      
@endsection('content')