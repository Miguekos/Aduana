<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->call(UserTableSeeder::class);
        $this->call(FrecuenciaTableSeeder::class);
        $this->call(HorarioTableSeeder::class);
        $this->call(ModalidadTableSeeder::class);
        $this->call(PagoTableSeeder::class);
        $this->call(TipodecursoTableSeeder::class);
        $this->call(PublicidadTableSeeder::class);
        $this->call(PruebaTableSeeder::class);
        // $this->call(MembresiaTableSeeder::class);

    }
}
