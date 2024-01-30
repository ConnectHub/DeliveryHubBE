import { Module } from '@nestjs/common';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { env } from '../env/env.service';
import * as userSchema from '../drizzle/schemas/user.schema';
import * as condominiumSchema from './schemas/condominium.schema';
import * as residentSchema from './schemas/resident.schema';
import * as rateSchema from './schemas/rate.schema';
import * as orderSchema from './schemas/order.schema';

export const schemas = {
  ...userSchema,
  ...condominiumSchema,
  ...residentSchema,
  ...rateSchema,
  ...orderSchema,
};

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DB',
      postgres: {
        url: env.DATABASE_URL,
      },
      config: { schema: { ...schemas }, logger: true },
    }),
  ],
})
export class DrizzleModule {}
