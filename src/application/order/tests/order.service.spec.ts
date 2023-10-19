import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { OrderRepository } from '../repository/order.repository';
import { OrderNotFound } from '../errors/order-not-found';
import { OrderAlreadyBeenDelivered } from '../errors/order-already-been-delivered';
import { OrderCodesAreDifferent } from '../errors/order-codes-are-different';
import { Order } from '../../../domain/entities/order';
import { Status } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RandomStringGenerator } from '../helpers/generate-random-string';
import { NotificationModule } from '../../notification/notification.module';
import { UploadModule } from '../../upload/upload.module';
import { UploadService } from 'src/application/upload/upload.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;
  let uploadService: UploadService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, OrderRepository, PrismaService, UploadService],
      imports: [NotificationModule, UploadModule],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    uploadService = module.get<UploadService>(UploadService);
  });

  describe('findOrderById', () => {
    it('should find an order by ID', async () => {
      const orderId = '123';
      const mockOrder = { id: orderId } as Order;
      jest.spyOn(orderRepository, 'findById').mockResolvedValue(mockOrder);

      const result = await orderService.findOrderById(orderId);

      expect(result).toBe(mockOrder);
      expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
    });

    it('should throw OrderNotFound error if order is not found', async () => {
      const orderId = '123';
      jest.spyOn(orderRepository, 'findById').mockResolvedValue(undefined);

      await expect(orderService.findOrderById(orderId)).rejects.toThrow(
        OrderNotFound,
      );
      expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
    });
  });

  describe('createOrder', () => {
    jest.mock('../helpers/generate-random-string');
    it('should create a new order', async () => {
      const mockOrder: Order = {
        id: '123',
        code: 'ABC123',
        sender: 'Sender Name',
        addresseeId: '456',
      };
      const generatedCode = 'ABC123';

      const generateMock = jest.fn().mockReturnValue(generatedCode);
      RandomStringGenerator.prototype.generate = generateMock;

      jest.spyOn(orderRepository, 'create').mockResolvedValue(mockOrder);

      const result = await orderService.createOrder(mockOrder);

      expect(result).toBe(mockOrder);
      expect(generateMock).toHaveBeenCalledWith(6);
      expect(orderRepository.create).toHaveBeenCalledWith(mockOrder);
      expect(generateMock).toHaveBeenCalledTimes(1);
      expect(orderRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an existing order', async () => {
      const orderId = '123';
      const mockOrder = { id: orderId } as Order;
      jest.spyOn(orderRepository, 'findById').mockResolvedValue(mockOrder);
      jest.spyOn(orderRepository, 'delete').mockResolvedValue(undefined);

      await orderService.deleteOrder(orderId);

      expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
      expect(orderRepository.delete).toHaveBeenCalledWith(orderId);
    });

    it('should throw OrderNotFound error if order is not found', async () => {
      const orderId = '123';
      jest.spyOn(orderRepository, 'findById').mockResolvedValue(undefined);

      await expect(orderService.deleteOrder(orderId)).rejects.toThrow(
        OrderNotFound,
      );
      expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
    });
  });

  describe('acceptOrder', () => {
    const mockOrder = {
      status: Status.PENDING,
      code: 'ABC123',
    } as Order;

    beforeEach(() => {
      jest.spyOn(orderRepository, 'findByUrl').mockResolvedValue(mockOrder);
    });

    it('should accept an order', async () => {
      const code = 'ABC123';
      const url = 'https://example.com/order';
      const file = `https://tsttst.s3.amazonaws.com/example.png`;

      const updatedOrder = { ...mockOrder, status: Status.DELIVERED };

      jest.spyOn(uploadService, 'uploadSign').mockResolvedValue(file);
      jest
        .spyOn(orderRepository, 'updateStatus')
        .mockResolvedValue(updatedOrder);

      const result = await orderService.acceptOrder(code, url, file);

      expect(result).toBe(updatedOrder);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
      expect(orderRepository.updateStatus).toHaveBeenCalledWith(
        url,
        expect.stringMatching(
          /^https:\/\/tsttst\.s3\.amazonaws\.com\/.*\.png$/,
        ),
      );
    });

    it('should throw OrderNotFound error if order is not found', async () => {
      const code = 'ABC123';
      const url = 'https://example.com/order';
      jest.spyOn(orderRepository, 'findByUrl').mockResolvedValue(undefined);

      await expect(
        orderService.acceptOrder(code, url, 'base64encodedimage'),
      ).rejects.toThrow(OrderNotFound);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
    });

    it('should throw OrderAlreadyBeenDelivered error if order has already been delivered', async () => {
      const code = 'ABC123';
      const url = 'https://example.com/order';
      const deliveredOrder = { ...mockOrder, status: Status.DELIVERED };
      jest
        .spyOn(orderRepository, 'findByUrl')
        .mockResolvedValue(deliveredOrder);

      await expect(
        orderService.acceptOrder(code, url, 'base64encodedimage'),
      ).rejects.toThrow(OrderAlreadyBeenDelivered);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
    });

    it('should throw OrderCodesAreDifferent error if order code is different', async () => {
      const code = 'XYZ789';
      const url = 'https://example.com/order';
      jest.spyOn(orderRepository, 'findByUrl').mockResolvedValue(mockOrder);

      await expect(
        orderService.acceptOrder(code, url, 'base64encodedimage'),
      ).rejects.toThrow(OrderCodesAreDifferent);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
    });
  });

  describe('findOrders', () => {
    // it.skip('should find all orders', async () => {
    //   const mockOrders = [{ id: '1' }, { id: '2' }] as Order[];
    //   jest.spyOn(orderRepository, 'findOrders').mockResolvedValue(mockOrders);
    //   const result = await orderService.findOrders();
    //   expect(result).toBe(mockOrders);
    //   expect(orderRepository.findOrders).toHaveBeenCalled();
    // });
  });

  describe('findByUrl', () => {
    it('should find an order by URL', async () => {
      const url = 'https://example.com/clndgmyd50003tdko9q2eeq1a';
      const mockOrder = { url } as Order;
      jest.spyOn(orderRepository, 'findByUrl').mockResolvedValue(mockOrder);

      const result = await orderService.findByUrl(url);

      expect(result).toBe(mockOrder);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
    });

    it('should throw OrderNotFound error if order is not found', async () => {
      const url = 'https://example.com/clndgmyd50003tdko9q2eeq1a';
      jest.spyOn(orderRepository, 'findByUrl').mockResolvedValue(undefined);

      await expect(orderService.findByUrl(url)).rejects.toThrow(OrderNotFound);
      expect(orderRepository.findByUrl).toHaveBeenCalledWith(url);
    });
  });
});
