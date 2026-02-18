import { EmployeeTable } from "@/components/employee-table";
import { fetchEmployees } from "@/lib/employee-api";
import { type Employee } from "@/lib/employee.types";
import { useEffect, useState } from "react";

export function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees()
            .then(setEmployees)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1>Employees</h1>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && <EmployeeTable employees={employees} />}
        </div>
    );
}
