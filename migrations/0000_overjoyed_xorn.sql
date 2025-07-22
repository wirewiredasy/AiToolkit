CREATE TABLE "tool_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"tool_name" text NOT NULL,
	"tool_category" text NOT NULL,
	"file_name" text,
	"file_size" integer,
	"processing_time" integer,
	"success" boolean NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "user_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"original_name" text NOT NULL,
	"stored_name" text NOT NULL,
	"file_path" text NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" text NOT NULL,
	"tool_usage_id" integer,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tool_usage" ADD CONSTRAINT "tool_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_files" ADD CONSTRAINT "user_files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_files" ADD CONSTRAINT "user_files_tool_usage_id_tool_usage_id_fk" FOREIGN KEY ("tool_usage_id") REFERENCES "public"."tool_usage"("id") ON DELETE no action ON UPDATE no action;