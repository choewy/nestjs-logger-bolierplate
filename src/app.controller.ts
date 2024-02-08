import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { AlwaysFailedPipe } from './pipes/always-failed.pipe';

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

  @Get('pipe')
  @UsePipes(AlwaysFailedPipe)
  throwValidationPipe(@Param() params: never) {
    return;
  }
}
