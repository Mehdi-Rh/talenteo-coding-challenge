import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { fetchEmployees } from "@/lib/employee-api";
import { EditEmployeeForm } from "./edit-employee-form";
import { toast } from "sonner";
import type { Employee } from "@/lib/employee.types";

export function EditEmployeeButtonWithModal({ employee, setEmployees, page, limit, search }: {
    employee: Employee;
    setEmployees: (data: Employee[]) => void;
    page: number;
    limit: number;
    search: string;
}) {
    const [open, setOpen] = React.useState(false);

    const handleSuccess = async () => {
        setOpen(false);
        const data = await fetchEmployees({ page, limit, search });
        setEmployees(data);
        toast.success("Employee updated successfully", { style: { background: '#22c55e', color: 'white' } });
    };

    const handleFail = () => {
        setOpen(false);
        toast.error("Failed to update employee", { style: { background: '#ef4444', color: 'white' } });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>
                <EditEmployeeForm employee={employee} onSuccess={handleSuccess} onFail={handleFail} />
            </DialogContent>
        </Dialog>
    );
}
