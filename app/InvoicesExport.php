<?php

namespace App;

use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{

    public function collection()
    {
        return Alumno::all();
    }
}