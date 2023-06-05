import { Order, Status } from '../entities/order';

export interface OrderRepositoryInterface {
  findById(id: string): Promise<Order | null>;
  findByRecipient(recipient: string): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(status: Status): Promise<Order>;
  delete(id: string): Promise<void>;
}
