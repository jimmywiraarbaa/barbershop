const dayOrder = [
    'minggu',
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jumat',
    'sabtu',
];

const normalizeDay = (value?: string | null) => {
    if (!value) {
        return null;
    }

    const normalized = value.toLowerCase().replace(/[^a-z]/g, '');
    if (normalized === 'jumaat') {
        return 'jumat';
    }

    return normalized;
};

const dayToIndex = (value?: string | null) => {
    const normalized = normalizeDay(value);
    if (!normalized) {
        return null;
    }

    const index = dayOrder.indexOf(normalized);
    return index === -1 ? null : index;
};

const getJakartaDayIndex = (date: Date) => {
    const dayName = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        timeZone: 'Asia/Jakarta',
    }).format(date);

    const index = dayToIndex(dayName);
    return index ?? date.getUTCDay();
};

const getJakartaNowMinutes = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(new Date());

    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
    const minute = Number(
        parts.find((part) => part.type === 'minute')?.value ?? 0,
    );

    return hour * 60 + minute;
};

const timeToMinutes = (value?: string | null) => {
    if (!value) {
        return null;
    }

    const [hourRaw, minuteRaw] = value.split(':');
    const hour = Number(hourRaw);
    const minute = Number(minuteRaw);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return null;
    }

    return hour * 60 + minute;
};

const getTodayJakarta = () =>
    new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

export type ShiftInfo = {
    workHourDayStart?: string | null;
    workHourDayEnd?: string | null;
    workHourTimeStart?: string | null;
    workHourTimeEnd?: string | null;
};

export const isShiftAvailable = (shift: ShiftInfo, bookingDate?: string) => {
    const startDay = dayToIndex(shift.workHourDayStart);
    const endDay = dayToIndex(shift.workHourDayEnd);
    const startTime = timeToMinutes(shift.workHourTimeStart);
    const endTime = timeToMinutes(shift.workHourTimeEnd);

    if (startDay === null || endDay === null || startTime === null || endTime === null) {
        return false;
    }

    const dateValue = bookingDate || getTodayJakarta();
    const date = new Date(`${dateValue}T00:00:00+07:00`);
    const dayIndex = getJakartaDayIndex(date);

    const inDayRange =
        startDay <= endDay
            ? dayIndex >= startDay && dayIndex <= endDay
            : dayIndex >= startDay || dayIndex <= endDay;

    if (!inDayRange) {
        return false;
    }

    // For future dates, only validate day range since no time is chosen yet.
    if (bookingDate && bookingDate !== getTodayJakarta()) {
        return true;
    }

    const nowMinutes = getJakartaNowMinutes();

    if (startTime <= endTime) {
        return nowMinutes >= startTime && nowMinutes <= endTime;
    }

    return nowMinutes >= startTime || nowMinutes <= endTime;
};
