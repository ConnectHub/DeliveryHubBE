import { DataTable } from "@/components/ui/data-table";
import { Order, columns } from "./columns"

async function getData(): Promise<Order[]> {
  const order = await fetch(
    "http://localhost:3002/api/order/list/recipient"
  );
  return await order.json();
}

export default async function DataTableServerSide() {
  const data = await getData();

  return (
    <DataTable columns={columns} data={data} />
  )
}