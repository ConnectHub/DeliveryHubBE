import { HttpException, HttpStatus } from '@nestjs/common';

export class ResidentAlreadyExist extends HttpException {
  constructor() {
    super('Resident not found', HttpStatus.CONFLICT);
  }
}
