import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationService } from '../notification/notification.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.orderService.findOrderById(id);
  }

  @Post('create')
  async create(@Body() order: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(order);
    const userNumber = '5581989982133@c.us';
    await this.notificationService.sendNotification(
      `Seu produto chegou! acesse o link: https://www.localhost.com/${newOrder.url} para aceitar a entrega!`,
      userNumber,
    );
    return newOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }

  @Post('update/status')
  async update(@Body() order: UpdateOrderDto) {
    const { status } = order;
    return await this.orderService.updateOrderStatus(status);
  }
}
