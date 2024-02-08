import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

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

  @Get('guard')
  @UseGuards(AuthGuard)
  throwExceptionByGuard() {
    return;
  }
}
