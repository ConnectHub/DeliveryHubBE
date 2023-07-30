import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('totalOrdersDelivered')
  async totalOrdersDelivered() {
    return this.dashboardService.allDeliveredOrders();
  }

  @Get('totalResidents')
  async totalResidents() {
    return this.dashboardService.totalResidents();
  }

  @Get('totalOrdersPending')
  async totalOrdersPending() {
    return this.dashboardService.totalOrdersPending();
  }

  @Get('listOrdersByStatus')
  async listOrdersByStatus() {
    return this.dashboardService.listOrdersByStatus();
  }

  @Get('totalOrdersByMonths')
  async totalOrdersByMonths() {
    return this.dashboardService.totalOrdersByMonths();
  }
}
