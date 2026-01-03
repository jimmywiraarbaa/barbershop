import { ImageCropInput } from '@/components/image-crop-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

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
    const [pendingCrops, setPendingCrops] = useState<boolean[]>([]);
    const form = useForm<{
        items: Array<{
            title: string;
            description: string;
            image: File | null;
            is_active: boolean;
            order: string;
        }>;
    }>({
        items: [
            {
                title: '',
                description: '',
                image: null,
                is_active: true,
                order: '',
            },
        ],
    });

    const getError = (field: string) =>
        (form.errors as Record<string, string | undefined>)[field];

    const addRow = () => {
        form.setData('items', [
            ...form.data.items,
            {
                title: '',
                description: '',
                image: null,
                is_active: true,
                order: '',
            },
        ]);
        setPendingCrops((prev) => [...prev, false]);
    };

    const removeRow = (index: number) => {
        if (form.data.items.length === 1) {
            return;
        }

        form.setData(
            'items',
            form.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
        setPendingCrops((prev) =>
            prev.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.post('/gallery', {
            forceFormData: true,
        });
    };

    const isCropping = pendingCrops.some(Boolean);

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
                    <div className="space-y-6">
                        {form.data.items.map((item, index) => (
                            <div
                                key={index}
                                className="space-y-4 rounded-lg border p-4"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="text-sm font-semibold">
                                        Item {index + 1}
                                    </h2>
                                    {form.data.items.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => removeRow(index)}
                                        >
                                            Hapus baris
                                        </Button>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor={`title-${index}`}>
                                        Title
                                    </Label>
                                    <Input
                                        id={`title-${index}`}
                                        value={item.title}
                                        onChange={(event) =>
                                            form.setData(
                                                'items',
                                                form.data.items.map(
                                                    (entry, entryIndex) =>
                                                        entryIndex === index
                                                            ? {
                                                                  ...entry,
                                                                  title: event
                                                                      .target
                                                                      .value,
                                                              }
                                                            : entry,
                                                ),
                                            )
                                        }
                                        placeholder="Judul item gallery"
                                        required
                                        aria-invalid={
                                            !!getError(
                                                `items.${index}.title`,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={getError(
                                            `items.${index}.title`,
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor={`description-${index}`}>
                                        Description
                                    </Label>
                                    <Textarea
                                        id={`description-${index}`}
                                        value={item.description}
                                        onChange={(event) =>
                                            form.setData(
                                                'items',
                                                form.data.items.map(
                                                    (entry, entryIndex) =>
                                                        entryIndex === index
                                                            ? {
                                                                  ...entry,
                                                                  description:
                                                                      event
                                                                          .target
                                                                          .value,
                                                              }
                                                            : entry,
                                                ),
                                            )
                                        }
                                        placeholder="Deskripsikan item gallery..."
                                        rows={4}
                                        aria-invalid={
                                            !!getError(
                                                `items.${index}.description`,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={getError(
                                            `items.${index}.description`,
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <ImageCropInput
                                        id={`image-${index}`}
                                        label="Image"
                                        value={item.image}
                                        onChange={(file) =>
                                            form.setData(
                                                'items',
                                                form.data.items.map(
                                                    (entry, entryIndex) =>
                                                        entryIndex === index
                                                            ? {
                                                                  ...entry,
                                                                  image: file,
                                                              }
                                                            : entry,
                                                ),
                                            )
                                        }
                                        helperText="Maksimum 2MB. Format gambar umum didukung."
                                        onPendingChange={(pending) =>
                                            setPendingCrops((prev) => {
                                                const next = [...prev];
                                                next[index] = pending;
                                                return next;
                                            })
                                        }
                                        ariaInvalid={
                                            !!getError(
                                                `items.${index}.image`,
                                            )
                                        }
                                        frameClassName="max-w-[320px]"
                                    />
                                    <InputError
                                        message={getError(
                                            `items.${index}.image`,
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor={`order-${index}`}>
                                        Order
                                    </Label>
                                    <Input
                                        id={`order-${index}`}
                                        type="number"
                                        inputMode="numeric"
                                        min={0}
                                        value={item.order}
                                        onChange={(event) =>
                                            form.setData(
                                                'items',
                                                form.data.items.map(
                                                    (entry, entryIndex) =>
                                                        entryIndex === index
                                                            ? {
                                                                  ...entry,
                                                                  order: event
                                                                      .target
                                                                      .value,
                                                              }
                                                            : entry,
                                                ),
                                            )
                                        }
                                        placeholder="Urutan tampil (opsional)"
                                        aria-invalid={
                                            !!getError(
                                                `items.${index}.order`,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={getError(
                                            `items.${index}.order`,
                                        )}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={`is_active-${index}`}
                                        checked={item.is_active}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'items',
                                                form.data.items.map(
                                                    (entry, entryIndex) =>
                                                        entryIndex === index
                                                            ? {
                                                                  ...entry,
                                                                  is_active:
                                                                      checked ===
                                                                      true,
                                                              }
                                                            : entry,
                                                ),
                                            )
                                        }
                                    />
                                    <Label htmlFor={`is_active-${index}`}>
                                        Aktifkan item
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={addRow}
                        >
                            Tambah baris
                        </Button>
                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                disabled={form.processing || isCropping}
                            >
                                Simpan
                            </Button>
                            <Button variant="secondary" type="button" asChild>
                                <Link href="/gallery">Batal</Link>
                            </Button>
                        </div>
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
