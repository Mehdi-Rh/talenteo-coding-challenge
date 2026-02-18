import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createEmployee } from "@/lib/employee-api";

const departments = ["IT", "Marketing", "Product", "Sales"];
const genders = ["male", "female"];

export function AddEmployeeForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        registratonNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        jobTitle: "",
        department: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelect = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createEmployee({
                ...form,
                registratonNumber: Number(form.registratonNumber),
            });
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Failed to add employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                <Input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
            </div>
            <Input name="registratonNumber" placeholder="Registration number" value={form.registratonNumber} onChange={handleChange} required type="number" />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
            <Input name="dateOfBirth" placeholder="Date of birth" value={form.dateOfBirth} onChange={handleChange} required type="date" />
            <Select value={form.gender} onValueChange={v => handleSelect("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                <SelectContent>
                    {genders.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
            </Select>
            <Input name="jobTitle" placeholder="Job title" value={form.jobTitle} onChange={handleChange} required />
            <Select value={form.department} onValueChange={v => handleSelect("department", v)}>
                <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
            </Select>
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Employee"}</Button>
        </form>
    );
}
