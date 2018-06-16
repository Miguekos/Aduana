@extends('layouts.app')

@section('title', 'Reporte')
@section('pagina', 'Reporte')

@section('content')


<?php
$server = "localhost";
// $name_db = "fitseven_miguel";
// $pass_db = "Alexkos12.";
// $db = "fitseven_gymsport";

$name_db = "root";
$pass_db = "";
$db = "nuevol";

$con = new mysqli($server,$name_db,$pass_db,$db);
//print_r($con);
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}else{
    //echo "Conecto";
}
$sql  = "select * from assistance";
$result = mysqli_query($con,$sql);
// while($ver_asis = mysqli_fetch_object($result)){
// 	$num_asis = $ver_asis->person_id;

// 	$sql1  = "select * from cliente where id = $num_asis";
//  $result1 = mysqli_query($con,$sql1);
// 	$ver_nombre = mysqli_fetch_object($result1);
// echo $ver_nombre->nombre ."<br>";
// }
?>
<div class="col-lg-12">
    <div class="card">
        <div class="card-header">
            <i class="fa fa-align-justify"></i> Reportes de Asistencia
        </div>
        <div class="card-body">
            {{--<table id="table_id" class="table compact display table-responsive-sm table-bordered table-striped table-sm">--}}
            {{--<table class="table table-responsive-sm table-bordered table-striped table-sm">--}}
            <table id="table_id" class="table compact display table-sm">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombres</th>
                            <th>DNI</th>
                            <th class="text-center">Fecha de de Asistencia</th>
                            {{--<th class="text-center">Deuda</th>--}}
                            {{--<th class="text-center">Fecha Venc.</th>--}}
                            {{--<th class="text-center">Promo</th>--}}
                            <!-- <th class="text-center">Accion</th> -->
                            <!-- <th>Estado</th> -->
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        while($ver_asis = mysqli_fetch_object($result)){
                        $num_asis = $ver_asis->person_id;

                        $sql1  = "select * from alumnos where id = $num_asis ORDER by id DESC";
                        $result1 = mysqli_query($con,$sql1);
                        $post = mysqli_fetch_object($result1);
                        // echo $ver_nombre->nombre ."<br>";
                        ?>
                        <tr>
                            <td><?=$post->id;?></td>
                            <td><?=$post->nombre;?></td>
                            <td><?=$post->dni;?></td>
                            <td class="text-center"><?php echo $ver_asis->date_at; ?></td>

                        </tr>
                        <?php }?>
                        </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>








@endsection()
