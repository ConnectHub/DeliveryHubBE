import { DataTable } from "@/components/ui/data-table"

import { getResidents } from "../api/residents"
import { columns } from "./columns"

export default async function DataTableServerSide() {
  const data = await getResidents()

  return <DataTable columns={columns} data={data} />
}
