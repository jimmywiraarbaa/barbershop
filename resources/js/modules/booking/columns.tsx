import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { BookingRowActions } from '@/modules/booking/row-actions';

export type BookingRow = {
    id: number;
    capsterId: number;
    capsterName: string | null;
    modelRambutId: number | null;
    modelRambutTitle: string | null;
    priceId: number | null;
    priceName: string | null;
    priceAmount: number | null;
    name: string | null;
    email: string | null;
    whatsapp: string | null;
    notes: string | null;
    createdAt: string | null;
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);

export const bookingColumns: ColumnDef<BookingRow>[] = [
    {
        accessorKey: 'capsterName',
        header: 'Capster',
        cell: ({ row }) => row.original.capsterName || '-',
    },
    {
        accessorKey: 'modelRambutTitle',
        header: 'Model Rambut',
        cell: ({ row }) => row.original.modelRambutTitle || '-',
    },
    {
        accessorKey: 'priceName',
        header: 'Harga',
        cell: ({ row }) => {
            const { priceName, priceAmount } = row.original;
            if (! priceName) {
                return '-';
            }

            return (
                <div className="space-y-0.5">
                    <div className="text-sm font-medium">{priceName}</div>
                    {priceAmount !== null ? (
                        <div className="text-xs text-muted-foreground">
                            {formatCurrency(priceAmount)}
                        </div>
                    ) : null}
                </div>
            );
        },
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
