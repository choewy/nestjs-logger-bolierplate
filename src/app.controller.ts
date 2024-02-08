import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AlwaysFailedPipe } from './pipes/always-failed.pipe';

@Controller()
export class AppController {
  @Get('ok')
  getOkResponse(): void {
    return;
  }

  @Get('fail')
  throwException(): never {
    throw new BadRequestException();
  }

  @Get('error')
  throwError(): never {
    throw new Error('test error');
  }

  @Get('guard')
  @UseGuards(AuthGuard)
  throwExceptionByGuard(): void {
    return;
  }

  @Get('pipe')
  @UsePipes(AlwaysFailedPipe)
  throwValidationPipe(@Param() _: never): void {
    return;
  }
}
