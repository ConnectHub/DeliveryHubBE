import { DataTable } from "@/components/ui/data-table"

import { getOrders } from "../api/orders"
import { columns } from "./columns"

export default async function DataTableServerSide() {
  const data = await getOrders()

  return <DataTable columns={columns} data={data} />
}
