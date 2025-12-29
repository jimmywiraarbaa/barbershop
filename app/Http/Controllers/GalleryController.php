<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of galleries.
     */
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->orderByRaw('`order` is null')
            ->orderBy('order')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'description' => $gallery->description,
                'order' => $gallery->order,
                'isActive' => (bool) $gallery->is_active,
                'imageUrl' => $gallery->image
                    ? '/storage/'.$gallery->image
                    : null,
            ]);

        return Inertia::render('gallery/index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Show the form for creating a new gallery item.
     */
    public function create(): Response
    {
        return Inertia::render('gallery/create');
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('galleries', 'public');
        }

        Gallery::create($data);

        return to_route('galleries.index');
    }

    /**
     * Show the form for editing the specified gallery item.
     */
    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('gallery/edit', [
            'gallery' => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'description' => $gallery->description,
                'order' => $gallery->order,
                'isActive' => (bool) $gallery->is_active,
                'imageUrl' => $gallery->image
                    ? '/storage/'.$gallery->image
                    : null,
            ],
        ]);
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }

            $data['image'] = $request->file('image')->store('galleries', 'public');
        } else {
            unset($data['image']);
        }

        $gallery->update($data);

        return to_route('galleries.index');
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return to_route('galleries.index');
    }
}
