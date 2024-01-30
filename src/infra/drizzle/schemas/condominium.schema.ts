import { text, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const condominiumSchema = pgTable('condominium', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
