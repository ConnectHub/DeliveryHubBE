import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/domain/entities/order';
import { FormatPhoneNumber } from '../helpers/format-phone-number-to-http';
import { FormatDate } from '../../../infra/utils/format-date';
import { translateStatus } from './order.translator';

export class OrderViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  static toHttp(order: Order) {
    return {
      id: order.id,
      phoneNumber: FormatPhoneNumber.format(
        order?.addressee?.phoneNumber ?? undefined,
      ),
      key: order.id,
      sender: order.sender ?? '-----',
      status: translateStatus[order.status].toUpperCase(),
      originalStatus: order.status,
      code: order.code,
      url: order.url,
      name: order?.addressee?.name ?? undefined,
      createdAt: FormatDate.format(order.receiptDateHour),
      updatedAt: FormatDate.format(order.updatedAt),
    };
  }
}
