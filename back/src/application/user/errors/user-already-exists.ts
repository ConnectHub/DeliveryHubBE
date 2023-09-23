import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExist extends HttpException {
  constructor() {
    super('User already exists!', HttpStatus.CONFLICT);
  }
}
