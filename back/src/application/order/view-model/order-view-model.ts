import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/domain/entities/order';
import { FormatPhoneNumber } from '../helpers/format-phone-number-to-http';
import { FormatDate } from '../../../infra/utils/format-date';
import { translateStatus } from '../translator/order.translator';

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

  @ApiProperty()
  _count: string;

  static toHttp(order: Order) {
    return {
      id: order.id,
      key: order.id,
      phoneNumber: FormatPhoneNumber.format(
        order?.addressee?.phoneNumber ?? undefined,
      ),
      sender: order.sender ?? '-----',
      //analyze best solution to translate status
      status: translateStatus[order.status].toUpperCase(),
      originalStatus: order.status,
      code: order.code,
      url: order.url,
      sign: order.sign,
      name: order?.addressee?.name ?? undefined,
      createdAt: FormatDate.format(order.receiptDateHour),
      updatedAt: FormatDate.format(order.updatedAt),
    };
  }

  static countByStatus(order: OrderViewModel) {
    return {
      total: order._count,
      //analyze best solution to translate status
      status: translateStatus[order.status].toUpperCase() + 'S',
    };
  }
}
