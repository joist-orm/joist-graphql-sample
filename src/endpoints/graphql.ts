import { addResolversToSchema } from "@graphql-tools/schema";
import fp from "fastify-plugin";
import { GraphQLSchema } from "graphql";
import Mercurius from "mercurius";
import { AppContext } from "src/context";
import { resolvers } from "src/resolvers";
import { loadGqlSchema } from "src/schema";

export const GraphqlPlugin = fp<{ context: AppContext }>(async (app, { context }) => {
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
    resolvers: { ...(resolvers as any) },
    resolverValidationOptions: {
      requireResolversToMatchSchema: "ignore",
      requireResolversForAllFields: "error",
      requireResolversForResolveType: "error",
    },
  });
}
