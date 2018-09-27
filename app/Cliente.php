<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $guarded = array();

    public function promo_id($id){
        $promo = Promo::findOrFail($id);
        return $promo->nombre_pro;
    }
}
