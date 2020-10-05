<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PrototypeLumen extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function ShowIndex()
    {
        return view('index');
    }

    public function multiply($number){
        $multiple = $number * $number;
        $obj = (object) array('number' => $multiple);
        return json_encode($obj);

    }

    public function save(){
        Storage::put('mytextdocument.txt','Emre Kursun');
        return view('saved');

    }
}
