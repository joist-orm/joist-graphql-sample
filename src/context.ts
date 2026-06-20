import { Pool } from "pg";
import { Driver } from "joist-orm";
import { PostgresDriver } from "joist-orm/pg";
import { newPgConnectionConfig } from "joist-utils";
import { FastifyRequest } from "fastify";
import { EntityManager } from "src/entities";

interface AppContextOpts {
  onQuery?: (sql: string) => void;
}

/** App-level dependencies like connection pools/etc. */
export interface AppContext {
  pool: Pool;
  driver: Driver;
  close(): Promise<void>;
}

/** Request-level dependencies. */
export interface Context extends AppContext {
  req: FastifyRequest;
  em: EntityManager;
}

/** Creates app-level dependencies like the connection pool and Joist driver. */
export async function newAppContext(opts: AppContextOpts = {}): Promise<AppContext> {
  const pool = new Pool(newPgConnectionConfig());
  const driver = new PostgresDriver(pool, {
    onQuery(sql) {
      opts.onQuery?.(sql);
    },
  });
  async function close() {
    await pool.end();
  }
  return { pool, driver, close };
}
