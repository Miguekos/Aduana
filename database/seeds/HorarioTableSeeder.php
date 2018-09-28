<?php

use Illuminate\Database\Seeder;
use App\Horario;
class HorarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 4; $i++){
            if ($i == 0){
                $nombre = "Mañana";
            }elseif ($i == 1){
                $nombre = "Tarde";
            }elseif ($i == 2){
                $nombre = "Noche";
            }elseif ($i == 3){
                $nombre = "Otros (Especificar)";
            }
            $horario = Horario::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
