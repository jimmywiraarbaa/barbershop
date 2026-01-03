<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Capster;
use App\Models\HairModel;
use App\Models\Price;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class PublicBookingController extends Controller
{
    private const CAPTCHA_ANSWER_KEY = 'public_booking_captcha_answer';
    private const GENERIC_ERROR = 'Tidak dapat memproses booking. Silakan coba lagi.';
    private const GENERIC_INVALID = 'Data tidak valid. Silakan cek kembali.';
    private const RATE_LIMIT_MAX = 5;
    private const RATE_LIMIT_DECAY = 60;

    /**
     * Show the public booking form (no auth).
     */
    public function create(Request $request): Response
    {
        $captchaQuestion = $this->refreshCaptcha($request);

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

        return Inertia::render('public-booking', [
            'capsters' => $capsters,
            'hairModels' => $hairModels,
            'prices' => $prices,
            'captchaQuestion' => $captchaQuestion,
            'flash' => [
                'success' => $request->session()->get('publicBookingSuccess'),
            ],
        ]);
    }

    /**
     * Store a public booking with strict validation and abuse protection.
     */
    public function store(Request $request): RedirectResponse
    {
        // Enforce HTTPS in production to prevent downgrade or mixed-content issues.
        if (app()->environment('production') && ! $request->secure()) {
            $this->logAttempt($request, 'blocked_insecure');
            return $this->reject($request);
        }

        // Rate limit by IP: max 5 submissions per minute.
        if ($this->isRateLimited($request)) {
            $this->logAttempt($request, 'rate_limited');
            return $this->reject($request);
        }

        // Honeypot field must stay empty; bots usually fill hidden inputs.
        if ($request->filled('website')) {
            $this->logAttempt($request, 'honeypot');
            return $this->reject($request);
        }

        // Sanitize inputs to reduce XSS risk before validation or storage.
        $data = $this->sanitize($request->all());

        $validator = Validator::make($data, [
            'capster_id' => ['required', 'integer', 'exists:capsters,id'],
            'model_rambut_id' => ['nullable', 'integer', 'exists:hair_models,id'],
            'price_id' => ['required', 'integer', 'exists:prices,id'],
            'booking_date' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:30', 'regex:/^\d+$/'],
            'notes' => ['required', 'string', 'max:1000'],
            'captcha_answer' => ['required', 'string', 'max:10', 'regex:/^\d+$/'],
        ]);

        if ($validator->fails()) {
            $this->logAttempt($request, 'invalid');
            return $this->reject(
                $request,
                self::GENERIC_INVALID,
                Arr::except($data, ['captcha_answer', 'website']),
            );
        }

        // Simple CAPTCHA: one-time answer stored in session.
        $expectedCaptcha = (string) $request->session()->pull(self::CAPTCHA_ANSWER_KEY, '');
        if (! hash_equals($expectedCaptcha, (string) ($data['captcha_answer'] ?? ''))) {
            $this->logAttempt($request, 'captcha_failed');
            return $this->reject($request);
        }

        $payload = [
            'capster_id' => (int) $data['capster_id'],
            'model_rambut_id' => $data['model_rambut_id']
                ? (int) $data['model_rambut_id']
                : null,
            'price_id' => (int) $data['price_id'],
            'booking_date' => $data['booking_date'],
            'name' => $data['name'],
            'email' => $data['email'],
            'whatsapp' => $data['whatsapp'],
            'notes' => $data['notes'],
            // Public submissions stay pending.
            'status' => 'waiting',
        ];

        // Prevent duplicates: same contact + capster + price + model within 30 minutes.
        $duplicate = Booking::query()
            ->where('capster_id', $payload['capster_id'])
            ->where('price_id', $payload['price_id'])
            ->when(
                $payload['model_rambut_id'],
                fn ($query, $modelId) => $query->where('model_rambut_id', $modelId),
                fn ($query) => $query->whereNull('model_rambut_id'),
            )
            ->whereDate('booking_date', $payload['booking_date'])
            ->where('whatsapp', $payload['whatsapp'])
            ->where('email', $payload['email'])
            ->where('created_at', '>=', now()->subMinutes(30))
            ->exists();

        if ($duplicate) {
            $this->logAttempt($request, 'duplicate');
            return $this->reject($request);
        }

        $booking = Booking::create($payload);

        $this->logAttempt($request, 'created', [
            'booking_id' => $booking->id,
        ]);

        return to_route('public-booking.create')
            ->with('publicBookingSuccess', 'Booking diterima. Kami akan konfirmasi segera.');
    }

    private function refreshCaptcha(Request $request): string
    {
        $first = random_int(2, 9);
        $second = random_int(1, 9);
        $question = "{$first} + {$second}";

        $request->session()->put(self::CAPTCHA_ANSWER_KEY, (string) ($first + $second));

        return $question;
    }

    private function sanitize(array $input): array
    {
        $name = trim(strip_tags((string) ($input['name'] ?? '')));
        $email = trim(strip_tags((string) ($input['email'] ?? '')));
        $notes = trim(strip_tags((string) ($input['notes'] ?? '')));
        $whatsapp = preg_replace('/\D+/', '', (string) ($input['whatsapp'] ?? ''));

        return [
            'capster_id' => $input['capster_id'] ?? null,
            'model_rambut_id' => $input['model_rambut_id'] ?? null,
            'price_id' => $input['price_id'] ?? null,
            'booking_date' => $input['booking_date'] ?? null,
            'name' => $name,
            'email' => $email,
            'whatsapp' => $whatsapp,
            'notes' => $notes,
            'captcha_answer' => trim((string) ($input['captcha_answer'] ?? '')),
            'website' => trim((string) ($input['website'] ?? '')),
        ];
    }

    private function isRateLimited(Request $request): bool
    {
        $key = $this->rateLimitKey($request);

        if (RateLimiter::tooManyAttempts($key, self::RATE_LIMIT_MAX)) {
            return true;
        }

        RateLimiter::hit($key, self::RATE_LIMIT_DECAY);
        return false;
    }

    private function rateLimitKey(Request $request): string
    {
        return 'public-booking:'.$request->ip();
    }

    private function reject(
        Request $request,
        string $message = self::GENERIC_ERROR,
        array $input = [],
    ): RedirectResponse {
        $fallback = $this->sanitize($request->all());
        $old = $input ?: $fallback;
        $old = Arr::except($old, ['captcha_answer', 'website']);

        return back()
            ->withErrors(['form' => $message])
            ->withInput($old);
    }

    private function logAttempt(Request $request, string $status, array $extra = []): void
    {
        // Log IP + User-Agent for every submission attempt.
        Log::info('public_booking_submission', [
            'status' => $status,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            ...$extra,
        ]);
    }
}
