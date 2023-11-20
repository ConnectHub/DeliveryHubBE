import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { isPrismaError } from '../utils/is-prisma-error';
import { handleDatabaseError } from '../utils/handle-database-error';
import { DatabaseError } from '../types/database.error';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (isPrismaError(error)) error = handleDatabaseError(error);
        if (error instanceof DatabaseError)
          throw new BadRequestException(error.message);

        throw error;
      }),
    );
  }
}
