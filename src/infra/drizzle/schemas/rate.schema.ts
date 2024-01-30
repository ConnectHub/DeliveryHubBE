import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const rateSchema = pgTable('rate', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
