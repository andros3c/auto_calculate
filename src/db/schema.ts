import {
  pgTable,
  uuid,
  varchar,
  numeric,
  char,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

// Transactions table
export const transactionsTable = pgTable("transactions", {
  id: uuid().primaryKey().defaultRandom(), // UUID as primary key
  owner: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  date: date().notNull(), // Date column
  created_at: timestamp().defaultNow().notNull(), // Created at timestamp
  deleted_at: timestamp(), // Nullable deleted at timestamp
});

// Orders details table
export const ordersDetailsTable = pgTable("orders_details", {
  id: uuid().primaryKey().defaultRandom(), // UUID as primary key
  transaction_id: uuid()
    .references(() => transactionsTable.id)
    .notNull(), // Foreign key referencing transactions
  name: varchar({ length: 255 }).notNull(),
  amount: numeric().notNull(),
  price: numeric().notNull(),
  unit: char({ length: 20 }).notNull(), // Char type, up to 20 characters
  total: numeric().notNull(), // Total price or amount
  created_at: timestamp().defaultNow().notNull(), // Created at timestamp
  updated_at: timestamp().defaultNow().notNull(), // Updated at timestamp
});
