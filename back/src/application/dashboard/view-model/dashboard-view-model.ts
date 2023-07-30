import { ChartDataInterface } from '../interfaces';

export class DashboardViewModel {
  static aggregateOrdersByMonth(orders: ChartDataInterface[]) {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const ordersByMonthMap = new Map<string, number>();

    orders.forEach((order) => {
      const orderDate = new Date(order.receiptDateHour);
      const orderMonth = monthNames[orderDate.getMonth()];
      const count = ordersByMonthMap.get(orderMonth) || 0;
      ordersByMonthMap.set(orderMonth, count + 1);
    });

    const ordersGroupedByMonth: ChartDataInterface[] = [];

    ordersByMonthMap.forEach((count, month) => {
      ordersGroupedByMonth.push({ month, orderCount: count });
    });

    return ordersGroupedByMonth;
  }
}
