import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderCodeDoesNotMatch extends HttpException {
  constructor() {
    super('Order code does not match', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
