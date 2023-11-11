import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@/infra/prisma/prisma.module';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { DashboardRepository } from '../repository/dashboard.repository';
import { RequestInterface } from '@/application/auth/interfaces';
import { ChartDataInterface } from '../interfaces';
import { DashboardViewModel } from '../view-model/dashboard-view-model';
import { CondominiumRepository } from '@/application/condominium/repository/condominium.repository';

describe('dashboardController', () => {
  let dashboardService: DashboardService;
  let dashboardController: DashboardController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [DashboardController],
      providers: [DashboardService, DashboardRepository, CondominiumRepository],
      exports: [DashboardService],
    }).compile();

    dashboardService = module.get<DashboardService>(DashboardService);
    dashboardController = module.get<DashboardController>(DashboardController);
  });

  describe('totalOrdersDelivered', () => {
    it('should return total orders delivered', async () => {
      const mockRequest = {
        user: {
          condominiumId: '123456',
        },
      } as RequestInterface;
      const mockTotalOrdersDelivered = 10;
      jest
        .spyOn(dashboardService, 'allDeliveredOrders')
        .mockResolvedValue(mockTotalOrdersDelivered);

      const result = await dashboardController.totalOrdersDelivered(
        mockRequest,
      );
      expect(result).toEqual(mockTotalOrdersDelivered);
      expect(dashboardService.allDeliveredOrders).toHaveBeenCalledWith(
        mockRequest.user.condominiumId,
      );
      expect(dashboardService.allDeliveredOrders).toHaveBeenCalledTimes(1);
    });
  });
  describe('totalResidents', () => {
    it('should return  total residents', async () => {
      const mockRequest = {
        user: {
          condominiumId: '123456',
        },
      } as RequestInterface;
      const mockTotalResidentes = 12;

      jest
        .spyOn(dashboardService, 'totalResidents')
        .mockResolvedValue(mockTotalResidentes);

      const result = await dashboardController.totalResidents(mockRequest);

      expect(result).toEqual(mockTotalResidentes);
      expect(dashboardService.totalResidents).toHaveBeenCalledWith(
        mockRequest.user.condominiumId,
      );
      expect(dashboardService.totalResidents).toHaveBeenCalledTimes(1);
    });
  });
  describe('totalOrdersPending', () => {
    it('should return total orders pending', async () => {
      const mockRequest = {
        user: { condominiumId: '12345' },
      } as RequestInterface;

      const mockTotalOrdersPending = 4;

      jest
        .spyOn(dashboardService, 'totalOrdersPending')
        .mockResolvedValue(mockTotalOrdersPending);

      const result = await dashboardController.totalOrdersPending(mockRequest);

      expect(result).toEqual(mockTotalOrdersPending);
      expect(dashboardService.totalOrdersPending).toHaveBeenCalledWith(
        mockRequest.user.condominiumId,
      );
      expect(dashboardService.totalOrdersPending).toHaveBeenCalledTimes(1);
    });
  });
  describe('listOrdersByStatus', () => {
    it('should return orders grouped by status', async () => {
      const mockRequest = {
        user: { condominiumId: '12345' },
      } as RequestInterface;

      const mockTotalOrdersByStatus = [
        {
          status: 'PENDING',
          orderCount: 3,
        },
        {
          status: 'DELIVERED',
          orderCount: 4,
        },
        {
          status: 'CANCELED',
          orderCount: 1,
        },
      ] as ChartDataInterface[];

      const formattedTotalOrderByStatus = mockTotalOrdersByStatus.map(
        DashboardViewModel.toHttp,
      );
      jest
        .spyOn(dashboardService, 'listOrdersByStatus')
        .mockResolvedValue(mockTotalOrdersByStatus);

      const result = await dashboardController.listOrdersByStatus(mockRequest);

      expect(result).toEqual(formattedTotalOrderByStatus);
      expect(dashboardService.listOrdersByStatus).toHaveBeenCalledWith(
        mockRequest.user.condominiumId,
      );
      expect(dashboardService.listOrdersByStatus).toHaveBeenCalledTimes(1);
    });
  });
  describe('listOrdersByMonths', () => {
    it('should return orders grouped by months', async () => {
      const mockRequest = {
        user: { condominiumId: '12345' },
      } as RequestInterface;

      const mockTotalOrdersByMonths = [
        {
          month: 'Janeiro',
          orderCount: 3,
        },
        {
          month: 'Fevereiro',
          orderCount: 4,
        },
        {
          month: 'Março',
          orderCount: 2,
        },
        {
          month: 'Abril',
          orderCount: 0,
        },
        {
          month: 'Maio',
          orderCount: 6,
        },
        {
          month: 'Junho',
          orderCount: 4,
        },
        {
          month: 'Julho',
          orderCount: 10,
        },
        {
          month: 'Agosto',
          orderCount: 2,
        },
        {
          month: 'Setembro',
          orderCount: 8,
        },
        {
          month: 'Outubro',
          orderCount: 9,
        },
        {
          month: 'Novembro',
          orderCount: 1,
        },
        {
          month: 'Dezembro',
          orderCount: 10,
        },
      ] as ChartDataInterface[];

      const formattedTotalOrdersByMonths = mockTotalOrdersByMonths.map(
        DashboardViewModel.toHttp,
      );

      jest
        .spyOn(dashboardService, 'totalOrdersByMonths')
        .mockResolvedValue(mockTotalOrdersByMonths);

      const result = await dashboardController.listOrdersByMonths(mockRequest);

      expect(result).toEqual(formattedTotalOrdersByMonths);
      expect(dashboardService.totalOrdersByMonths).toHaveBeenCalledWith(
        mockRequest.user.condominiumId,
      );
      expect(dashboardService.totalOrdersByMonths).toHaveBeenCalledTimes(1);
    });
  });
  describe('listOrdersByCondominium', () => {
    it('should return orders grouped by condominium', async () => {
      const mockTotalOrdersByCondominium = [
        {
          condominiumName: 'Condomínio 1',
          value: 3,
        },
        {
          condominiumName: 'Condomínio 2',
          value: 4,
        },
        {
          condominiumName: 'Condomínio 3',
          value: 2,
        },
        {
          condominiumName: 'Condomínio 4',
          value: 0,
        },
        {
          condominiumName: 'Condomínio 5',
          value: 6,
        },
      ];

      jest
        .spyOn(dashboardService, 'listOrdersByCondominium')
        .mockResolvedValue(mockTotalOrdersByCondominium);

      const result = await dashboardController.listOrdersByCondominium();

      expect(result).toEqual(mockTotalOrdersByCondominium);
      expect(dashboardService.listOrdersByCondominium).toHaveBeenCalledTimes(1);
    });
  });
});
