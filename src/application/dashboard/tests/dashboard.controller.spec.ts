import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { DashboardRepository } from '../repository/dashboard.repository';
import { RequestInterface } from 'src/application/auth/interfaces';

describe('dashboardController', () => {
  let dashboardService: DashboardService;
  let dashboardController: DashboardController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [DashboardController],
      providers: [DashboardService, DashboardRepository],
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
});
