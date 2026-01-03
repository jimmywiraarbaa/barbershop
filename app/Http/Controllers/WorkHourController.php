<?php

namespace App\Http\Controllers;

use App\Models\WorkHour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WorkHourController extends Controller
{
    /**
     * Display a listing of work hours.
     */
    public function index(): Response
    {
        $workHours = WorkHour::query()
            ->latest()
            ->get()
            ->map(fn (WorkHour $workHour) => [
                'id' => $workHour->id,
                'name' => $workHour->name,
                'dayStart' => $workHour->day_start,
                'dayEnd' => $workHour->day_end,
                'timeStart' => $workHour->time_start,
                'timeEnd' => $workHour->time_end,
            ]);

        return Inertia::render('work-hours/index', [
            'workHours' => $workHours,
        ]);
    }

    /**
     * Show the form for creating a new work hour.
     */
    public function create(): Response
    {
        return Inertia::render('work-hours/create');
    }

    /**
     * Store a newly created work hour.
     */
    public function store(Request $request): RedirectResponse
    {
        $dayOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'day_start' => ['required', 'string', 'max:255', Rule::in($dayOptions)],
            'day_end' => ['required', 'string', 'max:255', Rule::in($dayOptions)],
            'time_start' => ['required', 'string', 'max:255'],
            'time_end' => ['required', 'string', 'max:255'],
        ]);

        WorkHour::create($data);

        return to_route('work-hours.index')
            ->with('success', 'Jam kerja berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified work hour.
     */
    public function edit(WorkHour $workHour): Response
    {
        return Inertia::render('work-hours/edit', [
            'workHour' => [
                'id' => $workHour->id,
                'name' => $workHour->name,
                'dayStart' => $workHour->day_start,
                'dayEnd' => $workHour->day_end,
                'timeStart' => $workHour->time_start,
                'timeEnd' => $workHour->time_end,
            ],
        ]);
    }

    /**
     * Update the specified work hour.
     */
    public function update(Request $request, WorkHour $workHour): RedirectResponse
    {
        $dayOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'day_start' => ['required', 'string', 'max:255', Rule::in($dayOptions)],
            'day_end' => ['required', 'string', 'max:255', Rule::in($dayOptions)],
            'time_start' => ['required', 'string', 'max:255'],
            'time_end' => ['required', 'string', 'max:255'],
        ]);

        $workHour->update($data);

        return to_route('work-hours.index')
            ->with('success', 'Jam kerja berhasil diperbarui.');
    }

    /**
     * Remove the specified work hour.
     */
    public function destroy(WorkHour $workHour): RedirectResponse
    {
        $workHour->delete();

        return to_route('work-hours.index')
            ->with('success', 'Jam kerja berhasil dihapus.');
    }
}
