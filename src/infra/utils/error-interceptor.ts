import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApplicationError {
  error: string;
  statusCode: number;
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.error && data.statusCode) {
          const response = context.switchToHttp().getResponse();
          response.status(data.statusCode).json(data);
          return;
        }
        return data;
      }),
    );
  }
}
