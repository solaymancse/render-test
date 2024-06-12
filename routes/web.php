<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('users');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notification');
    Route::get('/markAsRead/{id}', [NotificationController::class, 'markAsRead'])->name('markAsRead');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
    Route::get('/trashCategories', [CategoryController::class, 'trashIndex'])->name('trashCategories');
    Route::get('/addCategory', [CategoryController::class, 'create'])->name('addCategory');
    Route::post('/storeCategory', [CategoryController::class, 'store'])->name('storeCategory');
    Route::get('/editCategory/{id}', [CategoryController::class, 'edit'])->name('editCategory');
    Route::put('/updateCategory/{id}', [CategoryController::class, 'update'])->name('updateCategory');
    Route::put('/softDelete/{id}', [CategoryController::class, 'softDelete'])->name('softDelete');
    Route::delete('/deleteCategory/{id}', [CategoryController::class, 'destroy'])->name('deleteCategory');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
