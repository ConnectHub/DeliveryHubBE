import { PrismaClientError } from '../types/prisma-client.error';

export const isPrismaError = (err: PrismaClientError) => {
  return (
    typeof err.code === 'string' &&
    typeof err.clientVersion === 'string' &&
    (typeof err.meta === 'undefined' || typeof err.meta === 'object')
  );
};
