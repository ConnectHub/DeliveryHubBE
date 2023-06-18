import axios from "axios"
import { Order, columns } from "./columns"
import { DataTable } from "../../components/ui/data-table"

async function getData(): Promise<Order[]> {
  const order =  await axios.get("http://localhost:3000/api/order/list/recipient");
  return order.data;
}

export default async function OrderPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
