import { z } from 'zod';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

const processEnv = {
  ...process.env,
  REDIS_PORT: +process.env.REDIS_PORT,
};

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  JWT_SECRET: z.string(),
  DOMAIN: z.string().optional().default('http://localhost:5173'),
});

@Injectable()
export class EnvService implements OnModuleInit {
  private readonly logger = new Logger(EnvService.name);

  onModuleInit() {
    this.validateEnv(processEnv);
  }

  private validateEnv(env: Record<string, any>): void {
    try {
      this.logger.log('Validating environment variables');
      envSchema.parse(env);
    } catch (error) {
      this.logger.error('Environment validation failed', error);
    }
  }
}

export const env = envSchema.parse(processEnv);
