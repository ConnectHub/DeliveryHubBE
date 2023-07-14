import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneNumberNotProvided extends HttpException {
  constructor() {
    super('Phone number not provided', HttpStatus.BAD_REQUEST);
  }
}
