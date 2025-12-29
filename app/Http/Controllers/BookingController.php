<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Capster;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings.
     */
    public function index(): Response
    {
        $bookings = Booking::query()
            ->with('capster:id,name')
            ->latest()
            ->get()
            ->map(fn (Booking $booking) => [
                'id' => $booking->id,
                'capsterName' => $booking->capster?->name,
                'name' => $booking->name,
                'email' => $booking->email,
                'whatsapp' => $booking->whatsapp,
                'notes' => $booking->notes,
                'createdAt' => $booking->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(): Response
    {
        $capsters = Capster::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('bookings/create', [
            'capsters' => $capsters,
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'capster_id' => ['required', 'integer', 'exists:capsters,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:30', 'regex:/^\d+$/'],
            'notes' => ['nullable', 'string'],
        ]);

        Booking::create($data);

        return to_route('bookings.index');
    }

    /**
     * Show the form for editing the specified booking.
     */
    public function edit(Booking $booking): Response
    {
        $capsters = Capster::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('bookings/edit', [
            'capsters' => $capsters,
            'booking' => [
                'id' => $booking->id,
                'capsterId' => $booking->capster_id,
                'name' => $booking->name,
                'email' => $booking->email,
                'whatsapp' => $booking->whatsapp,
                'notes' => $booking->notes,
            ],
        ]);
    }

    /**
     * Update the specified booking.
     */
    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $data = $request->validate([
            'capster_id' => ['required', 'integer', 'exists:capsters,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:30', 'regex:/^\d+$/'],
            'notes' => ['nullable', 'string'],
        ]);

        $booking->update($data);

        return to_route('bookings.index');
    }

    /**
     * Remove the specified booking.
     */
    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();

        return to_route('bookings.index');
    }
}
