import { GraphQLScalarType } from "graphql";
import type { Resolvers } from "src/generated/graphql-types";

type EnumDetails = "DateTime";

export const enumResolvers: Pick<Resolvers, EnumDetails> = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    serialize(value) {
      return value instanceof Date ? value.toISOString() : value;
    },
  }),
};
