import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { DashboardRepository } from '../repository/dashboard.repository';
import { ChartDataInterface } from '../interfaces';
import { MonthNames } from 'src/infra/utils/format-month';
import { listOrdersByMonth } from '../utils/list-of-order-by-month';
import { CondominiumRepository } from 'src/application/condominium/repository/condominium.repository';
import { Condominium } from 'src/domain/entities/condominium';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let dashboardRepository: DashboardRepository;
  let condominiumRepository: CondominiumRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [DashboardController],
      providers: [DashboardService, DashboardRepository, CondominiumRepository],
      exports: [DashboardService],
    }).compile();

    dashboardService = module.get<DashboardService>(DashboardService);
    dashboardRepository = module.get<DashboardRepository>(DashboardRepository);
    condominiumRepository = module.get<CondominiumRepository>(
      CondominiumRepository,
    );
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
  describe('totalOrdersByMonths', () => {
    it('should return a list of orders by month', async () => {
      const mockId = '12345';

      const mockOrdersByMonth: ChartDataInterface[] = [
        {
          receiptDateHour: new Date('2023-05-25T16:26:39.421Z'),
        },
        {
          receiptDateHour: new Date('2023-07-25T16:26:37.283Z'),
        },
        {
          receiptDateHour: new Date('2023-07-25T16:26:38.005Z'),
        },
        {
          receiptDateHour: new Date('2023-09-25T16:26:35.502Z'),
        },
        {
          receiptDateHour: new Date('2023-10-25T16:26:38.739Z'),
        },
        {
          receiptDateHour: new Date('2023-10-25T16:26:40.527Z'),
        },
        {
          receiptDateHour: new Date('2023-11-25T16:26:36.460Z'),
        },
      ];

      jest
        .spyOn(dashboardRepository, 'totalOrdersByMonths')
        .mockResolvedValue(mockOrdersByMonth);

      const result = await dashboardService.totalOrdersByMonths(mockId);

      mockOrdersByMonth.forEach((order) => {
        const orderDate = new Date(order.receiptDateHour).getMonth();
        order.month = MonthNames.format(orderDate);

        listOrdersByMonth.map((item) => {
          if (item.month === order.month) {
            item.orderCount++;
          }
        });
      });

      expect(result).toEqual(listOrdersByMonth);
      expect(dashboardRepository.totalOrdersByMonths).toHaveBeenCalledWith(
        mockId,
      );
      expect(dashboardRepository.totalOrdersByMonths).toHaveBeenCalledTimes(1);
    });
  });
  describe('listOrdersByCondominium', () => {
    it('should return a list of orders by condominium', async () => {
      const mockCondOne = { name: 'Condominium 1', id: '1234' } as Condominium;
      const mockCondTwo = { name: 'Condominium 2', id: '5678' } as Condominium;
      const mockOrderByCondominium: ChartDataInterface[] = [
        {
          condominiumId: mockCondOne.id,
          orderCount: 2,
        },
        {
          condominiumId: mockCondTwo.id,
          orderCount: 4,
        },
      ];

      jest
        .spyOn(condominiumRepository, 'findById')
        .mockResolvedValueOnce(mockCondOne)
        .mockResolvedValue(mockCondTwo);

      jest
        .spyOn(dashboardRepository, 'listOrdersByCondominium')
        .mockResolvedValue(mockOrderByCondominium);

      const result = await dashboardService.listOrdersByCondominium();

      expect(result).toEqual(mockOrderByCondominium);
      expect(dashboardRepository.listOrdersByCondominium).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
