import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnauthorized extends HttpException {
  constructor() {
    super('User unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
