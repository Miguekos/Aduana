<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Miguel Rodriguez">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <title>Aduana | Login</title>
    <!-- Icons-->

    <link href="{{ asset('coreui/node_modules/@coreui/icons/css/coreui-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('coreui/node_modules/flag-icon-css/css/flag-icon.min.css') }}" rel="stylesheet">
    <link href="{{ asset('coreui/node_modules/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('coreui/node_modules/simple-line-icons/css/simple-line-icons.css') }}" rel="stylesheet">
    <!-- Main styles for this application-->
    <link href="{{ asset('coreui/css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('coreui/vendors/pace-progress/css/pace.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery.dataTables.css') }}">
    {{--datatable--}}
    {{--<link href="{{ asset('coreui/table/dataTables.jqueryui.min.js') }}" rel="stylesheet">--}}
    <link href="{{ asset('coreui/table/jquery-ui.css') }}" rel="stylesheet">
    <link href="{{ asset('coreui/table/dataTables.jqueryui.min.css') }}" rel="stylesheet">
    <head>
  <body class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                 
                  <h1>Login</h1>

                   <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                          <p class="text-muted">Inicia con tu cuenta</p>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="icon-user"></i>
                              </span>
                            </div>
                            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus placeholder="Nombre de usuario">

                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <div class="input-group mb-4">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="icon-lock"></i>
                              </span>
                            </div>
                                <input id="password" type="password" class="form-control" name="password" required placeholder="Password">

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

<!--                         <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div> -->

                        <div class="row">
                          <div class="col-3">
                              <button type="submit" class="btn btn-primary">
                                  Entrar
                              </button>
                          </div>
                          <div class="col-3 text-right">
                              <a class="btn btn-link" href="{{ route('password.request') }}">
                                  Olvidaste tu contraseña?
                              </a>
                          </div>
                        </div>
                    </form>
<!--                           <p class="text-muted">Inicia con tu cuenta</p>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="icon-user"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Nombre de usuario">
                          </div>
                          <div class="input-group mb-4">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="icon-lock"></i>
                              </span>
                            </div>
                            <input type="password" class="form-control" placeholder="Password">
                          </div>
                          <div class="row">
                            <div class="col-3">
                              <button type="button" class="btn btn-primary px-4">Entrar</button>
                            </div>
                            <div class="col-3 text-right">
                              <button type="button" class="btn btn-link px-0">Olvidaste la contraseña?</button>
                            </div>
                          </div> -->
              </div>
            </div>
<!--             <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Solo el administrador puede agregar a nuevos miembros.</p>
                  <button type="button" class="btn btn-primary active mt-3">Registrarse!</button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap and necessary plugins-->
    <script src="coreui/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="coreui/node_modules/popper.js/dist/umd/popper.min.js"></script>
    <script src="coreui/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="coreui/node_modules/pace-progress/pace.min.js"></script>
    <script src="coreui/node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
    <script src="coreui/node_modules/@coreui/coreui/dist/js/coreui.min.js"></script>
  </body>
</html>