import { Status } from '@prisma/client';
import { Order } from '../entities/order';

export interface OrderRepositoryInterface {
  findById(id: string): Promise<Order | null>;
  findByRecipient(status: Status): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  updateStatus(id: string, status: Status): Promise<Order>;
  delete(id: string): Promise<void>;
}
