import { AppContext, newAppContext, Context } from "src/context";
import Fastify, { FastifyInstance, FastifyRequest } from "fastify";
import { EntityManager } from "src/entities";
import { HealthcheckPlugin } from "src/endpoints/healthcheck";
import { GraphqlPlugin } from "src/endpoints/graphql";

async function startServer(context: AppContext) {
  const app = await createApp(context);
  await app.listen({ host: "0.0.0.0", port: 4000 });
  console.log(`Server ready at http://localhost:4000/graphiql`);
}

declare module "fastify" {
  interface FastifyRequest {
    ctx: Context;
  }
}

export async function createApp(context: AppContext): Promise<FastifyInstance> {
  const app = Fastify();
  void app.register(async (app) => {
    app.decorateRequest("ctx", null as unknown as Context);
    app.addHook("preHandler", async (req) => {
      req.ctx = await createRequestContext(context, req);
    });
    void app.register(HealthcheckPlugin);
    void app.register(GraphqlPlugin);
  });
  return app;
}

export async function createRequestContext(appContext: AppContext, req: FastifyRequest): Promise<Context> {
  const { driver } = appContext;
  const ctx = { ...appContext, req };
  const em = new EntityManager(ctx as Context, driver);
  return Object.assign(ctx, { em });
}

if (require.main === module) {
  (async (): Promise<void> => {
    const context = await newAppContext();
    await startServer(context);
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
