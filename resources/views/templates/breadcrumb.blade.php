<!-- Breadcrumb-->
<ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/home">Home</a></li>
    <li class="breadcrumb-item active"><a href="@yield('urlpagina')">@yield('pagina')</a></li>
    <li class="@yield('active1')"><a href="@yield('urlpagina1')">@yield('pagina1')</a></li>
    <li class="@yield('active2')"><a href="@yield('urlpagina2')">@yield('pagina2')</a></li>
    <!-- Breadcrumb Menu-->
    <li class="breadcrumb-menu d-md-down-none">
        <div class="btn-group" role="group" aria-label="Button group">
            {{--<a class="btn" href="#">--}}
                {{--<i class="icon-speech"></i>--}}
            {{--</a>--}}
            {{--<a class="btn" href="./">--}}
                {{--<i class="icon-graph"></i>  Dashboard</a>--}}
            {{--<a class="btn" href="#">--}}
                {{--<i class="icon-settings"></i>  Settings</a>--}}
        </div>
    </li>
</ol>