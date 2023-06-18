import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderViewModel } from './view-model/order-view-model';

@Controller('order')
export class OrderController {
  constructor(
    @InjectQueue('notification') private notificationQueue: Queue,
    private readonly orderService: OrderService,
  ) {}

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.orderService.findOrderById(id);
  }

  @Get('list/recipient')
  async findByRecipient() {
    const orders = await this.orderService.findOrders();
    return orders.map(OrderViewModel.toHttp);
  }

  @Post('create')
  async create(@Body() order: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(order);
    await this.notificationQueue.add(
      'order.created',
      {
        orderId: newOrder.url,
        phoneNumber: newOrder.addressee.phoneNumber,
      },
      { delay: 5000, attempts: 3, removeOnComplete: true, removeOnFail: true },
    );
    return OrderViewModel.toHttp(newOrder);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.orderService.deleteOrder(id);
  }

  @Post('update/status')
  async update(@Body() order: UpdateOrderDto) {
    const { status, orderId } = order;
    return await this.orderService.updateOrderStatus(orderId, status);
  }
}
