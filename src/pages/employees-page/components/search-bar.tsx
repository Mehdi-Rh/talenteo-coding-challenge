import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

export function SearchBar({ value, onChange, onSearch, onClear }: SearchBarProps) {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onSearch();
            }}
            className="flex gap-2 mb-4 flex-end "
        >
            <Input
                placeholder="Search by name..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <Button type="submit">Search</Button>
            {value && <Button type="button" variant="outline" onClick={onClear}>Clear</Button>}
        </form>
    );
}
