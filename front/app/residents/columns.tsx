"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type Resident = {
  id: string
  name: string
  email: string
  buildingApartment: string
  phoneNumber: string
  createdAt: string
}

export const columns: ColumnDef<Resident>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "buildingApartment",
    header: "Apartamento",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
  },
]
