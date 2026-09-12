import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db/schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  if (!dbInstance) {
    const client = postgres(url, {max: 10, prepare: false});
    dbInstance = drizzle(client, {schema});
  }

  return dbInstance;
}
