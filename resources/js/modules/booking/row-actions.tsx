import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { type BookingRow } from '@/modules/booking/columns';

export function BookingRowActions({ booking }: { booking: BookingRow }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = () => {
        router.delete(`/booking/${booking.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast({
                    title: 'Booking dihapus',
                    description: `"${booking.name || 'Tanpa nama'}" berhasil dihapus.`,
                    variant: 'success',
                });
            },
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/booking/${booking.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={(event) => {
                            event.preventDefault();
                            setIsDeleteOpen(true);
                        }}
                    >
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isDeleteOpen}
                onOpenChange={(open) => setIsDeleteOpen(open)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus booking?</DialogTitle>
                        <DialogDescription>
                            Booking "{booking.name || 'Tanpa nama'}" akan
                            dihapus.
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
        </>
    );
}
