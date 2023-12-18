import { Resident } from '@/domain/entities/resident';
import { ApplicationError } from '@/infra/utils/error-interceptor';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResidentErrors {
  private readonly logger = new Logger(ResidentErrors.name);

  verifyResidentExistence(resident: Resident): Resident | ApplicationError {
    if (!resident) {
      this.logger.error('Resident not found');
      return {
        error: 'Resident not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    return resident;
  }
}
