import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/entities/order';
import { OrderRepository } from './repository/order.repository';
import { Status } from '@prisma/client';
import { OrderNotFound } from './errors/order-not-found';
import { RandomStringGenerator } from './helpers/generate-random-string';
import { OrderAlreadyBeenDelivered } from './errors/order-already-been-delivered';
import { S3 } from 'aws-sdk';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFound();
    return order;
  }

  async createOrder(order: Order): Promise<Order> {
    order.code = new RandomStringGenerator().generate(6);
    return await this.orderRepository.create(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFound();
    await this.orderRepository.delete(id);
  }

  async acceptOrder(
    code: string,
    url: string,
    file: Express.Multer.File,
  ): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    if (order.status === Status.DELIVERED)
      throw new OrderAlreadyBeenDelivered();
    if (order.code !== code) throw new OrderNotFound();
    const [signOrder] = await Promise.all([
      this.orderRepository.updateStatus(url),
      this.uploadSign(file),
    ]);
    return signOrder;
  }

  async findOrders(): Promise<Order[]> {
    return await this.orderRepository.findOrders();
  }

  async findByUrl(url: string): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    return order;
  }

  private fileName(file: Express.Multer.File): string {
    const [name, extension] = file.originalname.split('.');
    const now = Date.now();
    return `${name}-${now}.${extension}`;
  }

  async uploadSign(file: Express.Multer.File) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.fileName(file),
        Body: file.buffer,
      })
      .promise();
  }
}
