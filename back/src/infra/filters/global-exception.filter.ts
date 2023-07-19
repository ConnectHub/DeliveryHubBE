import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly intLogger = new Logger('GlobalExceptionFilter');
  constructor(private readonly logger: LoggerService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.intLogger.error(exception);
    this.logger.error(exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message =
        exception.getResponse()['message'] ?? exception.getResponse();
      response.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    const status = 500;
    const message = 'Internal server error.';
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
