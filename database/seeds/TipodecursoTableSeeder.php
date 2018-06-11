<?php

use Illuminate\Database\Seeder;
use App\Tipodecurso;
class TipodecursoTableSeeder extends Seeder
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
                $nombre = "Auxiliar de Despacho Aduanero (curso)";
            }elseif ($i == 1){
                $nombre = "Sectorista Aduanero (curso)";
            }elseif ($i == 2){
                $nombre = "Liquidador Aduanero (curso)";
            }elseif ($i == 3){
                $nombre = "Gestor Aduanero(carrera)";
            }elseif ($i == 4){
                $nombre = "Diplomado de Com. Intern. y Aduana";
            }elseif ($i == 5){
                $nombre = "Otros";
            }
            $tipodecurso = Tipodecurso::create ([
                'nombre' => $nombre,
            ]);
        }
    }
}
