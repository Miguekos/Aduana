
      <div class="sidebar">
        <nav class="sidebar-nav">
          <ul class="nav">
  <!-- <li class="treeview">
  <a href="#">
    <i class='fa fa-users'></i>
    <span>Membresias</span>
    <span class="pull-right-container">
      <i class="fa fa-angle-left pull-right"></i>
    </span>
  </a>
  <ul class="treeview-menu">
    <li><a href="./index.php?view=client"><i class='fa fa-check-square'></i> <span>Membresias</span></a></li>
    <li><a href="/agregarasistencia.php" target="_blank"><i class='fa fa-check'></i> <span>Asistencia</span></a></li>
    <li><a href="./index.php?view=verasistencia"><i class='fa fa-check'></i> <span>Ver Asistencia</span></a></li>
    <li><a href="./index.php?view=control"><i class='fa fa-sitemap'></i> <span>Control</span></a></li>
    <li><a href="./index.php?view=reporte"><i class='fa fa-table'></i> <span>Reporte</span></a></li>
  </ul>
</li> -->


            <li class="nav-title">Administrar</li>
            <li class="nav-item">
              <a class="nav-link" href="/home">
                <i class="nav-icon fa fa-dashboard"></i> Escritorio
              </a>
            </li>

            <li class="nav-item nav-dropdown">
              <a class="nav-link nav-dropdown-toggle" href="#">
                <i class="nav-icon fa fa-users"></i> Alumnos</a>
              <ul class="nav-dropdown-items">
                <li class="nav-item">
                  <a class="nav-link" href="{{ route ('alumno.index') }}">
                    <i class="nav-icon fa fa-check-square"></i> Alumnos</a>
                </li>
                {{--<li class="nav-item">
                  <a class="nav-link" href="{{ route ('reporte') }}">
                    <i class="nav-icon fa fa-table"></i> Reportes</a>
                </li>--}}
              </ul>
            </li>
              <li class="nav-item nav-dropdown">
                  <a class="nav-link" href="{{ url ('/asistencia') }}" target="_blank">
                      <i class="nav-icon fa fa-handshake-o"></i> Asistencia
                  </a>
              </li>
            {{--<li class="nav-item nav-dropdown">
              <a class="nav-link nav-dropdown-toggle" href="#">
                <i class="nav-icon fa fa-handshake-o"></i> Profesores</a>
              <ul class="nav-dropdown-items">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="nav-icon icon-arrow-right"></i> Profesores</a>
                </li>
              </ul>
            </li>--}}


          </ul>
        </nav>
        <button class="sidebar-minimizer brand-minimizer" type="button"></button>
      </div>
