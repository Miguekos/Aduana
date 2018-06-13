<?php

namespace App\Http\Controllers;

use App\InvoicesExport;
use Maatwebsite\Excel\Facades\Excel;


class ExcelController extends Controller
{

    public function exportUsers(){
        return Excel::download(new InvoicesExport, 'invoices.xlsx');
    }
}