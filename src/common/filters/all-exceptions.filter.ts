import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';
import { createResponse } from '../utils/response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error = exception.getResponse() as
      | string
      | { message: any; error: string };

      console.log('Exception caught by AllExceptionsFilter:', error);
    if (typeof error !== 'string' && error.message) {
      const validationErrors = error.message as ValidationError[];
      if (validationErrors.length > 0 && validationErrors[0].constraints) {
        const firstConstraint = Object.values(
          validationErrors[0].constraints,
        )[0];
        error = firstConstraint;
      }
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    response.status(status).json(createResponse(status, message, null, error));
  }
}
