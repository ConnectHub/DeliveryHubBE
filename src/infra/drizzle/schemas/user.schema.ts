import { text, pgTable, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { condominiumSchema } from './condominium.schema';
import { rateSchema } from './rate.schema';
import { relations, sql } from 'drizzle-orm';
import { Role } from '@/domain/entities/user';

export const rolesEnum = pgEnum('roles', [Role.ADMIN, Role.USER]);

export const userSchema = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom().notNull().unique(),
  login: text('login').unique().notNull(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  roles: rolesEnum('roles')
    .array()
    .default(sql`array['USER']::roles[]`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  condominiumId: uuid('condominium_id')
    .references(() => condominiumSchema?.id)
    .notNull(),
  rateId: uuid('rate_id').references(() => rateSchema?.id),
});

export const userRelations = relations(userSchema, ({ one }) => ({
  rate: one(rateSchema, {
    fields: [userSchema?.rateId],
    references: [rateSchema?.id],
  }),
}));
