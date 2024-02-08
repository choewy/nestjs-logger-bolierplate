import { Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse<Response>()
      .status(exception.getStatus())
      .send(exception.getResponse());
  }
}
