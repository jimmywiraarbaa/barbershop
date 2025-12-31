<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Capster;
use App\Models\HairModel;
use App\Models\Price;
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
        $capsters = Capster::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        $bookings = Booking::query()
            ->with(['capster:id,name', 'modelRambut:id,title', 'price:id,name,price'])
            ->latest()
            ->get()
            ->map(fn (Booking $booking) => [
                'id' => $booking->id,
                'capsterId' => $booking->capster_id,
                'capsterName' => $booking->capster?->name,
                'modelRambutId' => $booking->model_rambut_id,
                'modelRambutTitle' => $booking->modelRambut?->title,
                'priceId' => $booking->price_id,
                'priceName' => $booking->price?->name,
                'priceAmount' => $booking->price?->price,
                'name' => $booking->name,
                'email' => $booking->email,
                'whatsapp' => $booking->whatsapp,
                'notes' => $booking->notes,
                'createdAt' => $booking->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('bookings/index', [
            'bookings' => $bookings,
            'capsters' => $capsters,
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(): Response
    {
        $capsters = Capster::query()
            ->with('workHour')
            ->orderBy('name')
            ->get(['id', 'name', 'image', 'work_hour_id'])
            ->map(fn (Capster $capster) => [
                'id' => $capster->id,
                'name' => $capster->name,
                'imageUrl' => $capster->image
                    ? '/storage/'.$capster->image
                    : null,
                'workHourName' => $capster->workHour?->name,
                'workHourDayStart' => $capster->workHour?->day_start,
                'workHourDayEnd' => $capster->workHour?->day_end,
                'workHourTimeStart' => $capster->workHour?->time_start,
                'workHourTimeEnd' => $capster->workHour?->time_end,
            ]);

        $hairModels = HairModel::query()
            ->orderBy('title')
            ->get(['id', 'title', 'image'])
            ->map(fn (HairModel $hairModel) => [
                'id' => $hairModel->id,
                'title' => $hairModel->title,
                'imageUrl' => $hairModel->image
                    ? '/storage/'.$hairModel->image
                    : null,
            ]);

        $prices = Price::query()
            ->orderBy('name')
            ->get(['id', 'name', 'price'])
            ->map(fn (Price $price) => [
                'id' => $price->id,
                'name' => $price->name,
                'price' => $price->price,
            ]);

        return Inertia::render('bookings/create', [
            'capsters' => $capsters,
            'hairModels' => $hairModels,
            'prices' => $prices,
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $requireCustomerFields = ! $request->user();

        $data = $request->validate([
            'capster_id' => ['required', 'integer', 'exists:capsters,id'],
            'model_rambut_id' => ['nullable', 'integer', 'exists:hair_models,id'],
            'price_id' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'integer',
                'exists:prices,id',
            ],
            'name' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'max:255',
            ],
            'email' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'email',
                'max:255',
            ],
            'whatsapp' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'max:30',
                'regex:/^\d+$/',
            ],
            'notes' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
            ],
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
            ->with('workHour')
            ->orderBy('name')
            ->get(['id', 'name', 'image', 'work_hour_id'])
            ->map(fn (Capster $capster) => [
                'id' => $capster->id,
                'name' => $capster->name,
                'imageUrl' => $capster->image
                    ? '/storage/'.$capster->image
                    : null,
                'workHourName' => $capster->workHour?->name,
                'workHourDayStart' => $capster->workHour?->day_start,
                'workHourDayEnd' => $capster->workHour?->day_end,
                'workHourTimeStart' => $capster->workHour?->time_start,
                'workHourTimeEnd' => $capster->workHour?->time_end,
            ]);

        $hairModels = HairModel::query()
            ->orderBy('title')
            ->get(['id', 'title', 'image'])
            ->map(fn (HairModel $hairModel) => [
                'id' => $hairModel->id,
                'title' => $hairModel->title,
                'imageUrl' => $hairModel->image
                    ? '/storage/'.$hairModel->image
                    : null,
            ]);

        $prices = Price::query()
            ->orderBy('name')
            ->get(['id', 'name', 'price'])
            ->map(fn (Price $price) => [
                'id' => $price->id,
                'name' => $price->name,
                'price' => $price->price,
            ]);

        return Inertia::render('bookings/edit', [
            'capsters' => $capsters,
            'hairModels' => $hairModels,
            'prices' => $prices,
            'booking' => [
                'id' => $booking->id,
                'capsterId' => $booking->capster_id,
                'modelRambutId' => $booking->model_rambut_id,
                'priceId' => $booking->price_id,
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
        $requireCustomerFields = ! $request->user();

        $data = $request->validate([
            'capster_id' => ['required', 'integer', 'exists:capsters,id'],
            'model_rambut_id' => ['nullable', 'integer', 'exists:hair_models,id'],
            'price_id' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'integer',
                'exists:prices,id',
            ],
            'name' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'max:255',
            ],
            'email' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'email',
                'max:255',
            ],
            'whatsapp' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
                'max:30',
                'regex:/^\d+$/',
            ],
            'notes' => [
                $requireCustomerFields ? 'required' : 'nullable',
                'string',
            ],
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
