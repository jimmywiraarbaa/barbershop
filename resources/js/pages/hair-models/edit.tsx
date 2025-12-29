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

type HairModel = {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
};

export default function HairModelsEdit({
    hairModel,
}: {
    hairModel: HairModel;
}) {
    const { toast } = useToast();
    const form = useForm<{
        title: string;
        description: string;
        image: File | null;
    }>({
        title: hairModel.title ?? '',
        description: hairModel.description ?? '',
        image: null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Model Rambut',
            href: '/model-rambut',
        },
        {
            title: hairModel.title,
            href: `/model-rambut/${hairModel.id}/edit`,
        },
    ];

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.put(`/model-rambut/${hairModel.id}`, {
            forceFormData: true,
            onSuccess: () => {
                toast({
                    title: 'Perubahan disimpan',
                    description: 'Model rambut berhasil diperbarui.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${hairModel.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Model Rambut
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui detail model rambut yang dipilih.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/model-rambut">Kembali</Link>
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
                            placeholder="Contoh: Fade Classic"
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
                            placeholder="Deskripsikan model rambut ini..."
                            rows={5}
                            aria-invalid={!!form.errors.description}
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="aspect-square w-full overflow-hidden rounded-md border border-dashed bg-muted/30">
                            {hairModel.imageUrl ? (
                                <img
                                    src={hairModel.imageUrl}
                                    alt={hairModel.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                                    Belum ada gambar
                                </div>
                            )}
                        </div>
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
                            Maksimum 2MB. Upload gambar baru untuk mengganti.
                        </p>
                        <InputError message={form.errors.image} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href="/model-rambut">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
