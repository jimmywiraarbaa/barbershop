import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const hourOptions = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, '0'),
);
const minuteOptions = Array.from({ length: 60 }, (_, index) =>
    String(index).padStart(2, '0'),
);

interface TimePickerProps {
    id?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    ariaInvalid?: boolean;
}

export function TimePicker({
    id,
    value = '',
    onChange,
    disabled,
    className,
    ariaInvalid,
}: TimePickerProps) {
    const [hourValue = '', minuteValue = ''] = value.split(':');
    const selectedHour = hourValue || '';
    const selectedMinute = minuteValue || '';
    const minuteId = id ? `${id}-minute` : undefined;

    const handleHourChange = (nextHour: string) => {
        const nextMinute = selectedMinute || '00';
        onChange?.(`${nextHour}:${nextMinute}`);
    };

    const handleMinuteChange = (nextMinute: string) => {
        const nextHour = selectedHour || '00';
        onChange?.(`${nextHour}:${nextMinute}`);
    };

    return (
        <div
            className={cn(
                'grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2',
                className,
            )}
        >
            <Select
                value={selectedHour}
                onValueChange={handleHourChange}
                disabled={disabled}
            >
                <SelectTrigger
                    id={id}
                    className="w-full"
                    aria-invalid={ariaInvalid}
                    aria-label="Jam"
                >
                    <SelectValue placeholder="Jam" />
                </SelectTrigger>
                <SelectContent>
                    {hourOptions.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                            {hour}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">:</span>
            <Select
                value={selectedMinute}
                onValueChange={handleMinuteChange}
                disabled={disabled}
            >
                <SelectTrigger
                    id={minuteId}
                    className="w-full"
                    aria-invalid={ariaInvalid}
                    aria-label="Menit"
                >
                    <SelectValue placeholder="Menit" />
                </SelectTrigger>
                <SelectContent>
                    {minuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                            {minute}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
