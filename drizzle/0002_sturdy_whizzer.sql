ALTER TABLE "user" DROP CONSTRAINT "user_rate_id_rate_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "rate_id";