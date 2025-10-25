import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'wms_tj',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          username: config.get<string>('MYWMS_MYSQL_DB_USERNAME'),
          password: config.get<string>('MYWMS_MYSQL_DB_PASSWORD'),
          host: config.get<string>('MYWMS_MYSQL_DB_HOST'),
          port: parseInt(config.get<string>('MYWMS_MYSQL_DB_PORT') || '13306'),
          database: config.get<string>('MYWMS_MYSQL_DB_NAME'),
          entities: [],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      name: 'mypos_tj',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          username: config.get<string>('DATABASE_MYPOS_USERNAME'),
          password: config.get<string>('DATABASE_MYPOS_PASSWORD'),
          host: config.get<string>('DATABASE_MYPOS_HOST'),
          port: parseInt(config.get<string>('DATABASE_MYPOS_PORT') || '13306'),
          database: config.get<string>('DATABASE_MYPOS_NAME'),
          entities: [],
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
