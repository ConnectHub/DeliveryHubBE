import { INestApplication } from '@nestjs/common';
import { OrderModule } from '../order.module';
import { OrderService } from '../order.service';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { Order } from '@/domain/entities/order';
import { OrderNotFound } from '../errors/order-not-found';

describe('Order (e2e)', () => {
  let app: INestApplication;
  const orderService = {
    findOrderById: (id: string) => {
      const order = {
        id: '1234',
        url: 'http://test.com',
        code: '0000',
        status: 'PENDING',
        sender: 'Sender',
      } as Order;

      if (id !== order.id) throw new OrderNotFound();
      return order;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrderModule],
    })
      .overrideProvider(OrderService)
      .useValue(orderService)
      .compile();

    app = moduleRef.createNestApplication();
    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.$connect();
    await app.init();
  });

  describe('/GET order/:id', () => {});

  afterAll(async () => {
    await app.close();
    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.$disconnect();
  });
});
