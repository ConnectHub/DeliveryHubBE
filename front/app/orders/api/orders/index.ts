import { Order } from "../../components/columns"

export async function getOrders(): Promise<Order[]> {
  const order = await fetch("http://localhost:3002/api/order/list/recipient", {
    cache: "no-store",
  })
  if (!order.ok) throw new Error("Error fetching data")
  return await order.json()
}

export async function createOrder(userId: string) {
  return await fetch("http://localhost:3002/api/order/create", {
    method: "POST",
    body: JSON.stringify({ addresseeId: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
