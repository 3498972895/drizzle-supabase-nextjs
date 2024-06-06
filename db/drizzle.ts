import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';

const client = postgres(process.env.DATABASE_URL!,{prepare:false});
export const db = drizzle(client);

const allUsers = db.select().from(users);