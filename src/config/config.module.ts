import { Module } from '@nestjs/common';
import { ConfigModule as CommonConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
@Module({
  imports: [
    CommonConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
      validate, // Use the validate function for environment variable validation
    }),
  ],
})
export class ConfigModule {}
