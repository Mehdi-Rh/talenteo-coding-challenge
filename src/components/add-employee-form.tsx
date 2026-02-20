import * as React from "react";
import { EmployeeForm, type EmployeeFormFields } from "@/components/ui/employee-form";
import { useAddEmployee } from "@/hooks/use-add-employee";



export function AddEmployeeForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = React.useState<EmployeeFormFields>({
        firstName: "",
        lastName: "",
        registratonNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        jobTitle: "",
        department: "",
    });
    const { addEmployee, loading, error } = useAddEmployee();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await addEmployee(form);
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
            submitLabel="Add Employee"
        />
    );
}
