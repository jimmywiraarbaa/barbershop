import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    emptyMessage?: string;
    searchableKeys?: Array<keyof TData>;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    searchClassName?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    emptyMessage = 'Belum ada data.',
    searchableKeys,
    searchPlaceholder = 'Cari data...',
    searchValue,
    onSearchValueChange,
    searchClassName,
}: DataTableProps<TData, TValue>) {
    const [internalSearch, setInternalSearch] = useState('');
    const activeSearchValue = searchValue ?? internalSearch;
    const setSearchValue = onSearchValueChange ?? setInternalSearch;
    const filteredData = useMemo(() => {
        if (! searchableKeys?.length) {
            return data;
        }

        const query = activeSearchValue.trim().toLowerCase();
        if (! query) {
            return data;
        }

        return data.filter((row) =>
            searchableKeys.some((key) => {
                const value = row[key];
                if (value === null || value === undefined) {
                    return false;
                }

                return String(value).toLowerCase().includes(query);
            }),
        );
    }, [activeSearchValue, data, searchableKeys]);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="space-y-4">
            {searchableKeys?.length ? (
                <div className="flex items-center">
                    <Input
                        value={activeSearchValue}
                        onChange={(event) =>
                            setSearchValue(event.target.value)
                        }
                        placeholder={searchPlaceholder}
                        className={searchClassName ?? 'h-9 w-[220px]'}
                    />
                </div>
            ) : null}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-sm text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                    {table.getRowModel().rows.length} data
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
