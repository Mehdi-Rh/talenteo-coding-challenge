import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Employee } from "@/lib/employee.types";
import { Button } from "./button";

const departments = ["IT", "Marketing", "Product", "Sales"];
const genders = ["male", "female"];



interface EmployeeFormProps {
    form: Partial<Employee>;
    setForm: (form: Partial<Employee>) => void;
    error?: string | null;
    loading?: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    departmentOptions?: string[];
    disableSubmit?: boolean;
}

export function EmployeeForm({
    form,
    setForm,
    error,
    loading,
    onSubmit,
    submitLabel = "Submit",
    departmentOptions,
    disableSubmit
}: EmployeeFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelect = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                    {(departmentOptions || departments).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
            </Select>
            {error && <div className="text-red-500">{error}</div>}

            <Button type="submit" disabled={loading || disableSubmit}> {loading ? "Saving..." : submitLabel}</Button>

        </form>
    );
}
