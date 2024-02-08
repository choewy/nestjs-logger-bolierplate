import { Observable, tap, catchError, throwError } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { HttpLogWithExecutionContextDto } from 'src/utils/logger/log.dto';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() =>
        this.logger.verbose(new HttpLogWithExecutionContextDto(context)),
      ),
      catchError((err) => {
        let exception: HttpException;
        let type: keyof Pick<Logger, 'warn' | 'error'>;

        if (err instanceof HttpException) {
          exception = err;
          type = 'warn';
        } else {
          exception = new InternalServerErrorException({
            name: err.name,
            message: err.message,
            cause: err.cause,
          });
          type = 'error';
        }

        this.logger[type](
          new HttpLogWithExecutionContextDto(context, exception),
        );

        return throwError(() => exception);
      }),
    );
  }
}
