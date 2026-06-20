import { addResolversToSchema } from "@graphql-tools/schema";
import { type IResolvers } from "@graphql-tools/utils";
import fp from "fastify-plugin";
import { GraphQLSchema } from "graphql";
import Mercurius from "mercurius";
import { type Context } from "src/context";
import { resolvers } from "src/resolvers";
import { loadGqlSchema } from "src/schema";

export const GraphqlPlugin = fp(async (app) => {
  const schema = await createExecutableSchema();
  void app.register(Mercurius, {
    schema,
    graphiql: "graphiql",
    routes: true,
    errorFormatter: (response, ctx) => {
      return { statusCode: 500, response };
    },
    context: (req) => req.ctx,
    jit: 1,
    subscription: true,
  });
});

async function createExecutableSchema(): Promise<GraphQLSchema> {
  return addResolversToSchema({
    schema: await loadGqlSchema(),
    resolvers: { ...(resolvers as unknown as IResolvers<unknown, Context, Record<string, unknown>, unknown>) },
    resolverValidationOptions: {
      requireResolversToMatchSchema: "ignore",
      requireResolversForAllFields: "error",
      requireResolversForResolveType: "error",
    },
  });
}
