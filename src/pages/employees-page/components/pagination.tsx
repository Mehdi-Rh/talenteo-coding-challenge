import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationProps {
    page: number;
    limit: number;
    hasNext: boolean;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export function Pagination({ page, limit, hasNext, onPageChange, onLimitChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-end gap-4 mt-4">
            <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
            <span>Page {page}</span>
            <Button disabled={!hasNext} onClick={() => onPageChange(page + 1)}>Next</Button>
            <span>Rows per page</span>
            <Select value={String(limit)} onValueChange={v => onLimitChange(Number(v))}>
                <SelectTrigger  >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                </SelectContent>

            </Select>
        </div>
    );
}
