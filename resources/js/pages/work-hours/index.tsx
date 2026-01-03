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

type WorkHour = {
    id: number;
    name: string;
    dayStart: string | null;
    dayEnd: string | null;
    timeStart: string | null;
    timeEnd: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jam Kerja',
        href: '/jam-kerja',
    },
];

export default function WorkHoursIndex({
    workHours,
}: {
    workHours: WorkHour[];
}) {
    const [deleteTarget, setDeleteTarget] = useState<WorkHour | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = () => {
        const target = deleteTarget;
        if (! target) {
            return;
        }

        router.delete(`/jam-kerja/${target.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTarget(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jam Kerja" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Jam Kerja</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola jam operasional barbershop.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/jam-kerja/create">Tambah Jam Kerja</Link>
                    </Button>
                </div>

                {workHours.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Belum ada data</CardTitle>
                            <CardDescription>
                                Tambahkan jam kerja pertama untuk mulai
                                mengatur operasional.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/jam-kerja/create">
                                    Tambah Jam Kerja
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {workHours.map((workHour) => {
                            const dayRange =
                                [workHour.dayStart, workHour.dayEnd]
                                    .filter(Boolean)
                                    .join(' - ') || '-';
                            const timeRange =
                                [workHour.timeStart, workHour.timeEnd]
                                    .filter(Boolean)
                                    .join(' - ') || '-';

                            return (
                                <Card key={workHour.id} className="h-full">
                                    <CardHeader className="space-y-1">
                                        <CardTitle className="text-lg">
                                            {workHour.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Rentang hari: {dayRange}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm text-muted-foreground">
                                            Rentang jam: {timeRange}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-2">
                                        <Button variant="secondary" asChild>
                                            <Link
                                                href={`/jam-kerja/${workHour.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                setDeleteTarget(workHour);
                                                setIsDeleteOpen(true);
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
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
                        <DialogTitle>Hapus jam kerja?</DialogTitle>
                        <DialogDescription>
                            {deleteTarget
                                ? `Jam kerja "${deleteTarget.name}" akan dihapus.`
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
