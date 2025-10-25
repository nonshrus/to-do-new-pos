import { Module } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { Request, Response } from 'express';
import pino from 'pino';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    LoggerPinoModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          pinoHttp: {
            name: 'inventory-svc',
            genReqId: () => nanoid(),
            level: !['production', 'staging'].includes(
              process.env.NODE_ENV || 'development',
            )
              ? 'debug'
              : 'info',
            formatters: {
              level(level: string) {
                return { level };
              },
            },
            timestamp: pino.stdTimeFunctions.isoTime,
            transport: !['production', 'staging'].includes(
              process.env.NODE_ENV || 'development',
            )
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    translateTime: 'SYS:standard',
                  },
                }
              : undefined,
            redact: ['req.headers.authorization'],
            customLogLevel: function (req: Request, res: Response, err: Error) {
              if (res.statusCode >= 400 && res.statusCode < 500) {
                return 'warn';
              } else if ((res.statusCode && res.statusCode >= 500) || err) {
                return 'error';
              } else if (res.statusCode >= 300 && res.statusCode < 400) {
                return 'debug';
              }
              return 'info';
            },
          },
        };
      },
    }),
  ],
})
export class AppLoggerModule {}
