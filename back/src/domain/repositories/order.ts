import { Status } from '@prisma/client';
import { Order } from '../entities/order';
import { ChartDataDTO } from 'src/application/order/dto/chart-data-order.dto';

export interface OrderRepositoryInterface {
  findById(id: string): Promise<Order | null>;
  findByRecipient(status: Status): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  updateStatus(id: string, status: Status): Promise<Order>;
  delete(id: string): Promise<void>;
  getTotalByStatus(id: string): Promise<ChartDataDTO[]>;
}
