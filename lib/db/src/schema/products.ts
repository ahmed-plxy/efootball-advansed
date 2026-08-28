import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const productStatusEnum = pgEnum("product_status", [
  "Available",
  "Reserved",
  "Sold",
  "Hidden",
]);

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  coins: integer("coins").notNull().default(0),
  gp: integer("gp").notNull().default(0),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  category: text("category").notNull(),
  platform: text("platform").notNull().default("eFootball"),
  status: productStatusEnum("status").notNull().default("Available"),
  productIdentifier: text("product_identifier").notNull().unique(),
  deliveryMethod: text("delivery_method").notNull(),
  featured: boolean("featured").notNull().default(false),
  offerId: text("offer_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;