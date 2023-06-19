import { HttpException, HttpStatus } from '@nestjs/common';

export class CondominiumNotFound extends HttpException {
  constructor() {
    super('Condominium Not Found', HttpStatus.NOT_FOUND);
  }
}
