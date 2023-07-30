import { Injectable } from '@nestjs/common';
import { DashboardRepositoryInterface } from 'src/domain/repositories/dashboard';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class DashboardRepository implements DashboardRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async allDeliveredOrders(): Promise<any> {
    return 'QUANTIDADE DE TODAS AS ORDENS ENTREGUES';
  }
  async totalResidents(): Promise<any> {
    return 'QUANTIDADE DE TODOS OS RESIDENTES';
  }
  async totalOrdersPending(): Promise<any> {
    return 'QUANTIDADE DE TODAS AS ORDENS PENDENTES';
  }
  async listOrdersByStatus(): Promise<any> {
    return 'LISTA DE ORDENS POR STATUS';
  }
  async totalOrdersByMonths(): Promise<any> {
    return 'QUANTIDADE DE ORDENS POR MES';
  }
}
