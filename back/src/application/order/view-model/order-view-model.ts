import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/domain/entities/order';
import { FormatDate } from '../../../infra/utils/format-date';
import { translateStatus } from '../translator/order.translator';
import { FormatPhoneNumber } from 'src/infra/utils/format-phone-number';
import { ChartDataDTO } from '../dto/chart-data-order.dto';

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
      phoneNumber: FormatPhoneNumber.unFormat(
        order?.addressee?.phoneNumber ?? undefined,
      ),
      sender: order.sender ?? '-----',
      //analyze best solution to translate status
      status: translateStatus[order.status].toUpperCase(),
      originalStatus: order.status,
      code: order.code,
      url: order.url,
      sign: order.sign,
      img: order.img,
      description: order.description,
      trackingCode: order.trackingCode,
      name: order?.addressee?.name ?? undefined,
      signDateHour: FormatDate.format(order.signDateHour),
      createdAt: FormatDate.format(order.receiptDateHour),
      updatedAt: FormatDate.format(order.updatedAt),
    };
  }

  static countByStatus(order: ChartDataDTO) {
    return {
      total: +order._count,
      //analyze best solution to translate status
      description: translateStatus[order.status].toUpperCase() + 'S',
    };
  }
}
