import { type Employee } from "./employee.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchEmployees({ page = 1, limit = 10, search = "" } = {}): Promise<Employee[]> {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (search) params.append("search", search);
    const res = await fetch(`${BASE_URL}/employees?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
}

export async function createEmployee(data: Omit<Employee, "id" | "createdAt" | "avatar"> & { avatar?: string }) {
    const res = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
}
