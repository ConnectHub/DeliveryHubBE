import { DatabaseError } from '../types/database.error';
import { PrismaClientError } from '../types/prisma-client.error';
import { UniqueConstraintError } from '../types/unique-constraint.error';

enum PrismaErrors {
  UniqueConstraintViolation = 'P2002',
}

export const handleDatabaseError = (err: PrismaClientError): Error => {
  switch (err.code) {
    case PrismaErrors.UniqueConstraintViolation:
      return new UniqueConstraintError(err);

    default:
      return new DatabaseError(err.message);
  }
};
