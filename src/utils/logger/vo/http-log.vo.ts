import { Request, Response } from 'express';

import { ArgumentsHost, HttpException } from '@nestjs/common';

export class HttpLogVo {
  readonly context: string;
  readonly message = '';
  readonly status: number;
  readonly method: string;
  readonly url: string;

  readonly request: {
    ip: string;
    xforwardedfor: string;
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: unknown;
  };

  readonly exception: {
    name: string;
    message: string;
    cause: unknown;
  };

  constructor(context: ArgumentsHost, exception?: HttpException) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.context = http.getRequest().context;
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
