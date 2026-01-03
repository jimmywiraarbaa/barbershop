import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
    const [deleteTarget, setDeleteTarget] = useState<HairModel | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/model-rambut/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
            },
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
                                        onClick={() => {
                                            setDeleteTarget(hairModel);
                                            setIsDeleteOpen(true);
                                        }}
                                    >
                                        Hapus
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Dialog
                open={isDeleteOpen}
                onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (! open) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus model rambut?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Model "${deleteTarget.title}" akan dihapus.`
                                : 'Data akan dihapus.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary">Batal</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
