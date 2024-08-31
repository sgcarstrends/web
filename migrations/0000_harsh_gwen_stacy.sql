CREATE TABLE IF NOT EXISTS "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"pathname" text NOT NULL,
	"referrer" text NOT NULL,
	"country" text NOT NULL,
	"flag" text NOT NULL,
	"city" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL
);
