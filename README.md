Tipo de Curso
    Auxiliar de Despacho Aduanero (curso)
    Sectorista Aduanero (curso)
    Liquidador Aduanero (curso)
    Gestor Aduanero(carrera)
    Diplomado de Com. Intern. y Aduana
    Otros

Horarios
    Mañana
    Tarde
    Noche
    Definir Horas (Otros)

Fecha de Inicio


Frecuencia
    Intensivo (L - V)
    Interdiario (L - M - V)
    Sabados
    Otros (Especificar)


Modalidad
    Presencial
    Virtual

Datos Personales
    Apellidos
    Nombres
    Direccion
    Departamento/Provincia/Distrito
    Edad
    DNI
    Lugar de Nacimiento
    Telf. Fijo
    Celular
    Email
    Facebook
    Padre o Apoderado
    DNI Padre o Apoderado - Telf. Fijo . - Celular
    Direccion para envio de material virtual
    Persona de contacto (Emergencias)
    Lugar de Estudios (Actual)
    Carrera de Estudio/Titulo
    Centro Laboral
    Direccion Centro Laboral

Forma de pago


Medio por el cual se entero del Curso/Carrera/Diplomado
    En el Local
    Via Email
    Facebook
    Amigos
    Twitter
    Otros (Especificar)

Datos para emitir facturas
    Nombre/Razon Social
    DNI / RUC
    Telf
    Direccion

Inscrito por el Promotor


$table->increments('id');
$table->string('tipo_de_curso');
$table->string('horarios');
$table->date('fecha_de_inicio');
$table->string('frecuencia');
$table->string('modalidad');
$table->string('apellidos');
$table->string('nombre');
$table->string('direccion');
$table->string('departamento');
$table->integer('edad');
$table->integer('dni')->unique();
$table->string('lugar_de_nacimiento');
$table->string('telf_fijo');
$table->string('celular_p');
$table->string('email')->unique();
$table->string('facebook');
$table->string('padre_apoderado');
$table->integer('dni_apo');
$table->string('telf_fijo_apo');
$table->string('celular_apo');
$table->string('email_envio_material');
$table->string('persona_de_contacto');
$table->string('lugar_de_estudio');
$table->string('carrera_estudio');
$table->string('centro_laboral');
$table->string('direccion_laboral');
$table->string('formas_de_pago');
$table->string('publicidad');
$table->string('razon_social_fac');
$table->integer('dni_fac');
$table->string('telf_fac');
$table->string('direccion_fac');
$table->string('atentido');
$table->timestamps();
