import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { condominiumSchema } from './condominium.schema';

export const residentSchema = pgTable(
  'resident',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    buildingApartment: text('building_apartment').notNull(),
    phoneNumber: text('phone_number').notNull(),
    email: text('email').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    condominiumId: uuid('condominium_id')
      .references(() => condominiumSchema.id)
      .notNull(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      buildingApartmentIdx: index('building_apartment_idx').on(
        table.buildingApartment,
      ),
    };
  },
);
