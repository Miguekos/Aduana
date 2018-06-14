<?php

$server = "localhost";
$name_db = "root";
$pass_db = "";
$db = "nuevol";

//$name_db = "fitseven_miguel";
//$pass_db = "Alexkos12.";
//$db = "fitseven_gymsport";

//Con esto personalizo el nombre del archivo exportado
date_default_timezone_set('America/Lima');
$fechaA = date("Y-m-d_g:i_a");
$nombre = "Clientes_".$fechaA.".xlsx";
// echo "$nombre";

$conexion = new mysqli($server,$name_db,$pass_db,$db);
$sql = "SELECT * FROM alumnos where id = '$num'";

$resultado = mysqli_query($conexion, $sql);
//$registros = mysqli_fetch_row($resultado);
// echo $registros['id'];


    require_once 'Classes/PHPExcel.php';
    //$objPHPExcel = new PHPExcel();
    $objReader = new PHPExcel_Reader_Excel2007();
    $objPHPExcel = $objReader->load("../Alumno.xlsx");


    //Informacion del excel
    $objPHPExcel->
    getProperties()
        ->setCreator("miguekos1233@gmail.com")
        ->setLastModifiedBy("miguekos1233@gmail.com")
        ->setTitle("Laravel-Excel")
        ->setSubject("Planilla")
        ->setDescription("Documento generado con PHPExcel")
        ->setKeywords("miguekos1233@gmail.com  con  phpexcel")
        ->setCategory("Plantilla");

    // Renombrar Pestaña
    $objPHPExcel->getActiveSheet()->setTitle('Planilla');


    while ($registro = mysqli_fetch_object($resultado)) {
        $hora_nombre = $registro->horario;
        $frec_nombre = $registro->frecuencia;
        $curso_nombre = $registro->tipo_de_curso;
        $moda_nombre = $registro->modalidad;
        $pago_nombre = $registro->formas_de_pago;
        $publi_nombre = $registro->publicidad;

        $modalidad = "select * from modalidads where id = '$moda_nombre'";
        $modalidad = mysqli_query($conexion, $modalidad);
        $modalidad = mysqli_fetch_object($modalidad);

        $hora = "select * from horarios where id = '$hora_nombre'";
        $hora = mysqli_query($conexion, $hora);
        $hora = mysqli_fetch_object($hora);

        $frecuencia = "select * from frecuencias where id = '$frec_nombre'";
        $frecuencia = mysqli_query($conexion, $frecuencia);
        $frecuencia = mysqli_fetch_object($frecuencia);

        $curso = "select * from tipodecursos where id = '$curso_nombre'";
        $curso = mysqli_query($conexion, $curso);
        $curso = mysqli_fetch_object($curso);

        $pago = "select * from pagos where id = '$pago_nombre'";
        $pago = mysqli_query($conexion, $pago);
        $pago = mysqli_fetch_object($pago);

        $publi = "select * from publicidads where id = '$publi_nombre'";
        $publi = mysqli_query($conexion, $publi);
        $publi = mysqli_fetch_object($publi);


        $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.'7', $curso->nombre)
            ->setCellValue('A'.'10', $hora->nombre)
            ->setCellValue('C'.'10', $registro->definir_horas)
            ->setCellValue('A'.'16', $modalidad->nombre)
            ->setCellValue('A'.'13', $frecuencia->nombre)
            ->setCellValue('A'.'35', $pago->nombre)
            ->setCellValue('A'.'39', $publi->nombre)
            ->setCellValue('G'.'39', $registro->publicidad_otros)
            ->setCellValue('H'.'10', $registro->fecha_de_inicio)
            ->setCellValue('B'.'19', $registro->nombre)
            ->setCellValue('F'.'19', $registro->apellidos)
            ->setCellValue('B'.'20', $registro->direccion)
            ->setCellValue('B'.'21', $registro->departamento)
            ->setCellValue('H'.'21', $registro->edad)
            ->setCellValue('H'.'22', $registro->dni)
            ->setCellValue('B'.'22', $registro->lugar_de_nacimiento)
            ->setCellValue('B'.'23', $registro->telf_fijo)
            ->setCellValue('D'.'23', $registro->celular_p)
            ->setCellValue('F'.'23', $registro->email)
            ->setCellValue('F'.'24', $registro->facebook)
            ->setCellValue('B'.'25', $registro->padre_apoderado)
            ->setCellValue('B'.'26', $registro->dni_apo)
            ->setCellValue('D'.'26', $registro->telf_fijo_apo)
            ->setCellValue('F'.'26', $registro->celular_apo)
            ->setCellValue('C'.'27', $registro->email_envio_material)
            ->setCellValue('C'.'28', $registro->persona_de_contacto)
            ->setCellValue('C'.'29', $registro->lugar_de_estudio)
            ->setCellValue('C'.'30', $registro->carrera_estudio)
            ->setCellValue('C'.'31', $registro->centro_laboral)
            ->setCellValue('C'.'32', $registro->direccion_laboral)
            ->setCellValue('A'.'36', $registro->totalidad_fp)
            ->setCellValue('D'.'36', $registro->por_cuotas_m_fp)
            ->setCellValue('F'.'36', $registro->matricula)
            ->setCellValue('H'.'36', $registro->fecha_de_pago_cronocrama)
            ->setCellValue('C'.'48', $registro->razon_social_fac)
            ->setCellValue('B'.'49', $registro->dni_fac)
            ->setCellValue('F'.'49', $registro->telf_fac)
            ->setCellValue('B'.'50', $registro->direccion_fac)
            ->setCellValue('C'.'53', $registro->atentido)
            ->setCellValue('G'.'69', $registro->dni);
;
    }

header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename='."$nombre");
header('Cache-Control: max-age=0');

$objWriter=PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter->save('php://output');
exit;
mysql_close ();
?>