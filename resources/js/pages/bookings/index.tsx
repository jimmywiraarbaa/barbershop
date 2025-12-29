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

type Booking = {
    id: number;
    capsterName: string | null;
    name: string;
    email: string | null;
    whatsapp: string;
    notes: string | null;
    createdAt: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
];

export default function BookingsIndex({
    bookings,
}: {
    bookings: Booking[];
}) {
    const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/booking/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
                toast({
                    title: 'Booking dihapus',
                    description: `"${target.name}" berhasil dihapus.`,
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Booking" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Booking</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data booking pelanggan.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/booking/create">Tambah Booking</Link>
                    </Button>
                </div>

                {bookings.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan booking pertama untuk mulai
                                mengelola data.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/booking/create">
                                    Tambah Booking
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="h-full">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {booking.name || 'Tanpa Nama'}
                                    </CardTitle>
                                    <CardDescription>
                                        Capster:{' '}
                                        {booking.capsterName ??
                                            'Belum dipilih'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <div>Email: {booking.email || '-'}</div>
                                    <div>
                                        WhatsApp: {booking.whatsapp || '-'}
                                    </div>
                                    {booking.notes ? (
                                        <div className="line-clamp-3">
                                            Keterangan: {booking.notes}
                                        </div>
                                    ) : (
                                        <div>Keterangan: -</div>
                                    )}
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="secondary" asChild>
                                        <Link
                                            href={`/booking/${booking.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setDeleteTarget(booking);
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
                        <DialogTitle>Hapus booking?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Booking "${deleteTarget.name}" akan dihapus.`
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
