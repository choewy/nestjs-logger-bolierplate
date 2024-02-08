import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(message: string) {
    super();

    this.message = message;
  }
}

@Injectable()
export class AlwaysFailedPipe implements PipeTransform {
  transform() {
    throw new ValidationException('it should be always failed');
  }
}
