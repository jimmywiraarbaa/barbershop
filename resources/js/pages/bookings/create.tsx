import InputError from '@/components/input-error';
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
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
    {
        title: 'Tambah',
        href: '/booking/create',
    },
];

const getInitials = (value: string) =>
    value
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

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

export default function BookingCreate({
    capsters,
    hairModels,
    prices,
}: {
    capsters: CapsterOption[];
    hairModels: HairModelOption[];
    prices: PriceOption[];
}) {
    const { toast } = useToast();
    const form = useForm({
        capster_id: '',
        model_rambut_id: '',
        price_id: '',
        status: 'waiting',
        name: '',
        email: '',
        whatsapp: '',
        notes: '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/booking', {
            onSuccess: () => {
                toast({
                    title: 'Booking ditambahkan',
                    description: 'Data berhasil disimpan.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Booking" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Booking
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Isi data booking pelanggan.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/booking">Kembali</Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="capster_id">Capster</Label>
                        <Select
                            value={form.data.capster_id}
                            onValueChange={(value) =>
                                form.setData('capster_id', value)
                            }
                        >
                            <SelectTrigger
                                id="capster_id"
                                aria-invalid={!!form.errors.capster_id}
                                className="h-12"
                            >
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
                                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 text-[10px] font-semibold text-muted-foreground">
                                                    {capster.imageUrl ? (
                                                        <img
                                                            src={capster.imageUrl}
                                                            alt={capster.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        getInitials(capster.name)
                                                    )}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium">
                                                        {capster.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatShift(capster)}
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
                        <Label htmlFor="model_rambut_id">Model Rambut</Label>
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
                                aria-invalid={!!form.errors.model_rambut_id}
                                className="h-12"
                            >
                                <SelectValue placeholder="Pilih model rambut (opsional)" />
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
                                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 text-[10px] font-semibold text-muted-foreground">
                                                    {model.imageUrl ? (
                                                        <img
                                                            src={model.imageUrl}
                                                            alt={model.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        getInitials(model.title)
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
                            <SelectTrigger
                                id="price_id"
                                aria-invalid={!!form.errors.price_id}
                                className="h-12"
                            >
                                <SelectValue placeholder="Pilih harga (opsional)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none" textValue="Tanpa pilihan">
                                    Tanpa pilihan
                                </SelectItem>
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
                                                    {formatCurrency(price.price)}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        <InputError message={form.errors.price_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={form.data.status}
                            onValueChange={(value) =>
                                form.setData('status', value)
                            }
                        >
                            <SelectTrigger
                                id="status"
                                aria-invalid={!!form.errors.status}
                                className="h-12"
                            >
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="waiting">Waiting</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={form.errors.status} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="Nama pelanggan"
                            aria-invalid={!!form.errors.name}
                        />
                        <InputError message={form.errors.name} />
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
                            aria-invalid={!!form.errors.email}
                        />
                        <InputError message={form.errors.email} />
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
                                form.setData('whatsapp', event.target.value)
                            }
                            placeholder="62xxxxxxxxxx"
                            aria-invalid={!!form.errors.whatsapp}
                        />
                        <InputError message={form.errors.whatsapp} />
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
                            placeholder="Tambahkan keterangan booking..."
                            rows={4}
                            aria-invalid={!!form.errors.notes}
                        />
                        <InputError message={form.errors.notes} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={form.processing}>
                            Simpan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/booking">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
