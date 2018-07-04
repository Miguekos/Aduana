<?php

//Con esto personalizo el nombre del archivo exportado
date_default_timezone_set('America/Lima');
$fechaA = date("Y-m-d_g:i_a");
$fechaB = date("Y-m-d");
$nombre = "Alumno_".$alumno->nombre."_".$alumno->apellidos."_".$fechaA.".xlsx";
// echo "$nombre";


    require_once 'Classes/PHPExcel.php';
    //$objPHPExcel = new PHPExcel();
    $objReader = new PHPExcel_Reader_Excel2007();
    $objPHPExcel = $objReader->load("../Alumno.xlsx");
    // $objPHPExcel = $objReader->load("../nuevol/Alumno.xlsx");


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
        $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.'7', $alumno->tipo_de_curso_id($alumno->tipo_de_curso))
            ->setCellValue('A'.'10', $alumno->horario_id($alumno->horario))
            ->setCellValue('C'.'10', $alumno->definir_horas)
            ->setCellValue('E'.'5', $fechaB)
            ->setCellValue('A'.'16', $alumno->modalidad_id($alumno->modalidad))
            ->setCellValue('A'.'13', $alumno->frecuencia_id($alumno->frecuencia))
            ->setCellValue('A'.'35', $alumno->formas_de_pago_id($alumno->formas_de_pago))
            ->setCellValue('A'.'39', $alumno->publicidad_id($alumno->publicidad))
            ->setCellValue('G'.'39', $alumno->publicidad_otros)
            ->setCellValue('H'.'10', $alumno->fecha_de_inicio)
            ->setCellValue('B'.'19', $alumno->nombre)
            ->setCellValue('F'.'19', $alumno->apellidos)
            ->setCellValue('B'.'20', $alumno->direccion)
            ->setCellValue('B'.'21', $alumno->departamento)
            ->setCellValue('H'.'21', $alumno->edad)
            ->setCellValue('H'.'22', $alumno->dni)
            ->setCellValue('B'.'22', $alumno->lugar_de_nacimiento)
            ->setCellValue('B'.'23', $alumno->telf_fijo)
            ->setCellValue('D'.'23', $alumno->celular_p)
            ->setCellValue('F'.'23', $alumno->email)
            ->setCellValue('F'.'24', $alumno->facebook)
            ->setCellValue('B'.'25', $alumno->padre_apoderado)
            ->setCellValue('B'.'26', $alumno->dni_apo)
            ->setCellValue('D'.'26', $alumno->telf_fijo_apo)
            ->setCellValue('F'.'26', $alumno->celular_apo)
            ->setCellValue('C'.'27', $alumno->email_envio_material)
            ->setCellValue('C'.'28', $alumno->persona_de_contacto)
            ->setCellValue('C'.'29', $alumno->lugar_de_estudio)
            ->setCellValue('C'.'30', $alumno->carrera_estudio)
            ->setCellValue('C'.'31', $alumno->centro_laboral)
            ->setCellValue('C'.'32', $alumno->direccion_laboral)
            ->setCellValue('A'.'36', $alumno->totalidad_fp)
            ->setCellValue('D'.'36', $alumno->por_cuotas_m_fp)
            ->setCellValue('F'.'36', $alumno->matricula)
            ->setCellValue('H'.'35', $alumno->fecha_de_pago_cronocrama)
            ->setCellValue('C'.'48', $alumno->razon_social_fac)
            ->setCellValue('B'.'49', $alumno->dni_fac)
            ->setCellValue('F'.'49', $alumno->telf_fac)
            ->setCellValue('B'.'50', $alumno->direccion_fac)
            ->setCellValue('C'.'53', $alumno->atentido)
            ->setCellValue('G'.'69', $alumno->dni);

header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename='."$nombre");
header('Cache-Control: max-age=0');

$objWriter=PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter->save('php://output');
exit;
mysql_close ();
?>
