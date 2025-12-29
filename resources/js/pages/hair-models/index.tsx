import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

type HairModel = {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Model Rambut',
        href: '/model-rambut',
    },
];

export default function HairModelsIndex({
    hairModels,
}: {
    hairModels: HairModel[];
}) {
    const handleDelete = (id: number) => {
        if (! window.confirm('Hapus model rambut ini?')) {
            return;
        }

        router.delete(`/model-rambut/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Model Rambut" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Model Rambut</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola daftar model rambut yang tersedia.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/model-rambut/create">Tambah Model</Link>
                    </Button>
                </div>

                {hairModels.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan model rambut pertama untuk mulai
                                mengelola katalog.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/model-rambut/create">
                                    Tambah Model
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {hairModels.map((hairModel) => (
                            <Card key={hairModel.id} className="h-full">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {hairModel.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {hairModel.description ||
                                            'Deskripsi belum diisi.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {hairModel.imageUrl ? (
                                        <img
                                            src={hairModel.imageUrl}
                                            alt={hairModel.title}
                                            className="h-40 w-full rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                                            Belum ada gambar
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="secondary" asChild>
                                        <Link
                                            href={`/model-rambut/${hairModel.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(hairModel.id)
                                        }
                                    >
                                        Hapus
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
