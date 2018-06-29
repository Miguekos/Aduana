<?php

use App\Frecuencia;
use Illuminate\Database\Seeder;

class FrecuenciaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++){
            if ($i == 0){
                $nombre = "Intensivo (L - V)";
            }elseif ($i == 1){
                $nombre = "Interdiario (L - M - V)";
            }elseif ($i == 2){
                $nombre = "Sabados";
            }elseif ($i == 3){
                $nombre = "Mar-Jue-Sab";
            }elseif ($i == 4){
                $nombre = "Otros (Especificar)";
            }
            $frecuancia = Frecuencia::create ([
                'nombre' => $nombre,
            ]);
        }

    }
}