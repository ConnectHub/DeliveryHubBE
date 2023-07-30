import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async allDeliveredOrders() {
    return await this.dashboardRepository.allDeliveredOrders();
  }

  async totalResidents() {
    return await this.dashboardRepository.totalResidents();
  }

  async totalOrdersPending() {
    return await this.dashboardRepository.totalOrdersPending();
  }

  async listOrdersByStatus() {
    return await this.dashboardRepository.listOrdersByStatus();
  }

  async totalOrdersByMonths() {
    return await this.dashboardRepository.totalOrdersByMonths();
  }
}
