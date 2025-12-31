import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Harga',
        href: '/harga',
    },
    {
        title: 'Tambah',
        href: '/harga/create',
    },
];

export default function PricesCreate() {
    const { toast } = useToast();
    const form = useForm<{
        name: string;
        price: string;
        description: string;
    }>({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/harga', {
            onSuccess: () => {
                toast({
                    title: 'Harga ditambahkan',
                    description: 'Data berhasil disimpan.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Harga" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Tambah Harga</h1>
                        <p className="text-sm text-muted-foreground">
                            Isi detail harga layanan.
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
                            Simpan
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
