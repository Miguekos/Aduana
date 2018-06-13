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
            ->setCellValue('H'.'9', $registro->frecuencia_id($registro->frecuencia_id))
            ->setCellValue('H'.'9', $registro->fecha_de_inicio)
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
            ->setCellValue('C'.'35', $registro->formas_de_pago)
            ->setCellValue('A'.'36', $registro->totalidad_fp)
            ->setCellValue('D'.'36', $registro->por_cuotas_m_fp)
            ->setCellValue('F'.'36', $registro->matricula)
            ->setCellValue('H'.'36', $registro->fecha_de_pago_cronocrama)
            ->setCellValue('G'.'40', $registro->publicidad)
            ->setCellValue('C'.'49', $registro->razon_social_fac)
            ->setCellValue('B'.'50', $registro->dni_fac)
            ->setCellValue('F'.'50', $registro->telf_fac)
            ->setCellValue('B'.'51', $registro->direccion_fac)
            ->setCellValue('C'.'54', $registro->atentido)
            ->setCellValue('G'.'40', $registro->dni);
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