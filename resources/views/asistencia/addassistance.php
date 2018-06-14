<!DOCTYPE html>
<html>
<head>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <!-- <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
    <!-- <meta http-equiv="Refresh" content="5;url=/agregarasistencia.php"> -->

    <!-- <meta id="meta-refresh" http-equiv="refresh" content="30; URL=(your url)"> -->
<style>
.asistio{
margin-bottom: 0px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background-color: #5cb85c;
color: white;
border-radius: 5px;
padding-top: 5%;
padding-bottom: 5%;
font-size: 130%;
text-align: justify;
padding-left: 10%;
}
.emp{
margin-bottom: 0px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background-color: #60a917;
color: white;
border-radius: 5px;
padding-top: 80px;
padding-bottom: 90px;
text-align: justify;
padding-left: 10%;
}
.vencio{
margin-bottom: 0px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background-color: #f0ad4e;
color: white;
border-radius: 5px;
padding-top: 5%;
padding-bottom: 5%;
font-size: 130%;
text-align: justify;
padding-left: 10%;
}
.borro{
margin-bottom: 0px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background-color: #d9534f;
color: white;
border-radius: 5px;
padding-top: 5%;
padding-bottom: 5%;
font-size: 130%;
text-align: justify;
padding-left: 10%;
}
.paso{
margin-bottom: 0px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
background-color: #337ab7;
color: white;
border-radius: 5px;
padding-top: 100px;
padding-bottom: 100px;
text-align: justify;
padding-left: 10%;

}
</style>
</head>
<body>

<?php

date_default_timezone_set('America/Lima');
$dias_S = array("Dom","Lun","Mar","Mie","Jue","Vie","Sab");
$meses_S = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
$fcs = $dias_S[date('w')]." ".date('j').", ".$meses_S[date('n')-1]. "  ".date('Y'). ", " .date('g:i a');
$fcs1 = $dias_S[date('w')]." ".date('j');
$fechaS = $dias_S[date('w')];
$fecha = date("Y-m-d");
$fecha1 = date("d-m-Y");
$fecha2 = date("d");
$fecha3 = date("m");
$fecha4 = date("Y");
$fecha6 = date("Y-M-D");


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

//Identificar el ID maximo actual

$query3  = "SELECT MAX(id) FROM alumnos";
$reseult_max_id = mysqli_query($con, $query3);
$u_id = mysqli_fetch_row($reseult_max_id);
$max_id = $u_id[0];


mysqli_select_db($con,"sd");
    mysqli_select_db($con,"");
    $sql="SELECT * FROM `alumnos` WHERE dni = '".$add."'";
    // echo $sql;
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_array($result);
    $fee = $fcs;
    $kind = 1;
    $idd = $row['id'];
    $fecha_estandar = date("Y-m-d");

    if ($idd !== null) {
        $sql="SELECT * FROM `alumnos` WHERE dni = '".$add."'";
        //print_r($sql);
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_array($result)) {
            $namee = "<h1>".$row['nombre']."</h1>";
            $fecha_inicio = $row['fecha_de_inicio'];


            $hora_nombre = $row['horario'];
            $frec_nombre = $row['frecuencia'];
            $curso_nombre = $row['tipo_de_curso'];
            $moda_nombre = $row['modalidad'];
            $pago_nombre = $row['formas_de_pago'];
            $publi_nombre = $row['publicidad'];


            $modalidad = "select * from modalidads where id = '$moda_nombre'";
            $modalidad = mysqli_query($con, $modalidad);
            $modalidad = mysqli_fetch_object($modalidad);

            $hora = "select * from horarios where id = '$hora_nombre'";
            $hora = mysqli_query($con, $hora);
            $hora = mysqli_fetch_object($hora);
            $horaa = utf8_encode($hora->nombre);

            $frecuencia = "select * from frecuencias where id = '$frec_nombre'";
            $frecuencia = mysqli_query($con, $frecuencia);
            $frecuencia = mysqli_fetch_object($frecuencia);

            $curso = "select * from tipodecursos where id = '$curso_nombre'";
            $curso = mysqli_query($con, $curso);
            $curso = mysqli_fetch_object($curso);

            $pago = "select * from pagos where id = '$pago_nombre'";
            $pago = mysqli_query($con, $pago);
            $pago = mysqli_fetch_object($pago);

            $publi = "select * from publicidads where id = '$publi_nombre'";
            $publi = mysqli_query($con, $publi);
            $publi = mysqli_fetch_object($publi);


            //$namee = $row['nombre'];
            // $deudaa = $row['deuda'];
            // $ffin = $row['fecha_fin'];
            //echo date("Y-m-d",$ffin);
            //echo $ffin;
            // $date12 = date_create("$ffin");
            // $ffinf = date_format($date12, 'd-m-Y');
            }
            //Aqui se inserta la asistencia.
            //mysqli_select_db($con,"");
            $sql1="INSERT INTO `assistance`(`kind_id`, `date_at`, `person_id`, `user_id`, `total_asis`) VALUES ('1','$fee','$idd','1','0')";
            // echo $sql1;
            $result1 = mysqli_query($con,$sql1);

            // $date14 = date_create("$ffin");
            // $diaU = date_format($date14, 'd');
            // $mesU = date_format($date14, 'm');
            // $anoU = date_format($date14, 'Y');



                //Suma la cantidad de asistencia
            $sql2="SELECT SUM(kind_id) FROM assistance WHERE person_id = '".$idd."'";
            $result2 = mysqli_query($con,$sql2);
            $row2 = mysqli_fetch_row($result2);

            if (0 == 0) {
              $color = "asistio";

              // echo "<iframe src='prueba.php' width='300' height='300'>aqui esta</iframe>";

            }else {
              $color = "borro";
            }

            echo "
            <div class='row'>
              <div class='col-lg-3'>
            </div>

            <div class='col-lg-6'>
            <div data-toggle='modal' data-target='#$idd' class='"."$color"."'><b>"."$namee"."</b>
            Registro:</u> <b>"." $fee"."</b><br>
            Asistencia:</u> <b> ". $row2['0']."</b><br>
            Frecuencia:</u> <b>"."$frecuencia->nombre "." </b><br>
            Inicio el:</u> <b> "." $fecha_inicio"."</b><br>
            Modalidad:</u> <b> "." $modalidad->nombre"."</b><br>
            Horario:</u> <b> "." $horaa"."</b><br>
            Curso:</u> <b> "." $curso->nombre"."</b><br>
            </div>

            <div class='col-lg-3'>
            </div>
            ";
      }else {
          echo "
          <div class='col-sm-3'>
          </div>
          <div class='col-sm-6 alert alert-warning'>
            <strong>Alerta! </strong> Usted no esta en la base de datos.
          </div>
          <div class='col-sm-3'>
          </div>
          ";
        }


mysqli_close($con);
?>

</body>
</html>
