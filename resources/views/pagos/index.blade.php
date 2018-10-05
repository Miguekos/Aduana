@extends('layouts.app')

@section('content')

<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#uploadModal">Subir Archivo</button>

                    <!-- Modal -->
                    <div id="uploadModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                    
                        <!-- Modal content-->
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div class="modal-body">
                            <!-- Form -->
                            <form method='post' action='' enctype="multipart/form-data">
                              Seleciona el archivo a subir : <input type='file' name='file' id='file' class='form-control' ><br>
                              <input type='button' class='btn btn-info' value='Subir' id='upload'>
                            </form>
                            <!-- Preview-->
                            <div id='preview'></div>
                          </div>
                     
                        </div>
                    
                      </div>
                    </div>
        </div>
        <div class="card-body">
            <table id="table_id" class="ui celled table" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>DNI / C.E</th>
                        <th>Matricula</th>
                        <th>Monto Cancelado</th>
                        <th>Deuda</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                
                <tbody>
                        @foreach ($pago as $pagos)        
                    <tr>
                        <td>{{ $pagos->id }}</td>
                        <td>{{ $pagos->nombre }}</td>
                        <td>{{ $pagos->apellidos }}</td>
                        <td>{{ $pagos->dni }}</td>
                        <td>{{ $pagos->matricula }}</td>
                        <td>{{ $pagos->abonado }}</td>
                        <td>{{ $pagos->deuda }}</td>
                        <td>{{ $pagos->id }}</td>
                    </tr>
                    
                </tbody>
                @endforeach
            </table>
        </div>
    </div>
</div>

@endsection