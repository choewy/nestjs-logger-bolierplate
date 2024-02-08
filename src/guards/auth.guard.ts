import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    request.context = [
      (context.getClass() ?? context.getHandler())?.name,
      AuthGuard.name,
    ].join('.');

    return false;
  }
}
