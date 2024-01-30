ALTER TABLE "user" ADD COLUMN "condominium_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "rate_id" uuid;--> statement-breakpoint
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
