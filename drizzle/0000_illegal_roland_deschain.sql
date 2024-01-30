DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('PENDING', 'DELIVERED', 'CANCELED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "condominium" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"code" text NOT NULL,
	"img" text,
	"description" text,
	"tracking_code" text,
	"status" "status" DEFAULT 'PENDING',
	"sender" text,
	"sign" text,
	"sign_date_hour" timestamp,
	"receipt_date_hour" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"condominium_id" uuid NOT NULL,
	"addressee_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resident" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"building_apartment" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"condominium_id" uuid NOT NULL,
	CONSTRAINT "resident_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"login" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"roles" roles[] DEFAULT array['USER']::roles[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"condominium_id" uuid NOT NULL,
	"rate_id" uuid,
	CONSTRAINT "user_login_unique" UNIQUE("login")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "resident" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "building_apartment_idx" ON "resident" ("building_apartment");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_condominium_id_condominium_id_fk" FOREIGN KEY ("condominium_id") REFERENCES "condominium"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_addressee_id_resident_id_fk" FOREIGN KEY ("addressee_id") REFERENCES "resident"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resident" ADD CONSTRAINT "resident_condominium_id_condominium_id_fk" FOREIGN KEY ("condominium_id") REFERENCES "condominium"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_condominium_id_condominium_id_fk" FOREIGN KEY ("condominium_id") REFERENCES "condominium"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_rate_id_rate_id_fk" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
