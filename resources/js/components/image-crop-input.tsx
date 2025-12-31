import {
    type ChangeEvent,
    type SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    type Crop,
    type PixelCrop,
} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type ImageCropInputProps = {
    id: string;
    label: string;
    value: File | null;
    onChange: (file: File | null) => void;
    initialImageUrl?: string | null;
    helperText?: string;
    onPendingChange?: (pending: boolean) => void;
    ariaInvalid?: boolean;
    frameClassName?: string;
};

const OUTPUT_SIZE = 800;
const ASPECT = 1;

const centerAspectCrop = (mediaWidth: number, mediaHeight: number) =>
    centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            ASPECT,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );

export function ImageCropInput({
    id,
    label,
    value,
    onChange,
    initialImageUrl = null,
    helperText,
    onPendingChange,
    ariaInvalid,
    frameClassName,
}: ImageCropInputProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialImageUrl,
    );
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (value) {
            const url = URL.createObjectURL(value);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }

        if (! imageSrc) {
            setPreviewUrl(initialImageUrl);
        }
    }, [value, imageSrc, initialImageUrl]);

    useEffect(() => {
        if (! imageSrc) {
            return;
        }

        return () => URL.revokeObjectURL(imageSrc);
    }, [imageSrc]);

    useEffect(() => {
        onPendingChange?.(Boolean(imageSrc));
    }, [imageSrc, onPendingChange]);

    const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = event.currentTarget;
        setCrop(centerAspectCrop(width, height));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0] ?? null;
        if (! file) {
            return;
        }

        setSourceFile(file);
        setImageSrc(URL.createObjectURL(file));
        setCompletedCrop(null);
        event.currentTarget.value = '';
    };

    const handleCancelCrop = () => {
        setImageSrc(null);
        setSourceFile(null);
        setCompletedCrop(null);
    };

    const handleApplyCrop = async () => {
        if (
            ! completedCrop ||
            ! imageRef.current ||
            ! sourceFile ||
            completedCrop.width === 0 ||
            completedCrop.height === 0
        ) {
            return;
        }

        const image = imageRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const canvas = document.createElement('canvas');
        canvas.width = OUTPUT_SIZE;
        canvas.height = OUTPUT_SIZE;

        const context = canvas.getContext('2d');
        if (! context) {
            return;
        }

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        context.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            OUTPUT_SIZE,
            OUTPUT_SIZE,
        );

        const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', 0.92),
        );

        if (! blob) {
            return;
        }

        const baseName = sourceFile.name
            .replace(/\.[^.]+$/, '')
            .trim();
        const file = new File([blob], `${baseName}.jpg`, {
            type: blob.type,
        });

        onChange(file);
        setImageSrc(null);
        setSourceFile(null);
        setCompletedCrop(null);
    };

    const showPreview = Boolean(previewUrl && ! imageSrc);

    return (
        <div className="grid gap-3">
            <Label htmlFor={id}>{label}</Label>
            {showPreview ? (
                <div
                    className={cn(
                        'aspect-square w-full overflow-hidden rounded-md border border-dashed bg-muted/30',
                        frameClassName,
                    )}
                >
                    <img
                        src={previewUrl ?? ''}
                        alt="Preview"
                        className="h-full w-full object-cover"
                    />
                </div>
            ) : null}

            {imageSrc ? (
                <div className={cn('space-y-4 w-full', frameClassName)}>
                    <div className="w-full">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) =>
                                setCrop(percentCrop)
                            }
                            onComplete={(nextCrop) =>
                                setCompletedCrop(nextCrop)
                            }
                            aspect={ASPECT}
                            keepSelection
                            className="w-full"
                        >
                            <img
                                ref={imageRef}
                                src={imageSrc}
                                alt="Crop"
                                onLoad={handleImageLoad}
                                className="w-full"
                            />
                        </ReactCrop>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button type="button" onClick={handleApplyCrop}>
                            Simpan Crop
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancelCrop}
                        >
                            Batal
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Geser dan atur area crop menjadi kotak.
                    </p>
                </div>
            ) : null}

            <Input
                id={id}
                name={id}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                aria-invalid={ariaInvalid}
            />
            {helperText ? (
                <p className="text-xs text-muted-foreground">{helperText}</p>
            ) : null}
        </div>
    );
}
