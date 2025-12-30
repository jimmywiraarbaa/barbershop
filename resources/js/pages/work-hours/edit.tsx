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
import { TimePicker } from '@/components/ui/time-picker';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type WorkHour = {
    id: number;
    name: string;
    dayStart: string | null;
    dayEnd: string | null;
    timeStart: string | null;
    timeEnd: string | null;
};

const dayOptions = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
];

export default function WorkHoursEdit({
    workHour,
}: {
    workHour: WorkHour;
}) {
    const { toast } = useToast();
    const form = useForm<{
        name: string;
        day_start: string;
        day_end: string;
        time_start: string;
        time_end: string;
    }>({
        name: workHour.name ?? '',
        day_start: workHour.dayStart ?? '',
        day_end: workHour.dayEnd ?? '',
        time_start: workHour.timeStart ?? '',
        time_end: workHour.timeEnd ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Jam Kerja',
            href: '/jam-kerja',
        },
        {
            title: workHour.name,
            href: `/jam-kerja/${workHour.id}/edit`,
        },
    ];

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.put(`/jam-kerja/${workHour.id}`, {
            onSuccess: () => {
                toast({
                    title: 'Perubahan disimpan',
                    description: 'Jam kerja berhasil diperbarui.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${workHour.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Jam Kerja
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui jam operasional yang dipilih.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/jam-kerja">Kembali</Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="Contoh: Reguler"
                            required
                            aria-invalid={!!form.errors.name}
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="day_start">Hari Mulai</Label>
                            <Select
                                value={form.data.day_start}
                                onValueChange={(value) =>
                                    form.setData('day_start', value)
                                }
                            >
                                <SelectTrigger
                                    id="day_start"
                                    aria-invalid={!!form.errors.day_start}
                                >
                                    <SelectValue placeholder="Pilih hari mulai" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dayOptions.map((day) => (
                                        <SelectItem key={day} value={day}>
                                            {day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.day_start} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="day_end">Hari Selesai</Label>
                            <Select
                                value={form.data.day_end}
                                onValueChange={(value) =>
                                    form.setData('day_end', value)
                                }
                            >
                                <SelectTrigger
                                    id="day_end"
                                    aria-invalid={!!form.errors.day_end}
                                >
                                    <SelectValue placeholder="Pilih hari selesai" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dayOptions.map((day) => (
                                        <SelectItem key={day} value={day}>
                                            {day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.day_end} />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="time_start">Jam Mulai</Label>
                            <TimePicker
                                id="time_start"
                                value={form.data.time_start}
                                onChange={(value) =>
                                    form.setData('time_start', value)
                                }
                                ariaInvalid={!!form.errors.time_start}
                            />
                            <InputError message={form.errors.time_start} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="time_end">Jam Selesai</Label>
                            <TimePicker
                                id="time_end"
                                value={form.data.time_end}
                                onChange={(value) =>
                                    form.setData('time_end', value)
                                }
                                ariaInvalid={!!form.errors.time_end}
                            />
                            <InputError message={form.errors.time_end} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/jam-kerja">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
