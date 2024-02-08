import { Observable, tap } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { HttpLogDto } from 'src/utils/logger/log.dto';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request.context = (context.getClass() ?? context.getHandler())?.name;

    return next
      .handle()
      .pipe(tap(() => this.logger.verbose(new HttpLogDto(context))));
  }
}
