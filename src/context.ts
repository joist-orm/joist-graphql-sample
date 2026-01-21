import knex, { Knex } from "knex";
import { Driver } from "joist-orm";
import { PostgresDriver } from "joist-orm/pg";
import { newPgConnectionConfig } from "joist-utils";
import { FastifyRequest } from "fastify";
import { EntityManager } from "src/entities";

/** App-level dependencies like connection pools/etc. */
export interface AppContext {
  knex: Knex;
  driver: Driver;
  close(): Promise<void>;
}

/** Request-level dependencies. */
export interface Context extends AppContext {
  req: FastifyRequest;
  em: EntityManager;
}

export async function newAppContext(): Promise<AppContext> {
  const knex = createKnex();
  const driver = new PostgresDriver(knex);
  async function close() {
    await knex.destroy();
  }
  return { knex, driver, close };
}

function createKnex(): Knex {
  return knex({ client: "pg", connection: newPgConnectionConfig(), debug: false });
}
