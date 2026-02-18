import { type Employee } from "./employee.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchEmployees(): Promise<Employee[]> {
    const res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
}
