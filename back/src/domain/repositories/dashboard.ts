import { ChartDataInterface } from 'src/application/dashboard/interfaces';

export interface DashboardRepositoryInterface {
  allDeliveredOrders(): Promise<number>;
  totalResidents(): Promise<number>;
  totalOrdersPending(): Promise<number>;
  listOrdersByStatus(): Promise<ChartDataInterface[]>;
  totalOrdersByMonths(): Promise<ChartDataInterface[]>;
}
