<?php

use App\Publicidad;
use Illuminate\Database\Seeder;

class PublicidadTableSeeder extends Seeder
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
                $nombre = "En el local";
            }elseif ($i == 1){
                $nombre = "Via e-mail";
            }elseif ($i == 2){
                $nombre = "Facebook";
            }elseif ($i == 3){
                $nombre = "Amigos";
            }elseif ($i == 4){
                $nombre = "Twitter";
            }elseif ($i == 5){
                $nombre = "Otros";
            }
            $tipodecurso = Publicidad::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
