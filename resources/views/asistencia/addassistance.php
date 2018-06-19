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


echo "
<div class='row'>
  <div class='col-lg-3'>
</div>

<div class='col-lg-6'>
<div class='asistio'>Nombre: <b>"."$alumnos->nombre"." "."$alumnos->apellidos"."</b><br>
Registro:</u> <b></b><br>
Asistencia:</u> <b> </b><br>
Frecuencia:</u> <b>"."$alumnos->frecuencia"."</b><br>
Inicio el:</u> <b> "."$alumnos->fecha_de_inicio"."</b><br>
Modalidad:</u> <b> "."$alumnos->modalidad"."</b><br>
Horario:</u> <b> "."$alumnos->horarios"."</b><br>
Curso:</u> <b> "."$alumnos->tipo_de_curso"."</b><br>
</div>

<div class='col-lg-3'>
</div>
";

?>

</body>
</html>
