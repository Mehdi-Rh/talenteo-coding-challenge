import * as React from "react";
import { EmployeeForm } from "@/components/ui/employee-form";
import { useEditEmployee } from "@/hooks/use-edit-employee";
import { toast } from "sonner";
import type { Employee } from "@/lib/employee.types";


// Helper to compare only editable fields
const editableFields = [
    "firstName",
    "lastName",
    "email",
    "dateOfBirth",
    "gender",
    "jobTitle",
    "department",
];
function fieldsEqual(form: Partial<Employee>, employee: Employee, formatDate: (d: string) => string) {
    return editableFields.every((key) => {
        if (key === "dateOfBirth") {
            return (form.dateOfBirth || "") === formatDate(employee.dateOfBirth || "");
        }
        return (form[key] ?? "") === (employee[key] ?? "");
    });
}




export function EditEmployeeForm({ employee, onSuccess }: { employee: Employee; onSuccess: () => void }) {
    // Format dateOfBirth to YYYY-MM-DD for input type="date"
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };
    const [form, setForm] = React.useState<Partial<Employee>>({
        ...employee,
        dateOfBirth: formatDate(employee.dateOfBirth),
    });

    // Compare only editable fields
    const isUnchanged = fieldsEqual(form, employee, formatDate);
    const { editEmployee, loading, error } = useEditEmployee();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await editEmployee(employee.id, form);
        if (result.success) {
            toast.success("Employee updated successfully");
            onSuccess();
        } else {
            toast.error("Failed to update employee");
        }
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
            disableSubmit={isUnchanged}
        />
    );
}
