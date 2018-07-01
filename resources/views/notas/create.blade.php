@extends('layouts.app')

@section('title', 'Agregar Notas')
@section('pagina', 'Control')
@section('urlpagina', '/control')
@section('pagina1', 'Agregar Notas')
@section('active1','breadcrumb-item active')

@section('content')

    <form action="{{ route ('nota.store') }}" method="post">
        {{ csrf_field() }}
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <div class="title"><h1>{{ $alumnos->nombre }} {{ $alumnos->apellidos }} </h1></div>
                <div class="">
                    <h5>{{ $materias->materia }}</h5>
                </div>
            </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="nota">Agregar nota</label>
                        <select class="form-control col-sm-1" name="nota" id="nota">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                        {{--<input type="text" class="form-control col-lg-6" placeholder="Agrega la nota" name="nota" id="nota">--}}
                        <input type="hidden" name="id_alumno" value="{{ $alumnos->id }}">
                        <input type="hidden" name="id_materia" value="{{ $materias->id }}">
                        <input type="hidden" name="nombre_materia" value="{{ $materias->materia }}">
                    </div>
                    <div class="form-group">
                        <label for="comentario">Agregar Comentario</label>
                        <select class="form-control col-sm-3" name="prueba" id="prueba">
                            @foreach($prueba as $pruebas)
                            <option value="{{ $pruebas->id }}">{{ $pruebas->prueba }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" class="btn btn-primary" value="Guardar">
                </div>
            </div>
        </div>
    </div>
    </form>

@endsection