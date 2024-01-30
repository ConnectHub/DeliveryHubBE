import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { condominiumSchema } from './condominium.schema';
import { residentSchema } from './resident.schema';

export const statusEnum = pgEnum('status', [
  'PENDING',
  'DELIVERED',
  'CANCELED',
]);

export const orderSchema = pgTable('order', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  code: text('code').notNull(),
  img: text('img'),
  description: text('description'),
  trackingCode: text('tracking_code'),
  status: statusEnum('status').default('PENDING'),
  sender: text('sender'),
  sign: text('sign'),
  signDateHour: timestamp('sign_date_hour'),
  receiptDateHour: timestamp('receipt_date_hour').defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  condominiumId: uuid('condominium_id')
    .references(() => condominiumSchema.id)
    .notNull(),
  addresseeId: uuid('addressee_id')
    .references(() => residentSchema.id)
    .notNull(),
});
