    
      <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="/home">
        <img class="navbar-brand-full" src="{{ asset ('coreui/img/brand/logo1.svg') }}" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="{{ asset ('coreui/img/brand/sygnet1.svg') }}" width="30" height="30" alt="CoreUI Logo">
      </a>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav navbar-nav d-md-down-none">
        {{--<li class="nav-item px-3">
          <a class="nav-link" href="{{ url ('/home') }}">Escritorio</a>
        </li>--}}
        <li class="nav-item px-3">
          <a class="nav-link" href="{{ route('register') }}">Usuarios</a>
        </li>
        {{--<li class="nav-item px-3">
          <a class="nav-link" href="#">Configuracion</a>
        </li>--}}
      </ul>
      <ul class="nav navbar-nav ml-auto">
        {{--<li class="nav-item d-md-down-none">--}}
          {{--<a class="nav-link" href="#">--}}
            {{--<i class="icon-bell"></i>--}}
            {{--<span class="badge badge-pill badge-danger">5</span>--}}
          {{--</a>--}}
        {{--</li>--}}
        {{--<li class="nav-item d-md-down-none">--}}
          {{--<a class="nav-link" href="#">--}}
            {{--<i class="icon-list"></i>--}}
          {{--</a>--}}
        {{--</li>--}}
        {{--<li class="nav-item d-md-down-none">--}}
          {{--<a class="nav-link" href="#">--}}
            {{--<i class="icon-location-pin"></i>--}}
          {{--</a>--}}
        {{--</li>--}}
        <li class="nav-item dropdown">

              {{ Auth::user()->name }}

        </li>
      </ul>

      <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" data-toggle="dropdown">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
          <div class="divider"></div>
          <a class="dropdown-item" href="#">
              <i class="fa fa-shield"></i> Cambiar contraseña</a>
          <a class="dropdown-item" href="{{ route('logout') }}">
              <i class="fa fa-lock"></i> Salir</a>
      </div>

    