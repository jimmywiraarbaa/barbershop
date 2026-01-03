import { DatePickerInput } from '@/components/date-picker-input';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, type FormEvent } from 'react';

type CapsterOption = {
    id: number;
    name: string;
    imageUrl: string | null;
    workHourName?: string | null;
    workHourDayStart?: string | null;
    workHourDayEnd?: string | null;
    workHourTimeStart?: string | null;
    workHourTimeEnd?: string | null;
};

type HairModelOption = {
    id: number;
    title: string;
    imageUrl: string | null;
};

type PriceOption = {
    id: number;
    name: string;
    price: number;
};

type PageProps = {
    capsters: CapsterOption[];
    hairModels: HairModelOption[];
    prices: PriceOption[];
    captchaQuestion: string;
    flash?: {
        success?: string | null;
    };
};

const getInitials = (value: string) =>
    value
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

const formatShift = (capster: CapsterOption) => {
    const dayRange = [capster.workHourDayStart, capster.workHourDayEnd]
        .filter(Boolean)
        .join(' - ');
    const timeRange = [capster.workHourTimeStart, capster.workHourTimeEnd]
        .filter(Boolean)
        .join(' - ');
    const range = [dayRange, timeRange].filter(Boolean).join(' | ');
    const labelParts = [capster.workHourName, range].filter(Boolean);

    return labelParts.length ? labelParts.join(' · ') : 'Shift belum diatur';
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

export default function PublicBooking() {
    const { capsters, hairModels, prices, captchaQuestion, flash } =
        usePage<PageProps>().props;
    const today = useMemo(() => {
        const value = new Date();
        value.setHours(0, 0, 0, 0);
        return value;
    }, []);
    const form = useForm({
        capster_id: '',
        model_rambut_id: '',
        price_id: '',
        booking_date: '',
        name: '',
        email: '',
        whatsapp: '',
        notes: '',
        captcha_answer: '',
        website: '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/booking-barber', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <>
            <Head title="Booking" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                Public Booking
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold">
                                Book slot, no login
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                Isi data singkat, kami konfirmasi via WhatsApp.
                            </p>
                        </div>
                        <Button variant="secondary" asChild>
                            <Link href="/">Kembali</Link>
                        </Button>
                    </div>

                    {flash?.success ? (
                        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                            <AlertTitle>Booking diterima</AlertTitle>
                            <AlertDescription>
                                {flash.success}
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    {form.errors.form ? (
                        <Alert variant="destructive">
                            <AlertTitle>Gagal memproses</AlertTitle>
                            <AlertDescription>
                                {form.errors.form}
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="booking_date">Tanggal</Label>
                            <DatePickerInput
                                id="booking_date"
                                value={form.data.booking_date}
                                onChange={(value) =>
                                    form.setData('booking_date', value)
                                }
                                ariaInvalid={!!form.errors.booking_date}
                                minDate={today}
                            />
                            <InputError message={form.errors.booking_date} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="capster_id">Capster</Label>
                            <Select
                                value={form.data.capster_id}
                                onValueChange={(value) =>
                                    form.setData('capster_id', value)
                                }
                            >
                                <SelectTrigger id="capster_id" className="h-12">
                                    <SelectValue placeholder="Pilih capster" />
                                </SelectTrigger>
                                <SelectContent>
                                    {capsters.length === 0 ? (
                                        <SelectItem value="-" disabled>
                                            Belum ada capster
                                        </SelectItem>
                                    ) : (
                                        capsters.map((capster) => (
                                            <SelectItem
                                                key={capster.id}
                                                value={String(capster.id)}
                                                textValue={capster.name}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 text-[10px] font-semibold text-muted-foreground">
                                                        {capster.imageUrl ? (
                                                            <img
                                                                src={capster.imageUrl}
                                                                alt={capster.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            getInitials(
                                                                capster.name,
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-sm font-medium">
                                                            {capster.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatShift(
                                                                capster,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.capster_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="model_rambut_id">
                                Model Rambut (opsional)
                            </Label>
                            <Select
                                value={form.data.model_rambut_id}
                                onValueChange={(value) =>
                                    form.setData(
                                        'model_rambut_id',
                                        value === 'none' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger
                                    id="model_rambut_id"
                                    className="h-12"
                                >
                                    <SelectValue placeholder="Pilih model rambut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none" textValue="Tanpa pilihan">
                                        Tanpa pilihan
                                    </SelectItem>
                                    {hairModels.length === 0 ? (
                                        <SelectItem value="-" disabled>
                                            Belum ada model rambut
                                        </SelectItem>
                                    ) : (
                                        hairModels.map((model) => (
                                            <SelectItem
                                                key={model.id}
                                                value={String(model.id)}
                                                textValue={model.title}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 text-[10px] font-semibold text-muted-foreground">
                                                        {model.imageUrl ? (
                                                            <img
                                                                src={model.imageUrl}
                                                                alt={model.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            getInitials(
                                                                model.title,
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {model.title}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.model_rambut_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price_id">Harga</Label>
                            <Select
                                value={form.data.price_id}
                                onValueChange={(value) =>
                                    form.setData(
                                        'price_id',
                                        value === 'none' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger id="price_id" className="h-12">
                                    <SelectValue placeholder="Pilih harga" />
                                </SelectTrigger>
                                <SelectContent>
                                    {prices.length === 0 ? (
                                        <SelectItem value="-" disabled>
                                            Belum ada harga
                                        </SelectItem>
                                    ) : (
                                        prices.map((price) => (
                                            <SelectItem
                                                key={price.id}
                                                value={String(price.id)}
                                                textValue={price.name}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-sm font-medium">
                                                        {price.name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatCurrency(
                                                            price.price,
                                                        )}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.price_id} />
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData(
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Nama kamu"
                                />
                                <InputError message={form.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                <Input
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={form.data.whatsapp}
                                    onChange={(event) =>
                                        form.setData(
                                            'whatsapp',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="62xxxxxxxxxx"
                                />
                                <InputError message={form.errors.whatsapp} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData('email', event.target.value)
                                }
                                placeholder="email@example.com"
                            />
                            <InputError message={form.errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Keterangan</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                value={form.data.notes}
                                onChange={(event) =>
                                    form.setData('notes', event.target.value)
                                }
                                placeholder="Contoh: jam 19.00, potong fade"
                                rows={4}
                            />
                            <InputError message={form.errors.notes} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="captcha_answer">
                                Anti-bot: {captchaQuestion} = ?
                            </Label>
                            <Input
                                id="captcha_answer"
                                name="captcha_answer"
                                inputMode="numeric"
                                value={form.data.captcha_answer}
                                onChange={(event) =>
                                    form.setData(
                                        'captcha_answer',
                                        event.target.value,
                                    )
                                }
                                placeholder="Jawaban angka"
                            />
                            <InputError message={form.errors.captcha_answer} />
                        </div>

                        <div className="absolute left-[-10000px]" aria-hidden="true">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={form.data.website}
                                onChange={(event) =>
                                    form.setData(
                                        'website',
                                        event.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Button type="submit" disabled={form.processing}>
                                Kirim Booking
                            </Button>
                            <Button variant="secondary" type="button" asChild>
                                <Link href="/">Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
