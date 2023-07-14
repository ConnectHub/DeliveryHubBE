import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderViewModel } from './view-model/order-view-model';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { RequestI } from '../auth/interfaces';
import { NotificationService } from '../notification/notification.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiOkResponse({ type: OrderViewModel })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.orderService.findOrderById(id);
  }

  @ApiOkResponse({ type: [OrderViewModel] })
  @Get('list/recipient')
  async findByRecipient(@Request() req: RequestI) {
    const orders = await this.orderService.findOrders(req.sub);
    return orders.map(OrderViewModel.toHttp);
  }

  @ApiCreatedResponse({ type: OrderViewModel })
  @Post('create')
  async create(@Body() order: CreateOrderDto) {
    const { imgSrc, ...rest } = order;
    const newOrder = await this.orderService.createOrder({
      ...rest,
      img: order.imgSrc,
    });
    await this.notificationService.addNotificationQueue(newOrder);
    return OrderViewModel.toHttp(newOrder);
  }

  @Post('sendNotification/:id')
  async sendNotification(@Param('id', ParseUUIDPipe) orderId: string) {
    const newOrder = await this.orderService.findOrderById(orderId);
    await this.notificationService.addNotificationQueue(newOrder);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.orderService.deleteOrder(id);
  }

  @Public()
  @ApiOkResponse({ type: OrderViewModel })
  @Post('accept')
  async accept(@Body() order: UpdateOrderDto) {
    const { code, url, signature: file } = order;
    const prevOrder = await this.orderService.acceptOrder(code, url, file);
    return OrderViewModel.toHttp(prevOrder);
  }

  @Public()
  @Get('url/:url')
  async findByUrl(@Param('url') url: string) {
    const order = await this.orderService.findByUrl(url);
    return OrderViewModel.toHttp(order);
  }
}
