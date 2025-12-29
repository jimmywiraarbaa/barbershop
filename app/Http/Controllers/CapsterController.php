<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class CapsterController extends Controller
{
    /**
     * Display a listing of capsters.
     */
    public function index(): Response
    {
        $capsters = Capster::query()
            ->latest()
            ->get()
            ->map(fn (Capster $capster) => [
                'id' => $capster->id,
                'name' => $capster->name,
                'whatsapp' => $capster->whatsapp,
                'userId' => $capster->user_id,
                'imageUrl' => $capster->image
                    ? '/storage/'.$capster->image
                    : null,
            ]);

        return Inertia::render('capsters/index', [
            'capsters' => $capsters,
        ]);
    }

    /**
     * Show the form for creating a new capster.
     */
    public function create(): Response
    {
        return Inertia::render('capsters/create');
    }

    /**
     * Store a newly created capster.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:30', 'regex:/^\d+$/'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('capsters', 'public');
        }

        if ($request->boolean('add_user')) {
            $userData = $request->validate([
                'user_email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
                'user_password' => ['required', 'string', Password::default(), 'confirmed'],
            ]);

            $user = User::create([
                'name' => $data['name'],
                'email' => $userData['user_email'],
                'password' => $userData['user_password'],
                'image' => $data['image'] ?? null,
            ]);

            $data['user_id'] = $user->id;
        }

        Capster::create($data);

        return to_route('capsters.index');
    }

    /**
     * Show the form for editing the specified capster.
     */
    public function edit(Capster $capster): Response
    {
        return Inertia::render('capsters/edit', [
            'capster' => [
                'id' => $capster->id,
                'name' => $capster->name,
                'whatsapp' => $capster->whatsapp,
                'userId' => $capster->user_id,
                'imageUrl' => $capster->image
                    ? '/storage/'.$capster->image
                    : null,
            ],
        ]);
    }

    /**
     * Update the specified capster.
     */
    public function update(Request $request, Capster $capster): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:30', 'regex:/^\d+$/'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($capster->image) {
                Storage::disk('public')->delete($capster->image);
            }

            $data['image'] = $request->file('image')->store('capsters', 'public');
        } else {
            unset($data['image']);
        }

        if ($request->boolean('add_user')) {
            $emailRule = Rule::unique('users', 'email');
            if ($capster->user_id) {
                $emailRule = $emailRule->ignore($capster->user_id);
            }

            $userData = $request->validate([
                'user_email' => ['required', 'string', 'email', 'max:255', $emailRule],
                'user_password' => ['required', 'string', Password::default(), 'confirmed'],
            ]);

            $user = $capster->user_id
                ? User::find($capster->user_id)
                : null;

            if ($user) {
                $user->forceFill([
                    'name' => $data['name'],
                    'email' => $userData['user_email'],
                    'password' => $userData['user_password'],
                    'image' => $data['image'] ?? $user->image,
                ])->save();
            } else {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $userData['user_email'],
                    'password' => $userData['user_password'],
                    'image' => $data['image'] ?? null,
                ]);
            }

            $data['user_id'] = $user->id;
        } elseif ($capster->user_id && array_key_exists('image', $data)) {
            User::whereKey($capster->user_id)->update([
                'image' => $data['image'],
            ]);
        }

        $capster->update($data);

        return to_route('capsters.index');
    }

    /**
     * Remove the specified capster.
     */
    public function destroy(Capster $capster): RedirectResponse
    {
        $capster->delete();

        return to_route('capsters.index');
    }
}
