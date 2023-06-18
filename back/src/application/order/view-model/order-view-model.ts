import { Order } from 'src/domain/entities/order';
import { FormatPhoneNumber } from '../helpers/format-phone-number-to-http';
import { FormatDate } from '../helpers/format-date-format';

const translateStatus = {
  PENDING: 'pendente',
};

export class OrderViewModel {
  static toHttp(order: Order) {
    return {
      id: order.id,
      phoneNumber: FormatPhoneNumber.format(
        order?.addressee?.phoneNumber ?? '',
      ),
      status: translateStatus[order.status].toUpperCase(),
      code: order.code,
      url: order.url,
      createdAt: FormatDate.format(order.receiptDateHour),
      updatedAt: FormatDate.format(order.updatedAt),
    };
  }
}
