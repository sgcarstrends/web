CREATE TABLE IF NOT EXISTS "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"pathname" text NOT NULL,
	"referrer" text NOT NULL,
	"flag" text NOT NULL,
	"country" text NOT NULL
);
