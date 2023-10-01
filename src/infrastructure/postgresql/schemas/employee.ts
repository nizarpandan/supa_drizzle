import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
 
export const employees = pgTable('Employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  eId: varchar('EId').unique(),
  firstName: varchar('FirstName', { length: 256 }).notNull(),
  lastName: varchar('LastName', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export type Employee = typeof employees.$inferInsert;