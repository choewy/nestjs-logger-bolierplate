import { Observable, tap } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { HttpLogVo } from 'src/utils/logger/vo/http-log.vo';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request.context = (context.getClass() ?? context.getHandler())?.name;

    return next
      .handle()
      .pipe(tap(() => this.logger.verbose(new HttpLogVo(context))));
  }
}
