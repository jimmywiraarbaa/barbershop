import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type PriceItem = {
    id: number;
    name: string;
    price: number;
    description: string | null;
};

export default function PricesEdit({ price }: { price: PriceItem }) {
    const form = useForm<{
        name: string;
        price: string;
        description: string;
    }>({
        name: price.name ?? '',
        price: price.price ? String(price.price) : '',
        description: price.description ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Harga',
            href: '/harga',
        },
        {
            title: price.name,
            href: `/harga/${price.id}/edit`,
        },
    ];

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.put(`/harga/${price.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${price.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Edit Harga</h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui detail harga layanan.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/harga">Kembali</Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="Contoh: Potong Rambut"
                            required
                            aria-invalid={!!form.errors.name}
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            inputMode="numeric"
                            min={0}
                            value={form.data.price}
                            onChange={(event) =>
                                form.setData('price', event.target.value)
                            }
                            placeholder="Contoh: 75000"
                            required
                            aria-invalid={!!form.errors.price}
                        />
                        <InputError message={form.errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Keterangan</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.data.description}
                            onChange={(event) =>
                                form.setData(
                                    'description',
                                    event.target.value,
                                )
                            }
                            placeholder="Tambahkan keterangan harga..."
                            rows={4}
                            aria-invalid={!!form.errors.description}
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/harga">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
