import { Request, Response } from 'express';

import { ArgumentsHost, HttpException } from '@nestjs/common';

export class HttpLogDto {
  context: string;
  message = '';
  status: number;
  method: string;
  url: string;

  request: {
    ip: string;
    xforwardedfor: string;
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: unknown;
  };

  exception: {
    name: string;
    message: string;
    cause: unknown;
  };

  constructor(context: ArgumentsHost, exception?: HttpException) {
    this.setContextName(context);
    this.setRequest(context);
    this.setException(exception);
  }

  private setContextName(context: ArgumentsHost) {
    this.context = context.switchToHttp().getRequest().context;
  }

  private setRequest(context: ArgumentsHost) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

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
  }

  private setException(exception?: HttpException) {
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
