import { Order } from 'src/domain/entities/order';
import { FormatPhoneNumber } from '../helpers/format-phone-number-to-http';

export class OrderViewModel {
  static toHttp(order: Order) {
    return {
      id: order.id,
      phoneNumber: FormatPhoneNumber.format(order.addressee.phoneNumber),
      status: order.status,
      code: order.code,
      url: order.url,
      createdAt: order.receiptDateHour,
      updatedAt: order.updatedAt,
    };
  }
}
