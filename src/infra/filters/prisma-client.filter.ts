// src/prisma-client-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly intLogger = new Logger('PrismaClientExceptionFilter');
  constructor(private readonly logger: LoggerService) {
    super();
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.intLogger.error(exception);
    this.logger.error(exception);

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const uniqueField = exception.meta.target;
        response.status(status).json({
          statusCode: status,
          message: `A record with this ${uniqueField} already exists`,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          message: 'Invalid relation reference',
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
