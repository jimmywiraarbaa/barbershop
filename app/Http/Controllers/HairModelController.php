<?php

namespace App\Http\Controllers;

use App\Models\HairModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HairModelController extends Controller
{
    /**
     * Display a listing of hair models.
     */
    public function index(): Response
    {
        $hairModels = HairModel::query()
            ->latest()
            ->get()
            ->map(fn (HairModel $hairModel) => [
                'id' => $hairModel->id,
                'title' => $hairModel->title,
                'description' => $hairModel->description,
                'imageUrl' => $hairModel->image
                    ? '/storage/'.$hairModel->image
                    : null,
            ]);

        return Inertia::render('hair-models/index', [
            'hairModels' => $hairModels,
        ]);
    }

    /**
     * Show the form for creating a new hair model.
     */
    public function create(): Response
    {
        return Inertia::render('hair-models/create');
    }

    /**
     * Store a newly created hair model.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('hair-models', 'public');
        }

        HairModel::create($data);

        return to_route('hair-models.index')
            ->with('success', 'Model rambut berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified hair model.
     */
    public function edit(HairModel $hairModel): Response
    {
        return Inertia::render('hair-models/edit', [
            'hairModel' => [
                'id' => $hairModel->id,
                'title' => $hairModel->title,
                'description' => $hairModel->description,
                'imageUrl' => $hairModel->image
                    ? '/storage/'.$hairModel->image
                    : null,
            ],
        ]);
    }

    /**
     * Update the specified hair model.
     */
    public function update(Request $request, HairModel $hairModel): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($hairModel->image) {
                Storage::disk('public')->delete($hairModel->image);
            }

            $data['image'] = $request->file('image')->store('hair-models', 'public');
        } else {
            unset($data['image']);
        }

        $hairModel->update($data);

        return to_route('hair-models.index')
            ->with('success', 'Model rambut berhasil diperbarui.');
    }

    /**
     * Remove the specified hair model.
     */
    public function destroy(HairModel $hairModel): RedirectResponse
    {
        $hairModel->delete();

        return to_route('hair-models.index')
            ->with('success', 'Model rambut berhasil dihapus.');
    }
}
