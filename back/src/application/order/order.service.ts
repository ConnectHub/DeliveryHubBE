import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/entities/order';
import { OrderRepository } from './repository/order.repository';
import { Status } from '@prisma/client';
import { OrderNotFound } from './errors/order-not-found';
import { RandomStringGenerator } from './helpers/generate-random-string';
import { OrderAlreadyBeenDelivered } from './errors/order-already-been-delivered';
import { S3 } from 'aws-sdk';
import { OrderCodesAreDifferent } from './errors/order-codes-are-different';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFound();
    return order;
  }

  async getTotalByStatus(condominiumId: string): Promise<[]> {
    return await this.orderRepository.getTotalByStatus(condominiumId);
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

  async acceptOrder(code: string, url: string, file: string): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    if (order.status === Status.DELIVERED)
      throw new OrderAlreadyBeenDelivered();
    if (order.code !== code) throw new OrderCodesAreDifferent();
    const uploadedFile = await this.uploadSign(file);
    return await this.orderRepository.updateStatus(url, uploadedFile);
  }

  async findOrders(condominiumId: string): Promise<Order[]> {
    return await this.orderRepository.findOrders(condominiumId);
  }

  async findByUrl(url: string): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    return order;
  }

  private imgToBuffer(file: string): Buffer {
    return Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  }

  private generateFileName(): string {
    return randomUUID() + '.png';
  }

  async uploadSign(file: string): Promise<string> {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      correctClockSkew: true,
    });
    const uploadedFile = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.generateFileName(),
        Body: this.imgToBuffer(file),
        ContentEncoding: 'base64',
        ContentType: 'image/png',
      })
      .promise();
    return uploadedFile.Location;
  }
}
