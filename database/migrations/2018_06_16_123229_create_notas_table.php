<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->increments('id');
            $table->string ('id_alumno')->nullable();
            $table->integer ('id_materia')->nullable();
            $table->string ('nombre_materia')->nullable();
            $table->integer ('nota')->nullable();
            $table->integer ('prueba')->unsigned()->nullable();
            $table->foreign('prueba')->references('id')->on('pruebas');
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
        Schema::dropIfExists('notas');
    }
}
