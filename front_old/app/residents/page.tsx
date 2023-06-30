"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

import { createResident } from "./api/residents"
import DataTableServerSide from "./components/data-table"
import { Input } from "@/components/ui/input"

export const FormSchema = z.object({
  name: z.string({
    required_error: "COLOCA UM NOME.",
  }),
  condominiumId: z.string({
    required_error: "COLOCA O ID DO CONDOMINIO.",
  }),
  phoneNumber: z.string({
    required_error: "COLOCA O TELEFONE.",
  }),
  email: z.string({
    required_error: "COLOCA O EMAIL.",
  }),
  buildingApartment: z.string({
    required_error: "COLOCA O NÚMERO DO APARTAMENTO.",
  }),
})

export default async function ResidentPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await createResident(data)
    if (!response.ok) throw new Error("Error creating order")
    document.getElementById("closeDialog")?.click()
  }

  return (
    <div className="container mx-auto py-10">
      <DataTableServerSide />
      <Dialog>
        <DialogTrigger asChild>
          <div className="container flex items-end justify-end">
            <Button type="button" variant="outline">
              Cadastrar novo morador
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Cadastrar novo morador</DialogTitle>
                <DialogDescription>
                  AQUI VAI TER A DESCRIÇÃO DO QUE PRECISA FAZER
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">

                  <FormItem>
                    <FormLabel>Nome do morador</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do novo morador" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Email do morador</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                </div>
                <DialogFooter>
                  <Button type="submit">Cadastrar novo morador</Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
