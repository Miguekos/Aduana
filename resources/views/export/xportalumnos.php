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

$id = 1;

$conexion = new mysqli($server,$name_db,$pass_db,$db);
$sql = "SELECT * FROM alumnos where id = '$id'";

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
        ->setTitle("Exportar excel desde mysql")
        ->setSubject("Deudores")
        ->setDescription("Documento generado con PHPExcel")
        ->setKeywords("miguekos1233@gmail.com  con  phpexcel")
        ->setCategory("Clientes");

    // Renombrar Pestaña
    $objPHPExcel->getActiveSheet()->setTitle('Deudores');


    while ($registro = mysqli_fetch_object($resultado)) {

        $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.'2', 'asd')
            ->setCellValue('B'.'19', $registro->nombre)
            ->setCellValue('F'.'19', $registro->apellidos)
            ->setCellValue('B'.'20', $registro->direccion)
            ->setCellValue('B'.'21', $registro->departamento)
            ->setCellValue('F'.$i, $registro->edad)
            ->setCellValue('G'.'1', $registro->dni)
            ->setCellValue('H'.'1', $registro->lugar_de_nacimiento)
            ->setCellValue('I'.$i, $registro->telf_fijo)
            ->setCellValue('J'.$i, $registro->celular_p)
            ->setCellValue('K'.$i, $registro->email)
            ->setCellValue('L'.$i, $registro->facebook)
            ->setCellValue('M'.$i, $registro->padre_apoderado)
            ->setCellValue('N'.$i, $registro->venc)
            ->setCellValue('O'.$i, $registro->dni_apo)
            ->setCellValue('P'.$i, $registro->telf_fijo_apo)
            ->setCellValue('Q'.$i, $registro->celular_apo)
            ->setCellValue('R'.$i, $registro->email_envio_material)
            ->setCellValue('S'.$i, $registro->persona_de_contacto)
            ->setCellValue('T'.$i, $registro->lugar_de_estudio)
            ->setCellValue('U'.$i, $registro->carrera_estudio)
            ->setCellValue('F'.$i, $registro->centro_laboral)
            ->setCellValue('G'.'1', $registro->direccion_laboral)
            ->setCellValue('H'.'1', $registro->formas_de_pago)
            ->setCellValue('I'.$i, $registro->totalidad_fp)
            ->setCellValue('J'.$i, $registro->por_cuotas_m_fp)
            ->setCellValue('K'.$i, $registro->matricula)
            ->setCellValue('L'.$i, $registro->fecha_de_pago_cronocrama)
            ->setCellValue('M'.$i, $registro->publicidad)
            ->setCellValue('N'.$i, $registro->publicidad_otros)
            ->setCellValue('O'.$i, $registro->razon_social_fac)
            ->setCellValue('P'.$i, $registro->dni_fac)
            ->setCellValue('Q'.$i, $registro->direccion_fac)
            ->setCellValue('R'.$i, $registro->atentido);
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