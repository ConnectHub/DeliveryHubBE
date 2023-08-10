import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';
import { ChartDataInterface } from './interfaces';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async allDeliveredOrders(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.allDeliveredOrders(condominiumId);
  }

  async totalResidents(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.totalResidents(condominiumId);
  }

  async totalOrdersPending(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.totalOrdersPending(condominiumId);
  }

  async listOrdersByStatus(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    return await this.dashboardRepository.listOrdersByStatus(condominiumId);
  }

  async totalOrdersByMonths(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    return await this.dashboardRepository.totalOrdersByMonths(condominiumId);
  }

  async listOrdersByCondominium(): Promise<ChartDataInterface[]> {
    return await this.dashboardRepository.listOrdersByCondominium();
  }
}
