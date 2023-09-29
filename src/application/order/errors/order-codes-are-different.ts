import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderCodesAreDifferent extends HttpException {
  constructor() {
    super('Order codes are different', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
