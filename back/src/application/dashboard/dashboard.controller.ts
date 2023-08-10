import { Controller, Get, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardViewModel } from './view-model/dashboard-view-model';
import { RequestInterface } from '../auth/interfaces';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('totalOrdersDelivered')
  async totalOrdersDelivered(@Request() req: RequestInterface) {
    return await this.dashboardService.allDeliveredOrders(
      req.user.condominiumId,
    );
  }

  @Get('totalResidents')
  async totalResidents(@Request() req: RequestInterface) {
    return await this.dashboardService.totalResidents(req.user.condominiumId);
  }

  @Get('totalOrdersPending')
  async totalOrdersPending(@Request() req: RequestInterface) {
    return await this.dashboardService.totalOrdersPending(
      req.user.condominiumId,
    );
  }

  @Get('listOrdersByStatus')
  async listOrdersByStatus(@Request() req: RequestInterface) {
    const list = await this.dashboardService.listOrdersByStatus(
      req.user.condominiumId,
    );
    return list.map(DashboardViewModel.toHttp);
  }

  @Get('listOrdersByMonths')
  async listOrdersByMonths(@Request() req: RequestInterface) {
    const ordersByMonth = await this.dashboardService.totalOrdersByMonths(
      req.user.condominiumId,
    );
    return DashboardViewModel.aggregateOrdersByMonth(ordersByMonth);
  }

  @Get('listOrdersByCondominium')
  async listOrdersByCondominium() {
    const ordersByCondominium =
      await this.dashboardService.listOrdersByCondominium();
    return DashboardViewModel.aggregateOrdersByCondominium(ordersByCondominium);
  }
}
