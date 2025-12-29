<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CapsterController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HairModelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('capster', [CapsterController::class, 'index'])
        ->name('capsters.index');
    Route::get('capster/create', [CapsterController::class, 'create'])
        ->name('capsters.create');
    Route::post('capster', [CapsterController::class, 'store'])
        ->name('capsters.store');
    Route::get('capster/{capster}/edit', [CapsterController::class, 'edit'])
        ->name('capsters.edit');
    Route::put('capster/{capster}', [CapsterController::class, 'update'])
        ->name('capsters.update');
    Route::delete('capster/{capster}', [CapsterController::class, 'destroy'])
        ->name('capsters.destroy');

    Route::get('booking', [BookingController::class, 'index'])
        ->name('bookings.index');
    Route::get('booking/create', [BookingController::class, 'create'])
        ->name('bookings.create');
    Route::post('booking', [BookingController::class, 'store'])
        ->name('bookings.store');
    Route::get('booking/{booking}/edit', [BookingController::class, 'edit'])
        ->name('bookings.edit');
    Route::put('booking/{booking}', [BookingController::class, 'update'])
        ->name('bookings.update');
    Route::delete('booking/{booking}', [BookingController::class, 'destroy'])
        ->name('bookings.destroy');

    Route::get('gallery', [GalleryController::class, 'index'])
        ->name('galleries.index');
    Route::get('gallery/create', [GalleryController::class, 'create'])
        ->name('galleries.create');
    Route::post('gallery', [GalleryController::class, 'store'])
        ->name('galleries.store');
    Route::get('gallery/{gallery}/edit', [GalleryController::class, 'edit'])
        ->name('galleries.edit');
    Route::put('gallery/{gallery}', [GalleryController::class, 'update'])
        ->name('galleries.update');
    Route::delete('gallery/{gallery}', [GalleryController::class, 'destroy'])
        ->name('galleries.destroy');

    Route::get('model-rambut', [HairModelController::class, 'index'])
        ->name('hair-models.index');
    Route::get('model-rambut/create', [HairModelController::class, 'create'])
        ->name('hair-models.create');
    Route::post('model-rambut', [HairModelController::class, 'store'])
        ->name('hair-models.store');
    Route::get('model-rambut/{hairModel}/edit', [HairModelController::class, 'edit'])
        ->name('hair-models.edit');
    Route::put('model-rambut/{hairModel}', [HairModelController::class, 'update'])
        ->name('hair-models.update');
    Route::delete('model-rambut/{hairModel}', [HairModelController::class, 'destroy'])
        ->name('hair-models.destroy');
});

require __DIR__.'/settings.php';
