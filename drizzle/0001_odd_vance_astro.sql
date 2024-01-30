ALTER TABLE "user" DROP CONSTRAINT "user_condominium_id_condominium_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "condominium_id";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");