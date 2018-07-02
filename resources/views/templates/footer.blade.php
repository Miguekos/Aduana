    <footer class="app-footer">
      <div>
        <a href="#">Miguekos</a>
        <span>&copy; 2018 creativeLabs.</span>
      </div>
      {{--<div class="ml-auto">--}}
        {{--<span>Powered by</span>--}}
        {{--<a href="#">Miguekos</a>--}}
      {{--</div>--}}
    </footer>
    <!-- Bootstrap and necessary plugins-->

    <script src="{{ asset('coreui/node_modules/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('coreui/node_modules/popper.js/dist/umd/popper.min.js') }}"></script>
    <script src="{{ asset('coreui/node_modules/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('coreui/node_modules/pace-progress/pace.min.js') }}"></script>
    <script src="{{ asset('coreui/node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js') }}"></script>
    <script src="{{ asset('coreui/node_modules/@coreui/coreui/dist/js/coreui.min.js') }}"></script>
    <!-- Plugins and scripts required by this view-->
    {{--<script src="{{ asset('coreui/node_modules/chart.js/dist/Chart.min.js') }}"></script>--}}

    <script src="{{ asset('coreui/node_modules/@coreui/coreui-plugin-chartjs-custom-tooltips/dist/js/custom-tooltips.min.js') }}"></script>
    {{--<script src="{{ asset('coreui/js/main.js') }}"></script>--}}
    <script type="text/javascript" charset="utf8" src="{{ asset('coreui/js/jquery.dataTables.js') }}"></script>

    {{--<script src="{{ asset('coreui/table/dataTables.jqueryui.min.js') }}"></script>--}}

    <script src="{{ asset('coreui/table/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('coreui/table/dataTables.semanticui.min.js') }}"></script>
    <script src="{{ asset('coreui/table/semantic.min.js') }}"></script>


    <script type="text/javascript">
        $(document).ready(function(){
            $("#table_id").DataTable({
                "order": [[ 0, "desc" ]],
                "language": {
                    "sProcessing":    "Procesando...",
                    "sLengthMenu":    "Mostrar _MENU_ registros",
                    "sZeroRecords":   "No se encontraron resultados",
                    "sEmptyTable":    "Ningún dato disponible en esta tabla",
                    "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":   "",
                    "sSearch":        "Buscar:",
                    "sUrl":           "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":    "Último",
                        "sNext":    "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });
        });
    </script>

    </html>