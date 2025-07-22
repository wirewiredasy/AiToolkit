import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const toolUsage = pgTable("tool_usage", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  toolName: text("tool_name").notNull(),
  toolCategory: text("tool_category").notNull(),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  processingTime: integer("processing_time"), // in milliseconds
  success: boolean("success").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  metadata: jsonb("metadata"), // additional tool-specific data
});

export const userFiles = pgTable("user_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  originalName: text("original_name").notNull(),
  storedName: text("stored_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  toolUsageId: integer("tool_usage_id").references(() => toolUsage.id),
  expiresAt: timestamp("expires_at").notNull(), // auto-delete after 1 hour
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
});

export const insertToolUsageSchema = createInsertSchema(toolUsage).pick({
  userId: true,
  toolName: true,
  toolCategory: true,
  fileName: true,
  fileSize: true,
  processingTime: true,
  success: true,
  metadata: true,
});

export const insertUserFileSchema = createInsertSchema(userFiles).pick({
  userId: true,
  originalName: true,
  storedName: true,
  filePath: true,
  fileSize: true,
  mimeType: true,
  toolUsageId: true,
  expiresAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertToolUsage = z.infer<typeof insertToolUsageSchema>;
export type ToolUsage = typeof toolUsage.$inferSelect;
export type InsertUserFile = z.infer<typeof insertUserFileSchema>;
export type UserFile = typeof userFiles.$inferSelect;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
