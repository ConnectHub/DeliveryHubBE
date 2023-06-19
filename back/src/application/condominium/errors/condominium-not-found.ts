import { HttpException, HttpStatus } from '@nestjs/common';

export class CondominiumNotFound extends HttpException {
  constructor() {
    super('Resident not found', HttpStatus.NOT_FOUND);
  }
}
