import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/domain/entities/order';
import { FormatDate } from '../../../infra/utils/format-date';
import { translateStatus } from '../translator/order.translator';

export class OrderViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  buildingApartment: string;

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
      buildingApartment: order?.addressee?.buildingApartment ?? undefined,
      condominiumId: order.condominiumId,
      sender: order.sender ?? '-----',
      //analyze best solution to translate status
      //TO DO
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
}
