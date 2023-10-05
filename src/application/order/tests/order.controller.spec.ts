import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../../../domain/entities/order';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UploadModule } from '../../upload/upload.module';
import { NotificationModule } from '../../notification/notification.module';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, OrderRepository, PrismaService],
      imports: [NotificationModule, UploadModule],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderController = module.get<OrderController>(OrderController);
  });

  describe('findById', () => {
    it('should return an order', async () => {
      const orderId = '123';
      const mockOrder = { id: orderId } as Order;

      jest.spyOn(orderService, 'findOrderById').mockResolvedValue(mockOrder);

      const result = await orderController.findById(orderId);

      expect(result).toBe(mockOrder);
      expect(orderService.findOrderById).toHaveBeenCalledWith(orderId);
    });
  });
});
