<div class="container">
    {{--<h2>Modal Example</h2>--}}
    <!-- Trigger the modal with a button -->
    {{--<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal{{ $curso->id }}">Open Modal</button>--}}

    <!-- Modal -->
    <div class="modal fade" id="myModal{{ $curso->id }}" role="dialog">
        {{--<form id="update" action="{{ url ('/updatenotas/' . $curso->id ."/". $alumnos->id)  }}" method="post">--}}
        <form id="update" action="{{ route('nota.update',$curso->id) }}" method="post">
            {{ csrf_field() }}
            {{ method_field('PATCH') }}
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    {{--<button type="button" class="close" data-dismiss="modal">&times;</button>--}}
                    <h4 class="modal-title pull-right">Editar Nota</h4>
                </div>
                <div class="modal-body">
                    <label for="{{ $curso->nombre_materia}}">{{ $curso->nombre_materia}}</label>
                    <input type="text" class="form-control" value="{{ $curso->nota }}" name="nota" id="nota">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" id="update" class="btn btn-default">Guardar</button>
                </div>
            </div>
        </div>
        </form>
    </div>
</div>