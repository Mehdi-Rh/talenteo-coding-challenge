import * as React from "react";
import { updateEmployee } from "@/lib/employee-api";
import type { Employee } from "@/lib/employee.types";

export function useEditEmployee() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const editEmployee = async (id: string, employee: Partial<Employee>) => {
        setLoading(true);
        setError(null);
        try {
            await updateEmployee(id, employee);
            setLoading(false);
            return { success: true };
        } catch (err: any) {
            setError(err?.message || "Unknown error");
            setLoading(false);
            return { success: false, error: err };
        }
    };

    return { editEmployee, loading, error };
}
