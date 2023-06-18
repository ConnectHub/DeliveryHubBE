import axios from "axios"
import { Resident, columns } from "./columns"
import { DataTable } from "../../components/ui/data-table"

async function getData(): Promise<Resident[]> {
  const residents =  await axios.get("http://localhost:3000/api/resident/list");
  return residents.data;
}

export default async function Resident() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
