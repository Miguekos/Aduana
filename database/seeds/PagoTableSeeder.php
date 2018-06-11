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
        for ($i = 0; $i < 3; $i++){
            if ($i == 0){
                $nombre = "Efectivo";
            }elseif ($i == 1){
                $nombre = "Debito";
            }elseif ($i == 2){
                $nombre = "Credito";
            }
            $pago = Pago::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
