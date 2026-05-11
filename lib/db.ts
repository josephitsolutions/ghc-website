import mysql from "mysql2/promise";

/**
 * Database configuration mirrors legacy `dbdetails.php` at repository root.
 * Set DATABASE_* in `.env.local` for production deployments.
 */
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool | null {
  const host = process.env.DATABASE_HOST ?? "localhost";
  const database = process.env.DATABASE_NAME ?? "mrbonezc_ghc";
  const user = process.env.DATABASE_USER ?? "mrbonezc_cleaner";
  const password = process.env.DATABASE_PASSWORD;

  if (!password) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host,
      database,
      user,
      password,
      waitForConnections: true,
      connectionLimit: 8,
    });
  }

  return pool;
}
