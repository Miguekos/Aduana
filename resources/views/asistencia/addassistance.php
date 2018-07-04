<!DOCTYPE html>
<html>
<head>


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

echo "
<div class='row'>
  <div class='col-lg-3'>
</div>

<div class='col-lg-6'>
<div class='asistio'>Nombre: <b>"."$alumno->nombre"." "."$alumno->apellidos"."</b><br>
Registro:</u> <b></b><br>
Asistencia:</u> <b> </b><br>
Frecuencia:</u> <b>"."$alumno->frecuencia"."</b><br>
Inicio el:</u> <b> "."$alumno->fecha_de_inicio"."</b><br>
Modalidad:</u> <b> "."$alumno->modalidad"."</b><br>
Horario:</u> <b> "."$alumno->horarios"."</b><br>
Curso:</u> <b> "."$alumno->tipo_de_curso"."</b><br>
</div>

<div class='col-lg-3'>
</div>
";

?>
</body>
</html>
