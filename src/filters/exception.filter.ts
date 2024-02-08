import { Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpLogDto } from 'src/utils/logger/log.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(err: HttpException | Error, host: ArgumentsHost) {
    let exception: HttpException;
    let type: keyof Pick<Logger, 'warn' | 'error'>;

    if (err instanceof HttpException) {
      exception = err;
      type = 'warn';
    } else {
      exception = new InternalServerErrorException({
        name: err.name,
        message: err.message,
      });
      type = 'error';
    }

    this.logger[type](new HttpLogDto(host, exception));

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(exception.getStatus())
      .send(exception.getResponse());
  }
}
