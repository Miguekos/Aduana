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
        $pago = Pago::create ([
            'nombre' => "Pagar en scotibank, con DNI en las cuentas de la Escuela de Aduana",
        ]);
    }
}
