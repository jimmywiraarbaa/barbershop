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
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type PriceItem = {
    id: number;
    name: string;
    price: number;
    description: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Harga',
        href: '/harga',
    },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

export default function PricesIndex({ prices }: { prices: PriceItem[] }) {
    const [deleteTarget, setDeleteTarget] = useState<PriceItem | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/harga/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
                toast({
                    title: 'Harga dihapus',
                    description: `"${target.name}" berhasil dihapus.`,
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Harga" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Harga</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola daftar harga layanan.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/harga/create">Tambah Harga</Link>
                    </Button>
                </div>

                {prices.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan harga pertama untuk mulai mengelola
                                daftar layanan.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/harga/create">Tambah Harga</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {prices.map((price) => (
                            <Card key={price.id} className="h-full">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {price.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {price.description ||
                                            'Keterangan belum diisi.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-semibold">
                                        {formatCurrency(price.price)}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="secondary" asChild>
                                        <Link
                                            href={`/harga/${price.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setDeleteTarget(price);
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
                        <DialogTitle>Hapus harga?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Harga "${deleteTarget.name}" akan dihapus.`
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
