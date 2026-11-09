// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const responses = sqliteTable("responses", {id:integer("id").primaryKey({autoIncrement:true}),staffName:text("staff_name").notNull().default("익명"),gender:text("gender").notNull(),ageGroup:text("age_group").notNull(),menus:text("menus").notNull(),warm:text("warm").notNull(),satisfaction:integer("satisfaction").notNull(),seasoning:text("seasoning").notNull(),improvements:text("improvements").notNull(),comment:text("comment").notNull().default(""),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
