import { z } from "zod"
import { FormSchema } from "@/app/residents/page"
import { Resident } from "../../components/columns"

export async function getResidents(): Promise<Resident[]> {
  const residents = await fetch("http://localhost:3002/api/resident/list", {
    cache: "no-store",
  })
  if (!residents.ok) throw new Error("Error fetching data")
  return await residents.json()
}

export async function createResident(resident: z.infer<typeof FormSchema>) {
  return await fetch("http://localhost:3002/api/resident/create", {
    method: "POST",
    body: JSON.stringify({ resident }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })
}