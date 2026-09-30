import { GraphQLDateTime } from "graphql-scalars";
import type { Resolvers } from "src/generated/graphql-types";
import { enumResolvers } from "src/resolvers/enumResolvers";
import { mutationResolvers } from "src/resolvers/mutations";
import { objectResolvers } from "src/resolvers/objects";
import { queryResolvers } from "src/resolvers/queries";

export const resolvers: Resolvers = {
  DateTime: GraphQLDateTime,
  Query: queryResolvers,
  Mutation: mutationResolvers,
  ...objectResolvers,
  ...enumResolvers,
};
