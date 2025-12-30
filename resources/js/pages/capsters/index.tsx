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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type Capster = {
    id: number;
    name: string;
    whatsapp: string | null;
    userId: number | null;
    workHourId: number | null;
    workHourName: string | null;
    imageUrl: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Capster',
        href: '/capster',
    },
];

export default function CapstersIndex({ capsters }: { capsters: Capster[] }) {
    const [deleteTarget, setDeleteTarget] = useState<Capster | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    const filteredCapsters = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (! query) {
            return capsters;
        }

        return capsters.filter((capster) => {
            const values = [
                capster.name,
                capster.whatsapp,
                capster.workHourName,
                capster.workHourId ? String(capster.workHourId) : null,
            ];

            return values.some((value) =>
                value ? value.toLowerCase().includes(query) : false,
            );
        });
    }, [capsters, searchTerm]);

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/capster/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
                toast({
                    title: 'Capster dihapus',
                    description: `"${target.name}" berhasil dihapus.`,
                    variant: 'success',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Capster" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Capster</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data capster yang tersedia.
                        </p>
                        <div className="mt-4">
                            <Input
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Cari nama, WA, jam kerja..."
                                className="h-9 w-[220px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button asChild>
                            <Link href="/capster/create">Tambah Capster</Link>
                        </Button>
                    </div>
                </div>

                {capsters.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan capster pertama untuk mulai
                                mengelola data.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/capster/create">
                                    Tambah Capster
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : filteredCapsters.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Data tidak ditemukan</CardTitle>
                            <CardDescription>
                                Coba kata kunci lain untuk mencari capster.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredCapsters.map((capster) => (
                            <Card key={capster.id} className="h-full">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {capster.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {capster.whatsapp ||
                                            'Nomor WhatsApp belum diisi.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
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
                                    <div className="text-sm text-muted-foreground">
                                        Jam Kerja:{' '}
                                        {capster.workHourName
                                            ? capster.workHourName
                                            : capster.workHourId
                                              ? capster.workHourId
                                              : 'Belum dipilih'}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="secondary" asChild>
                                        <Link
                                            href={`/capster/${capster.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setDeleteTarget(capster);
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
                        <DialogTitle>Hapus capster?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Capster "${deleteTarget.name}" akan dihapus.`
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
