import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { bookingColumns, type BookingRow } from '@/modules/booking/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
];

export default function BookingsIndex({ bookings }: { bookings: BookingRow[] }) {
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

                <DataTable
                    columns={bookingColumns}
                    data={bookings}
                    emptyMessage="Belum ada data booking."
                />
            </div>
        </AppLayout>
    );
}
