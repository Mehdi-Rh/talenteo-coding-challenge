import { type Employee } from "@/lib/employee.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { fetchEmployees } from "@/lib/employee-api";
import { SearchBar } from "./search-bar";
import { Pagination } from "./pagination";
import { EditEmployeeButtonWithModal } from "./edit-employee-button-with-modal";
import { DeleteEmployeeButtonWithDialog } from "./delete-employee-button-with-dialog";

export function EmployeesTable() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchEmployees({ page, limit, search })
            .then(data => {
                setEmployees(data)
                setError(null)
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [page, limit, search]);

    const handleSearch = () => {
        setPage(1);
        setSearch(searchInput);
    };
    const handleClear = () => {
        setSearch("");
        setSearchInput("");
        setPage(1);
    };

    return (
        <div>
            <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                onSearch={handleSearch}
                onClear={handleClear}
            />
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && (
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
                                    <Avatar>
                                        <img src={emp.avatar} alt={emp.firstName + ' ' + emp.lastName} />
                                    </Avatar>
                                    <span>{emp.firstName} {emp.lastName}</span>
                                </TableCell>
                                <TableCell>{emp.registratonNumber}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{new Date(emp.dateOfBirth).toLocaleDateString()}</TableCell>
                                <TableCell>{emp.gender}</TableCell>
                                <TableCell>{emp.jobTitle}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                                                <TableCell className="flex gap-2">
                                                                    <EditEmployeeButtonWithModal employee={emp} setEmployees={setEmployees} page={page} limit={limit} search={search} />
                                                                    <DeleteEmployeeButtonWithDialog employeeId={emp.id} setEmployees={setEmployees} page={page} limit={limit} search={search} />
                                                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Pagination
                page={page}
                limit={limit}
                hasNext={employees.length === limit}
                onPageChange={setPage}
                onLimitChange={l => { setLimit(l); setPage(1); }}
            />
        </div>
    );
}
