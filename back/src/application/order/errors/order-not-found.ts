import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFound extends HttpException {
  constructor() {
    super('Order not found', HttpStatus.NOT_FOUND);
  }
}
