import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError, // Import for better error handling
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  PORT?: number;

  @IsOptional()
  @IsString()
  TZ?: string;

  // --- MYWMS_MYSQL Configuration ---

  @IsString()
  @IsNotEmpty()
  MYWMS_MYSQL_DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MYWMS_MYSQL_DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MYWMS_MYSQL_DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  MYWMS_MYSQL_DB_PORT: string;

  @IsString()
  @IsNotEmpty()
  MYWMS_MYSQL_DB_NAME: string;

  // --- DATABASE_MYPOS Configuration ---

  @IsString()
  @IsNotEmpty()
  DATABASE_MYPOS_HOST: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_MYPOS_PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_MYPOS_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_MYPOS_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_MYPOS_NAME: string;

  @IsString()
  @IsNotEmpty()
  ACCOUNT_BILL_PAYMENT: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
    stopAtFirstError: true,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .flatMap((error) => {
        const property = error.property;
        const constraints = error.constraints
          ? Object.values(error.constraints)
          : ['unknown error'];
        return constraints.map((message) => `[${property}]: ${message}`);
      })
      .join('\n');

    throw new Error(
      `\n*** Environment Configuration Validation Failed ***\n${errorMessages}`,
    );
  }

  return validatedConfig;
}
