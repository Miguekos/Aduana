<?php

use Illuminate\Database\Seeder;
use App\Pago;
class PagoTableSeeder extends Seeder
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
                $nombre = "Pago Mensual";
            }elseif ($i == 1){
                $nombre = "Pago Contado/Visa Net";
            }
            $pago = Pago::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
