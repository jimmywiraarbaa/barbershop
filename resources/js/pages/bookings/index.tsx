import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { bookingColumns, type BookingRow } from '@/modules/booking/columns';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
];

type CapsterOption = {
    id: number;
    name: string;
};

export default function BookingsIndex({
    bookings,
    capsters,
}: {
    bookings: BookingRow[];
    capsters: CapsterOption[];
}) {
    const [capsterFilter, setCapsterFilter] = useState('all');
    const filteredBookings = useMemo(() => {
        if (capsterFilter === 'all') {
            return bookings;
        }

        const selectedId = Number(capsterFilter);
        return bookings.filter((booking) => booking.capsterId === selectedId);
    }, [bookings, capsterFilter]);

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
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Filter capster
                            </span>
                            <Select
                                value={capsterFilter}
                                onValueChange={setCapsterFilter}
                            >
                                <SelectTrigger className="h-9 w-[220px]">
                                    <SelectValue placeholder="Semua capster" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Semua capster
                                    </SelectItem>
                                    {capsters.map((capster) => (
                                        <SelectItem
                                            key={capster.id}
                                            value={String(capster.id)}
                                        >
                                            {capster.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button asChild>
                            <Link href="/booking/create">Tambah Booking</Link>
                        </Button>
                    </div>
                </div>

                <DataTable
                    columns={bookingColumns}
                    data={filteredBookings}
                    emptyMessage="Belum ada data booking."
                    searchableKeys={[
                        'capsterName',
                        'name',
                        'email',
                        'whatsapp',
                        'notes',
                    ]}
                    searchPlaceholder="Cari nama, email, WA..."
                    searchClassName="h-9 w-[220px]"
                />
            </div>
        </AppLayout>
    );
}
