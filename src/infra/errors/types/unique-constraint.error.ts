import { ConflictError } from './conflict.error';
import { PrismaClientError } from './prisma-client.error';

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`A record with this: ${uniqueField} already exists`);
  }
}
