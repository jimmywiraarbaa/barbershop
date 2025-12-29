import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
        title: 'Gallery',
        href: '/gallery',
    },
    {
        title: 'Tambah',
        href: '/gallery/create',
    },
];

export default function GalleryCreate() {
    const { toast } = useToast();
    const form = useForm<{
        title: string;
        description: string;
        image: File | null;
        is_active: boolean;
        order: string;
    }>({
        title: '',
        description: '',
        image: null,
        is_active: true,
        order: '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/gallery', {
            forceFormData: true,
            onSuccess: () => {
                toast({
                    title: 'Item gallery ditambahkan',
                    description: 'Data berhasil disimpan.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Gallery" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Item Gallery
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Isi detail item gallery yang akan ditampilkan.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/gallery">Kembali</Link>
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={form.data.title}
                            onChange={(event) =>
                                form.setData('title', event.target.value)
                            }
                            placeholder="Judul item gallery"
                            required
                            aria-invalid={!!form.errors.title}
                        />
                        <InputError message={form.errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.data.description}
                            onChange={(event) =>
                                form.setData('description', event.target.value)
                            }
                            placeholder="Deskripsikan item gallery..."
                            rows={5}
                            aria-invalid={!!form.errors.description}
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                                form.setData(
                                    'image',
                                    event.currentTarget.files?.[0] ?? null,
                                )
                            }
                            aria-invalid={!!form.errors.image}
                        />
                        <p className="text-xs text-muted-foreground">
                            Maksimum 2MB. Format gambar umum didukung.
                        </p>
                        <InputError message={form.errors.image} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="order">Order</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            inputMode="numeric"
                            min={0}
                            value={form.data.order}
                            onChange={(event) =>
                                form.setData('order', event.target.value)
                            }
                            placeholder="Urutan tampil (opsional)"
                            aria-invalid={!!form.errors.order}
                        />
                        <InputError message={form.errors.order} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="is_active"
                            checked={form.data.is_active}
                            onCheckedChange={(checked) =>
                                form.setData('is_active', checked === true)
                            }
                        />
                        <Label htmlFor="is_active">Aktifkan item</Label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={form.processing}>
                            Simpan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/gallery">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
