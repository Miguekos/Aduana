@extends('layouts.app')


@section('title', 'Ver Cursos')
@section('pagina', 'Control')
@section('urlpagina', '/control')
@section('pagina1', 'Ver Cursos')
@section('active1','breadcrumb-item active')


@section('content')
    @if( session('error') )
        <script>
            toastr.error('{{ session('error') }}');
        </script>
    @endif
    @if( session('updatenota') )
        <script>
            toastr.success('{{ session('updatenota') }}');
        </script>
    @endif
    @if( session('mensaje') )
        <script>
            toastr.warning('{{ session('mensaje') }}');
        </script>
    @endif
<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
            <h1>{{ $alumno->nombre ." ". $alumno->apellidos }}<small class="pull-right"> Promedio: {{ $promedioT }}</small></h1>
        </div>
        <div class="card-body">
            {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
            {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
            <table id="table_id" class="ui celled table" style="width:100%">
            {{--<table id="table_id" class="table compact display table-sm">--}}
                <thead>
                <tr>
                    {{--<th>#</th>--}}
                    <th>Nombre</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                @foreach($controls as $materias)

                    <tr>
                        {{--<td>{{ $materias->id }}</td>--}}
                        <td>{{ $materias->materia }}</td>
                        <td>

                            <form action="{{ url ('/eliminarcurso/' . $materias->id) }}" method="post">
                                {{ csrf_field() }}
                                {{ method_field('delete') }}
                                <a type="" href="{{ url ('/addnotas/' . $alumno->id ."/". $materias->id)  }}" class="btn btn-sm btn-success"> Agregar notas</a>
                                <a type="" href="{{ url ('/pronotas/' . $alumno->id ."/". $materias->id)  }}" class="btn btn-sm btn-info"> Ver notas</a>
                                <input type="submit" class="btn btn-sm btn-danger" value="Eliminar Curso">
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>




@endsection
