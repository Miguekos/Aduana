<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});


Auth::routes();
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('/get/{id}', 'HomeController@get')->name('get');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/hola', 'HomeController@hola')->name('hola');
Route::get('/reporte', 'HomeController@reporte')->name('reporte');
Route::get('/asistencia', 'AsistenciaController@index')->name('asistencia');
Route::get('/addassistance/{id}', 'AsistenciaController@addassistance')->name('addassistance');


Route::post('/updatenotas/{nota}/{alumno}', 'NotaController@updatenotas')->name('updatenotas');

//Membresias
//Route::get('/membresia', 'MembresiaController@index')->name('membresia.index');
Route::resource ('alumno', 'AlumnoController');
Route::resource ('materia', 'MateriaController');
Route::resource ('teacher', 'TeacherController');
Route::resource ('control', 'ControlController');
Route::get('/prueba', 'ControlController@prueba')->name('prueba');
Route::get('/redirect', 'ControlController@redirect')->name('redirect');
Route::resource ('nota', 'NotaController');
Route::get('/addnotas/{id}/{control}', 'ControlController@addNotas')->name('addnotas');
Route::get('/pronotas/{id}/{control}', 'ControlController@proNotas')->name('pronotas');
//Route::resource ('membresia', 'MembresiaController');
