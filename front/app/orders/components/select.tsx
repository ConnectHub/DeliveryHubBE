"use client"

import { Select } from "@radix-ui/react-select"
import { useQuery } from "react-query"
import useSWR from "swr"

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Order } from "./columns"

async function fetcher(): Promise<Order[]> {
  const order = await fetch("http://localhost:3002/api/resident/list")
  if (!order.ok) throw new Error("Error fetching data")
  return await order.json()
}

interface SelectResidentsProps {
  onValueChange: (value: string) => void
}

export default function SelectResidents({
  onValueChange,
}: SelectResidentsProps) {
  const { data, isLoading } = useQuery("order", fetcher)

  if (isLoading) return <div>Carregando...</div>

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Selecione um usuário" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Usuários</SelectLabel>
          {data?.map((resident) => (
            <SelectItem key={resident.name} value={resident.id}>
              {resident.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
