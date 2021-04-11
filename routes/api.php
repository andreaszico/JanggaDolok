<?php

use App\Http\Controllers\API\Admin\AdminController;
use App\Http\Controllers\API\Admin\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\User\UserController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        
        //ArticleCard API
        Route::get('getarticlehome', [ArticleController::class, 'getArticleHome']);
        
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/test', [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
        
        //ArticleSingle API
        Route::get('article', [ArticleController::class, 'index']);
        Route::get('/article/{slug}', [ArticleController::class, 'getArticle']);
        
        //Comment API
        Route::post('/comment', [ArticleController::class, 'comment']);

        Route::group(['middleware' => ['web']], function () {
            Route::get('login/provider', [AuthController::class, 'redirectToProviderAll']);
            //Google Login
            Route::get('login/google', [AuthController::class, 'redirectToGoogle']);
            Route::get('login/google/callback', [AuthController::class, 'handleGoogleCallback']);
            //Facebook Login
            Route::get('login/facebook', [AuthController::class, 'redirectToFacebook']);
            Route::get('login/facebook/callback', [AuthController::class, 'handleFacebookCallback']);
        });
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('user', [AuthController::class, 'user']);
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:user'], function () {
            // authenticated user routes here 
            Route::get('getarticlehome', [ArticleController::class, 'getarticlehome']);
        });
    });
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['middleware' => ['auth:admin', 'scopes:admin']], function () {
            // authenticated admin routes here 
            Route::post('/searcharticle', [ArticleController::class, 'search']);
            Route::get('/getAllComment', [AdminController::class, 'getAllUsers']);
            Route::get('/getdataweb', [AdminController::class, 'getDataWeb']);
            Route::post('/deleteUsers/{id}', [AdminController::class, 'destroy']);
            Route::post('/getMonthlyPostData', [AdminController::class, 'getMonthlyPostData']);

            // article routes api   
            Route::post('dashboard', [AdminController::class, 'index']);
            Route::get('article', [ArticleController::class, 'index']);
            Route::post('/article/store', [ArticleController::class, 'store']);
            Route::get('/article/{id}', [ArticleController::class, 'getArticle']);
            Route::post('/article/{slug}', [ArticleController::class, 'update']);
            Route::post('/article/delete/{id}', [ArticleController::class, 'delete']);

        });
    });
});
