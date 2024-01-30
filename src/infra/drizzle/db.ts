import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL, {
  max: 1,
});
const db = drizzle(client);
migrate(db, { migrationsFolder: './drizzle' }).then(() => {
  client.end().then(() => {
    console.log('migration done');
  });
});
