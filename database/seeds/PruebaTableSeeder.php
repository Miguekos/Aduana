<?php

use App\Prueba;
use Illuminate\Database\Seeder;

class PruebaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 6; $i++){
            if ($i == 0){
                $prueba = "Prueba 1";
            }elseif ($i == 1){
                $prueba = "Prueba 2";
            }elseif ($i == 2){
                $prueba = "Prueba 3";
            }elseif ($i == 3){
                $prueba = "Prueba 4";
            }elseif ($i == 4){
                $prueba = "Prueba 5";
            }elseif ($i == 5){
                $prueba = "Prueba 6";
            }
            $tipodecurso = Prueba::create ([
                'prueba' => $prueba,
            ]);
        }
    }
}
