import * as React from "react";
import { createEmployee } from "@/lib/employee-api";

export function useAddEmployee() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const addEmployee = async (employee: any) => {
        setLoading(true);
        setError(null);
        try {
            await createEmployee({
                ...employee,
                registratonNumber: Number(employee.registratonNumber),
            });
            setLoading(false);
            return { success: true };
        } catch (err: any) {
            setError(err?.message || "Unknown error");
            setLoading(false);
            return { success: false, error: err };
        }
    };

    return { addEmployee, loading, error };
}
