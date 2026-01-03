<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display a listing of prices.
     */
    public function index(): Response
    {
        $prices = Price::query()
            ->latest()
            ->get()
            ->map(fn (Price $price) => [
                'id' => $price->id,
                'name' => $price->name,
                'price' => $price->price,
                'description' => $price->description,
            ]);

        return Inertia::render('prices/index', [
            'prices' => $prices,
        ]);
    }

    /**
     * Show the form for creating a new price.
     */
    public function create(): Response
    {
        return Inertia::render('prices/create');
    }

    /**
     * Store a newly created price.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        Price::create($data);

        return to_route('prices.index')
            ->with('success', 'Harga berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified price.
     */
    public function edit(Price $price): Response
    {
        return Inertia::render('prices/edit', [
            'price' => [
                'id' => $price->id,
                'name' => $price->name,
                'price' => $price->price,
                'description' => $price->description,
            ],
        ]);
    }

    /**
     * Update the specified price.
     */
    public function update(Request $request, Price $price): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $price->update($data);

        return to_route('prices.index')
            ->with('success', 'Harga berhasil diperbarui.');
    }

    /**
     * Remove the specified price.
     */
    public function destroy(Price $price): RedirectResponse
    {
        $price->delete();

        return to_route('prices.index')
            ->with('success', 'Harga berhasil dihapus.');
    }
}
