<?php

use App\Modalidad;
use Illuminate\Database\Seeder;

class ModalidadTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 2; $i++){
            if ($i == 0){
                $nombre = "Presencial";
            }elseif ($i == 1){
                $nombre = "Virtua|l";
            }
            $modalidad= Modalidad::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
