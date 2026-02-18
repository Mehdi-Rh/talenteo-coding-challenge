import * as React from "react";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AddEmployeeForm } from "./add-employee-form";


export function AddEmployeeButtonWithModal({ onEmployeeAdded }: { onEmployeeAdded?: () => void }) {
    const [open, setOpen] = React.useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onEmployeeAdded?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-8 duration-200 ease-linear flex items-center gap-2">
                    <IconCirclePlusFilled />
                    <span>Add employee</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>
                <AddEmployeeForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
