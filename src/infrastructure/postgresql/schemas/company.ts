import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
 
export const companies = pgTable('Companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('Name').notNull(),
  address: text('Address'),
  city: text('City'),
  state: text('State'),
  country: text('Country'),
  createdAt: timestamp('created_at').defaultNow()
});

export type Company = typeof companies.$inferInsert;