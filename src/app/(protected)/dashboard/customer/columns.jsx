import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProductStore } from "@/store/useProductStore";
import { Checkbox } from "@/components/ui/checkbox";

function AlertDialogDelete() {
  return (
    <AlertDialog>
    
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center">
            Are you sure you want to delete this customer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}



export const columns = [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => row.original.name || "-",
  },
  {
    accessorKey: "email",
    header: "Customer Email",
    cell: ({ row }) => row.original.email || "-",
  },
  {
   id: "actions2",
    header: "Action2",
    cell: ({ row }) => {
      return (
        <>
        
          <AlertDialogDelete>
            weffew
          {/* <Trash2 className="w-5 cursor-pointer" /> */}
        </AlertDialogDelete>
        </>
      );
    },
  },
  {
    accessorKey: "Customer Location",
    header: "location",
    cell: ({ row }) => row.original.location || "-",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata", // optional, for IST
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/product/create/${product._id}`}>
            <Edit className="w-5" />
          </Link>
          <AlertDialogDelete productId={product._id}>
            <Trash2 className="w-5 cursor-pointer" />
          </AlertDialogDelete>
        </div>
      );
    },
  },
];
