import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderAlreadyBeenDelivered extends HttpException {
  constructor() {
    super('Order already been delivered', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
