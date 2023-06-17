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
    await this.notificationService.sendOrderNotification(
      newOrder.url,
      newOrder.addressee.phoneNumber,
    );
    return newOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }

  @Post('update/status')
  async update(@Body() order: UpdateOrderDto) {
    const { status, orderId } = order;
    return await this.orderService.updateOrderStatus(orderId, status);
  }
}
