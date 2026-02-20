import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteEmployee, fetchEmployees } from "@/lib/employee-api";
import { toast } from "sonner";
import type { Employee } from "@/lib/employee.types";

export function DeleteEmployeeButtonWithDialog({ employeeId, setEmployees, page, limit, search }: {
    employeeId: string;
    setEmployees: (data: Employee[]) => void;
    page: number;
    limit: number;
    search: string;
}) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteEmployee(employeeId);
            toast.success("Employee deleted successfully", { style: { background: '#22c55e', color: 'white' } });
            setOpen(false);
            const data = await fetchEmployees({ page, limit, search });
            setEmployees(data);
        } catch (err: any) {
            toast.error("Failed to delete employee", { style: { background: '#ef4444', color: 'white' } });
            setError(err.message || "Failed to delete employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Employee</DialogTitle>
                </DialogHeader>
                <div className="mb-4">Are you sure you want to delete this employee?</div>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <div className="flex gap-2 justify-end ">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
