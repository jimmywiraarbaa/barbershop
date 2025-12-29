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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type GalleryItem = {
    id: number;
    title: string;
    description: string | null;
    order: number | null;
    isActive: boolean;
    imageUrl: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: '/gallery',
    },
];

export default function GalleryIndex({
    galleries,
}: {
    galleries: GalleryItem[];
}) {
    const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/gallery/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
                toast({
                    title: 'Item gallery dihapus',
                    description: `"${target.title}" berhasil dihapus.`,
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Gallery</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola item gallery yang tampil di aplikasi.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/gallery/create">Tambah Item</Link>
                    </Button>
                </div>

                {galleries.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan item gallery pertama untuk mulai
                                mengelola konten.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/gallery/create">Tambah Item</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {galleries.map((gallery) => (
                            <Card key={gallery.id} className="h-full">
                                <CardHeader className="space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle className="text-lg">
                                            {gallery.title}
                                        </CardTitle>
                                        <Badge
                                            variant={
                                                gallery.isActive
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {gallery.isActive
                                                ? 'Aktif'
                                                : 'Nonaktif'}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {gallery.description ||
                                            'Deskripsi belum diisi.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="aspect-square w-full overflow-hidden rounded-md border border-dashed bg-muted/30">
                                        {gallery.imageUrl ? (
                                            <img
                                                src={gallery.imageUrl}
                                                alt={gallery.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                                                Belum ada gambar
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Order: {gallery.order ?? '-'}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="secondary" asChild>
                                        <Link
                                            href={`/gallery/${gallery.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setDeleteTarget(gallery);
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
                        <DialogTitle>Hapus item gallery?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Item "${deleteTarget.title}" akan dihapus.`
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
