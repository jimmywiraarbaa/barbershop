import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerInputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ariaInvalid?: boolean;
    minDate?: Date;
    allowClear?: boolean;
};

const parseDateValue = (value: string) => {
    if (!value) {
        return undefined;
    }

    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
        return undefined;
    }

    return new Date(year, month - 1, day);
};

const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatLabel = (date: Date) =>
    new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date);

export function DatePickerInput({
    id,
    value,
    onChange,
    placeholder = 'Pilih tanggal',
    ariaInvalid,
    minDate,
    allowClear,
}: DatePickerInputProps) {
    const selectedDate = parseDateValue(value);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    aria-invalid={ariaInvalid}
                    className={cn(
                        'h-12 w-full justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground',
                        ariaInvalid && 'border-destructive',
                    )}
                >
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? (
                        <span>{formatLabel(selectedDate)}</span>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        if (!date) {
                            return;
                        }
                        onChange(formatDateValue(date));
                    }}
                    disabled={minDate ? { before: minDate } : undefined}
                    initialFocus
                />
                {allowClear && value ? (
                    <div className="border-t p-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-muted-foreground"
                            onClick={() => onChange('')}
                        >
                            Hapus tanggal
                        </Button>
                    </div>
                ) : null}
            </PopoverContent>
        </Popover>
    );
}
