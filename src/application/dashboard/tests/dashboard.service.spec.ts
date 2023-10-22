import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { DashboardRepository } from '../repository/dashboard.repository';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let dashboardRepository: DashboardRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [DashboardController],
      providers: [DashboardService, DashboardRepository],
      exports: [DashboardService],
    }).compile();

    dashboardService = module.get<DashboardService>(DashboardService);
    dashboardRepository = module.get<DashboardRepository>(DashboardRepository);
  });
  describe('allDeliveredOrders', () => {
    it('should return total orders delivered', async () => {
      const mockCondId = '123456';
      const mockTotalOrdersDelivered = 10;
      jest
        .spyOn(dashboardRepository, 'allDeliveredOrders')
        .mockResolvedValue(mockTotalOrdersDelivered);

      const result = await dashboardService.allDeliveredOrders(mockCondId);
      expect(result).toEqual(mockTotalOrdersDelivered);
      expect(dashboardRepository.allDeliveredOrders).toHaveBeenCalledWith(
        mockCondId,
      );
      expect(dashboardRepository.allDeliveredOrders).toHaveBeenCalledTimes(1);
    });
  });
  describe('totalResidents', () => {
    it('should return total of residents ', async () => {
      const mockCondId = '123456';
      const mockTotalResidents = 34;
      jest
        .spyOn(dashboardRepository, 'totalResidents')
        .mockResolvedValue(mockTotalResidents);

      const result = await dashboardService.totalResidents(mockCondId);
      expect(result).toEqual(mockTotalResidents);
      expect(dashboardRepository.allDeliveredOrders).toHaveBeenCalledWith(
        mockCondId,
      );
      expect(dashboardRepository.allDeliveredOrders).toHaveBeenCalledTimes(1);
    });
  });
  describe('totalOrdersPending', () => {
    it('should return total orders pending', async () => {
      const mockCondId = '123456';
      const mockTotalOrdersPending = 5;
      jest
        .spyOn(dashboardRepository, 'totalOrdersPending')
        .mockResolvedValue(mockTotalOrdersPending);

      const result = await dashboardService.totalOrdersPending(mockCondId);
      expect(result).toEqual(mockTotalOrdersPending);
      expect(dashboardRepository.totalOrdersPending).toHaveBeenCalledWith(
        mockCondId,
      );
      expect(dashboardRepository.totalOrdersPending).toHaveBeenCalledTimes(1);
    });
  });
  describe('listOrdersByStatus', () => {
    it('should return list of orders by status', async () => {
      const mockCondId = '12345';
      const mockListOrdersByStatus = [
        {
          status: 'pending',
          orderCount: 4,
        },
        {
          status: 'delivered',
          orderCount: 5,
        },
        {
          status: 'canceled',
          orderCount: 2,
        },
      ];
      jest
        .spyOn(dashboardRepository, 'listOrdersByStatus')
        .mockResolvedValue(mockListOrdersByStatus);

      const result = await dashboardService.listOrdersByStatus(mockCondId);

      expect(result).toEqual(mockListOrdersByStatus);
      expect(dashboardRepository.listOrdersByStatus).toHaveBeenCalledWith(
        mockCondId,
      );
      expect(dashboardRepository.listOrdersByStatus).toHaveBeenCalledTimes(1);
    });
  });
});
