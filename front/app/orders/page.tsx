"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
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
import { Form, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

import { createOrder } from "./api/orders"
import DataTableServerSide from "./components/data-table"
import SelectResidents from "./components/select"

const FormSchema = z.object({
  userId: z.string({
    required_error: "Please select an email to display.",
  }),
})

export default async function OrderPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    const { userId } = data
    const response = await createOrder(userId)
    if (!response.ok) throw new Error("Error creating order")
    document.getElementById("closeDialog")?.click()
  }

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTableServerSide />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="container flex items-end justify-end">
            <Button type="button" variant="outline">
              Adicionar novo pedido
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <SelectResidents onValueChange={field.onChange} />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Adicionar novo pedido crl</Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
