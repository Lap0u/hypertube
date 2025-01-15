import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    console.log(exception);
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const target = exception.meta?.target || 'field';
        const message = `A record with this ${target} already exists. Please use a different value.`;

        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }

      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        const message = `Ensure referenced records exist.`;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }

      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        const message = `Ressource not found`;

        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
