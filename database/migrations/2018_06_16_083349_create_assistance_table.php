<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssistanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assistance', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('person_id')->nullable();
            $table->string('nombre')->nullable();
            $table->string('dni')->nullable();
            $table->string('apellidos')->nullable();
            $table->date('fecha_de_inicio')->nullable();
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assistance');
    }
}
