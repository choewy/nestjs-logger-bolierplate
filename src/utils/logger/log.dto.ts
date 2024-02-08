import { Request, Response } from 'express';

import { ExecutionContext, HttpException } from '@nestjs/common';

export class HttpLogWithExecutionContextDto {
  readonly context: string;
  readonly message = '';

  readonly status: number;
  readonly method: string;
  readonly url: string;

  readonly request: {
    readonly ip: string;
    readonly xforwardedfor: string;
    readonly params: Record<string, unknown>;
    readonly query: Record<string, unknown>;
    readonly body: unknown;
  };

  readonly exception: {
    name: string;
    message: string;
    cause: unknown;
  };

  constructor(context: ExecutionContext, exception?: HttpException) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.context = (context.getClass() ?? context.getHandler()).name;
    this.status = response.statusCode;
    this.method = request.method;
    this.url = request.url;

    this.request = {
      ip: request.ip,
      xforwardedfor: request.headers['x-forwarded-for'] as string,
      params: request.params,
      query: request.query,
      body: request.body,
    };

    if (exception) {
      this.status = exception.getStatus();
      this.exception = {
        name: exception.name,
        message: exception.message,
        cause: exception.cause,
      };
    }
  }
}
