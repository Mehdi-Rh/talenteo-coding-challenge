import * as React from "react";
import { EmployeeForm } from "@/components/ui/employee-form";
import { useEditEmployee } from "@/hooks/use-edit-employee";
import type { Employee } from "@/lib/employee.types";



export function EditEmployeeForm({ employee, onSuccess }: { employee: Employee; onSuccess: () => void }) {
    // Format dateOfBirth to YYYY-MM-DD for input type="date"
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };
    const [form, setForm] = React.useState<Employee>({
        ...employee,
        dateOfBirth: formatDate(employee.dateOfBirth),
    });
    const { editEmployee, loading, error } = useEditEmployee();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await editEmployee(employee.id, form);
        if (result.success) {
            onSuccess();
        }
        // error is handled by the hook
    };

    return (
        <EmployeeForm
            form={form}
            setForm={setForm}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            departmentOptions={[...new Set([employee.department, "IT", "Marketing", "Product", "Sales"])]}
        />
    );
}
