import { ImageCropInput } from '@/components/image-crop-input';
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
import { useState } from 'react';

type GalleryItem = {
    id: number;
    title: string;
    description: string | null;
    order: number | null;
    isActive: boolean;
    imageUrl: string | null;
};

export default function GalleryEdit({ gallery }: { gallery: GalleryItem }) {
    const { toast } = useToast();
    const [isCropping, setIsCropping] = useState(false);
    const form = useForm<{
        title: string;
        description: string;
        image: File | null;
        is_active: boolean;
        order: string;
    }>({
        title: gallery.title ?? '',
        description: gallery.description ?? '',
        image: null,
        is_active: gallery.isActive ?? true,
        order: gallery.order !== null ? String(gallery.order) : '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Gallery',
            href: '/gallery',
        },
        {
            title: gallery.title,
            href: `/gallery/${gallery.id}/edit`,
        },
    ];

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.put(`/gallery/${gallery.id}`, {
            forceFormData: true,
            onSuccess: () => {
                toast({
                    title: 'Perubahan disimpan',
                    description: 'Item gallery berhasil diperbarui.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${gallery.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Item Gallery
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui detail item gallery yang dipilih.
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
                        <ImageCropInput
                            id="image"
                            label="Image"
                            value={form.data.image}
                            initialImageUrl={gallery.imageUrl}
                            onChange={(file) => form.setData('image', file)}
                            helperText="Maksimum 2MB. Upload gambar baru untuk mengganti."
                            onPendingChange={setIsCropping}
                            ariaInvalid={!!form.errors.image}
                            frameClassName="max-w-[320px]"
                        />
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
                        <Button
                            type="submit"
                            disabled={form.processing || isCropping}
                        >
                            Simpan Perubahan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/gallery">Batal</Link>
                        </Button>
                    </div>
                    {isCropping ? (
                        <p className="text-xs text-muted-foreground">
                            Simpan crop terlebih dulu sebelum submit.
                        </p>
                    ) : null}
                </form>
            </div>
        </AppLayout>
    );
}
