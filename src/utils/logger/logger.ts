import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

import { LogLevel } from '@nestjs/common';

export class WinstonLogger {
  create() {
    return WinstonModule.createLogger(this.getWinstonModuleOptions());
  }

  private getDefaultFormats() {
    return [
      winston.format.timestamp(),
      utilities.format.nestLike('nestjs', {
        prettyPrint: true,
        colors: true,
      }),
    ];
  }

  private getDailyTransportOptions(
    level: LogLevel,
  ): DailyRotateFileTransportOptions {
    const dirname = './logs';
    const filename = ['%DATE%', level, 'log'].join('.');
    const datePattern = 'YYYY-MM-DD';
    const maxSize = '250m';
    const maxFiles = '7d';

    return {
      level,
      dirname,
      filename,
      datePattern,
      maxSize,
      maxFiles,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    };
  }

  private getWinstonModuleOptions(): WinstonModuleOptions {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(...this.getDefaultFormats()),
      }),
    ];

    transports.push(
      new DailyRotateFile(this.getDailyTransportOptions('verbose')),
      new DailyRotateFile(this.getDailyTransportOptions('error')),
    );

    return { transports };
  }
}
