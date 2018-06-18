<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Miguel Rodriguez">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <title>Aduana | Loguin</title>
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
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Reset Password</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Send Password Reset Link
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="coreui/node_modules/jquery/dist/jquery.min.js"></script>
<script src="coreui/node_modules/popper.js/dist/umd/popper.min.js"></script>
<script src="coreui/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="coreui/node_modules/pace-progress/pace.min.js"></script>
<script src="coreui/node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
<script src="coreui/node_modules/@coreui/coreui/dist/js/coreui.min.js"></script>
</body>
</html>
