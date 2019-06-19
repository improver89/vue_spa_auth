<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {

    Route::post('login', 'AuthController@login');


    Route::group(['middleware' => 'auth:api'], function(){

        Route::get('refresh_token', 'AuthController@refreshToken');
        Route::get('check_token', 'AuthController@checkToken');
        Route::post('add_contacts', 'AuthController@add_contacts');
        Route::post('validate_code', 'AuthController@validate_code');
//    });
//
//    Route::group(['middleware' => ['auth:api', 'isValidated']], function(){
        Route::get('logout', 'AuthController@logout');
    });
});

Route::prefix('users')->group(function () {
    Route::group(['middleware' => ['auth:api', 'isValidated']], function() {
        Route::get('', 'UsersController@getAll')->middleware('isRoot');
        Route::get('{login}', 'UsersController@get')->middleware('isRoot');
        Route::post('add', 'UsersController@add')->middleware('isRoot');
        Route::put('update', 'UsersController@update')->middleware('isRoot');
        Route::delete('delete/{login}', 'UsersController@delete')->middleware('isRoot');
        Route::get('generate_new_pass/{login}', 'UsersController@generateNewPass')->middleware('isRootOrSelf');
    });
});

//
//Route::group(['middleware' => ['auth:api', 'isValidated']], function(){
//    // Users
//    Route::get('users', 'UsersController@index')->middleware('isAdmin');
//    Route::get('users/{id}', 'UsersController@show')->middleware('isAdminOrSelf');
//});

 //Route::get('users', 'UsersController@index');
