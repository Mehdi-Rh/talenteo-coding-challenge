import { type Employee } from "@/lib/employee.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";

interface EmployeeTableProps {
    employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Registration #</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map(emp => (
                    <TableRow key={emp.id}>
                        <TableCell className="flex items-center gap-2">
                            <Avatar src={emp.avatar} alt={emp.firstName + ' ' + emp.lastName} />
                            <span>{emp.firstName} {emp.lastName}</span>
                        </TableCell>
                        <TableCell>{emp.registratonNumber}</TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{new Date(emp.dateOfBirth).toLocaleDateString()}</TableCell>
                        <TableCell>{emp.gender}</TableCell>
                        <TableCell>{emp.jobTitle}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>{/* Actions (Edit/Delete) will go here */}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
