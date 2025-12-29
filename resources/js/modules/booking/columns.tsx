import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { BookingRowActions } from '@/modules/booking/row-actions';

export type BookingRow = {
    id: number;
    capsterId: number;
    capsterName: string | null;
    name: string | null;
    email: string | null;
    whatsapp: string | null;
    notes: string | null;
    createdAt: string | null;
};

export const bookingColumns: ColumnDef<BookingRow>[] = [
    {
        accessorKey: 'capsterName',
        header: 'Capster',
        cell: ({ row }) => row.original.capsterName || '-',
    },
    {
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }) => row.original.name || 'Tanpa nama',
    },
    {
        accessorKey: 'whatsapp',
        header: 'WhatsApp',
        cell: ({ row }) => row.original.whatsapp || '-',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => row.original.email || '-',
    },
    {
        accessorKey: 'notes',
        header: 'Keterangan',
        cell: ({ row }) =>
            row.original.notes ? (
                <span className="line-clamp-2">{row.original.notes}</span>
            ) : (
                <span className="text-muted-foreground">-</span>
            ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Status',
        cell: ({ row }) => (
            <Badge variant="secondary">
                {row.original.createdAt ? 'Tersimpan' : 'Draft'}
            </Badge>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <BookingRowActions booking={row.original} />,
    },
];
