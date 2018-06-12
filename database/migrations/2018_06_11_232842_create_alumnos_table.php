<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlumnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tipo_de_curso')->unsigned()->nullable();
            $table->foreign ('tipo_de_curso')->references('id')->on('tipodecursos');
            $table->integer('horario')->unsigned()->nullable();
            $table->foreign('horario')->references('id')->on('horarios');
            $table->string('definir_horas')->nullable();
            $table->date('fecha_de_inicio')->nullable()->nullable();
            $table->integer('frecuencia')->unsigned()->nullable();
            $table->foreign ('frecuencia')->references('id')->on('frecuencias');
            $table->integer('modalidad')->unsigned()->nullable();
            $table->foreign ('modalidad')->references('id')->on('modalidads');
            $table->string('apellidos')->nullable();
            $table->string('nombre')->nullable();
            $table->string('direccion')->nullable();
            $table->string('departamento')->nullable();
            $table->integer('edad')->nullable();
            $table->integer('dni')->unique();
            $table->string('lugar_de_nacimiento')->nullable();
            $table->string('telf_fijo')->nullable();
            $table->string('celular_p')->nullable();
            $table->string('email')->unique();
            $table->string('facebook')->nullable();
            $table->string('padre_apoderado')->nullable();
            $table->integer('dni_apo')->nullable();
            $table->string('telf_fijo_apo')->nullable();
            $table->string('celular_apo')->nullable();
            $table->string('email_envio_material')->nullable();
            $table->string('persona_de_contacto')->nullable();
            $table->string('lugar_de_estudio')->nullable();
            $table->string('carrera_estudio')->nullable();
            $table->string('centro_laboral')->nullable();
            $table->string('direccion_laboral')->nullable();
            $table->integer('formas_de_pago')->unsigned()->nullable();
            $table->foreign('formas_de_pago')->references('id')->on('pagos');
            $table->string('totalidad_fp')->nullable();
            $table->string('por_cuotas_m_fp')->nullable();
            $table->string('matricula')->nullable();
            $table->string('fecha_de_pago_cronocrama')->nullable();
            $table->string('publicidad')->nullable();
            $table->string('razon_social_fac')->nullable();
            $table->integer('dni_fac')->nullable();
            $table->string('telf_fac')->nullable();
            $table->string('direccion_fac')->nullable();
            $table->string('atentido')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
}
