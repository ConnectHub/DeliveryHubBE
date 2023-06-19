
import { DataTable } from "../../components/ui/data-table"
import { Resident, columns } from "./columns"

async function getData(): Promise<Resident[]> {
  const residents = await fetch("http://localhost:3002/api/resident/list")
  return await residents.json()
}

export default async function ResidentPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
