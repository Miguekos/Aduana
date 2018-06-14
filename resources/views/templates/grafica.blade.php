<link href="/asis/AdminLTE.min.css" rel="stylesheet" type="text/css" />
<script src="/asis/highcharts.js"></script>
<?php

date_default_timezone_set('America/Lima');
//Un arreglo para convertir la fecha en espa#ol
$dias_S = array("Dom","Lun","Mar","Mie","Jue","Vie","Sab");
$meses_S = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

//Imprimier fecha en espa#ol
$fcs = $dias_S[date('w')]." ".date('j').", ".$meses_S[date('n')-1]. "  ".date('Y'). ", " .date('g:i a');
$fcs1 = $dias_S[date('w')]." ".date('j');
$fechaS = $dias_S[date('w')];

//Distintos Formatos de fecha
$fecha = date("Y-m-d");
$fecha1 = date("d-m-Y");
$fecha2 = date("d");
$fecha3 = date("m");
$fecha4 = date("Y");
$fecha6 = date("Y-M-D");

// include 'Database.php';

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
$conexion = new mysqli($server,$name_db,$pass_db,$db);

//Comprueba si existe alguna asistencia del dia actual
$query5  = "SELECT * FROM grafica WHERE tiempo = '$fecha'";
$total_b = mysqli_query($conexion, $query5);
$asd = mysqli_fetch_row($total_b);
$zxc = $asd[0];

//Declaracion de variable para usar de forma mas comoda el LIKE en mysql
$fechaM = $fcs1."%";

//Si no existe asistencia actual crea una
if ($zxc===null) {
    $query4  = "SELECT COUNT(*) FROM assistance WHERE date_at LIKE '$fechaM'";
    $total_a = mysqli_query($conexion, $query4);
    $asd = mysqli_fetch_row($total_a);
    $qwe = $asd[0];

    $query5  = "INSERT INTO `grafica`(valor, tiempo, dia) VALUES ('$qwe','$fecha','$fechaS')";
    $resultado1 = $conexion -> query($query5);

    //Si ya existe actualiza la que esta
}else{

    $query4  = "SELECT COUNT(*) FROM assistance WHERE date_at LIKE '$fechaM' and kind_id = 1";
    $total_a = mysqli_query($conexion, $query4);
    $asd = mysqli_fetch_row($total_a);
    $qwe = $asd[0];

    $query6  = "UPDATE `grafica` SET `valor`='$qwe' WHERE tiempo = '$fecha'";
    $total_c = mysqli_query($conexion, $query6);

}
//---FIN de grafica de asistencia


//Inicio --- Pintar la Grafica

//Ordena e imprmime los ultimos 15 dias por nombr
$query7 = "SELECT dia FROM (SELECT `ID`, `dia` FROM grafica ORDER BY ID DESC LIMIT 15) sub ORDER BY `ID` ASC";
$diaaa = mysqli_query($conexion, $query7);

//Ordena e imprmime los ultimos 15 dias por Cantidad de asistencias
$sql3 = "SELECT valor FROM (SELECT `ID`, `valor` FROM grafica ORDER BY ID DESC LIMIT 15) sub ORDER BY `ID` ASC";
$total_f = mysqli_query($conexion, $sql3);
?>

<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-warning">


                    <div id="container"></div>



        <script type="text/javascript">
            Highcharts.chart('container', {
                title: {
                    text: 'Estadistica de Asistencia'
                },
                subtitle: {
                    text: 'Escuela Aduana'
                },
                xAxis: {
                    categories: [
                        <?php
                        while ($fila = mysqli_fetch_row($diaaa)) {
                            $dias = $fila[0];
                            echo "'".$dias."',";
                        }
                        ?>
                    ]
                },

                yAxis: {
                    title: {
                        text: 'Numero de Clientes'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },

                series: [
                    {
                        name: 'Asistencia',
                        data: [<?php
                            $asd = $total_f;
                            while ($fila = mysqli_fetch_row($asd)) {
                                echo $fila[0].",";
                            }
                            ?>], color:'orange'
                    },
                ]
            });
        </script>
            </div>
        </div>
    </div>
</section>
