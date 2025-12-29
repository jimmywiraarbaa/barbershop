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

export default function BookingCreate({
    capsters,
}: {
    capsters: CapsterOption[];
}) {
    const { toast } = useToast();
    const form = useForm({
        capster_id: '',
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
                                        >
                                            {capster.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        <InputError message={form.errors.capster_id} />
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
