<!DOCTYPE html>
<html lang="es">

  <head>
    @include('templates.header')
  </head>

  <body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
  
      <header class="app-header navbar">
        @include('templates.nav')
      </header>

      <div class="app-body">

          @include('templates.slideside')

        <main class="main">
            {{--@include('templates.breadcrumb')--}}
            <br>


            @yield('content')
        

        </main>

        <aside class="aside-menu">
    
          @include('templates.slidesideright')

        </aside>

      </div>
        @include('templates.footer')

  </body>
</html>