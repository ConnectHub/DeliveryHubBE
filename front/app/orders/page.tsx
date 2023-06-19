"use client"

import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTrigger, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import DataTableServerSide from './datatable'

export default async function OrderPage() {
  const form = useForm();
  
  function onSubmit() {
    console.log(1);
  }

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTableServerSide />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog>
        <DialogTrigger asChild>
          <div className="container flex items-end justify-end">
            <Button variant="outline">Adicionar novo pedido</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo pedido</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo e adicione um novo pedido.
            </DialogDescription>
          </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Usuário
                </Label>
                <Select>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione um usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Usuários</SelectLabel>
                      <SelectItem value="1">Fenicius</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Adicionar novo pedido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </form>
      </Form>
    </div>
  )
}
