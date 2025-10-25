import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './domain/auth/auth.module';
import { AppLoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthModule, AppLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
