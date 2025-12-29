import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Capster = {
    id: number;
    name: string;
    whatsapp: string | null;
    userId: number | null;
    imageUrl: string | null;
};

export default function CapstersEdit({ capster }: { capster: Capster }) {
    const { toast } = useToast();
    const form = useForm<{
        name: string;
        whatsapp: string;
        add_user: boolean;
        user_email: string;
        user_password: string;
        user_password_confirmation: string;
        image: File | null;
    }>({
        name: capster.name ?? '',
        whatsapp: capster.whatsapp ?? '',
        add_user: false,
        user_email: '',
        user_password: '',
        user_password_confirmation: '',
        image: null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Capster',
            href: '/capster',
        },
        {
            title: capster.name,
            href: `/capster/${capster.id}/edit`,
        },
    ];

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.put(`/capster/${capster.id}`, {
            forceFormData: true,
            onSuccess: () => {
                toast({
                    title: 'Perubahan disimpan',
                    description: 'Data capster berhasil diperbarui.',
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${capster.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Capster
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui data capster yang dipilih.
                        </p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href="/capster">Kembali</Link>
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="Nama capster"
                            required
                            aria-invalid={!!form.errors.name}
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
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

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="add_user"
                                checked={form.data.add_user}
                                onCheckedChange={(checked) =>
                                    form.setData(
                                        'add_user',
                                        checked === true,
                                    )
                                }
                            />
                            <Label htmlFor="add_user">
                                Tambah user untuk capster ini
                            </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            User terhubung:{' '}
                            {capster.userId ? capster.userId : 'Belum ada'}
                        </p>
                    </div>

                    {form.data.add_user && (
                        <div className="space-y-4 rounded-lg border p-4">
                            <div className="grid gap-2">
                                <Label htmlFor="user_email">Email</Label>
                                <Input
                                    id="user_email"
                                    name="user_email"
                                    type="email"
                                    value={form.data.user_email}
                                    onChange={(event) =>
                                        form.setData(
                                            'user_email',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="email@example.com"
                                    required
                                    aria-invalid={!!form.errors.user_email}
                                />
                                <InputError message={form.errors.user_email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="user_password">Password</Label>
                                <Input
                                    id="user_password"
                                    name="user_password"
                                    type="password"
                                    value={form.data.user_password}
                                    onChange={(event) =>
                                        form.setData(
                                            'user_password',
                                            event.target.value,
                                        )
                                    }
                                    required
                                    aria-invalid={!!form.errors.user_password}
                                />
                                <InputError
                                    message={form.errors.user_password}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="user_password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <Input
                                    id="user_password_confirmation"
                                    name="user_password_confirmation"
                                    type="password"
                                    value={
                                        form.data.user_password_confirmation
                                    }
                                    onChange={(event) =>
                                        form.setData(
                                            'user_password_confirmation',
                                            event.target.value,
                                        )
                                    }
                                    required
                                    aria-invalid={
                                        !!form.errors
                                            .user_password_confirmation
                                    }
                                />
                                <InputError
                                    message={
                                        form.errors.user_password_confirmation
                                    }
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="aspect-square w-full overflow-hidden rounded-md border border-dashed bg-muted/30">
                            {capster.imageUrl ? (
                                <img
                                    src={capster.imageUrl}
                                    alt={capster.name}
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
                            <Link href="/capster">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
