import { Pool } from "pg";
import { Driver } from "joist-orm";
import { PostgresDriver } from "joist-orm/pg";
import { newPgConnectionConfig } from "joist-utils";
import { FastifyRequest } from "fastify";
import { EntityManager } from "src/entities";

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

export async function newAppContext(): Promise<AppContext> {
  const pool = new Pool(newPgConnectionConfig());
  const driver = new PostgresDriver(pool, {
    onQuery() {
      // console.log(sql);
    },
  });
  async function close() {
    await pool.end();
  }
  return { pool, driver, close };
}
