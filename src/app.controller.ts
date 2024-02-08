import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ok')
  getOkResponse(): string {
    return this.appService.getHello();
  }

  @Get('fail')
  throwException(): string {
    throw new BadRequestException();
  }

  @Get('error')
  throwError(): string {
    throw new Error('test error');
  }
}
