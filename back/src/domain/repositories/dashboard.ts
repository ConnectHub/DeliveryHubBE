import { ChartDataInterface } from 'src/application/dashboard/interfaces';

export interface DashboardRepositoryInterface {
  allDeliveredOrders(id: string): Promise<number>;
  totalResidents(id: string): Promise<number>;
  totalOrdersPending(id: string): Promise<number>;
  listOrdersByStatus(id: string): Promise<ChartDataInterface[]>;
  totalOrdersByMonths(id: string): Promise<ChartDataInterface[]>;
  listOrdersByCondominium(): Promise<ChartDataInterface[]>;
}
