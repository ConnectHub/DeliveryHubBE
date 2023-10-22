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
});
