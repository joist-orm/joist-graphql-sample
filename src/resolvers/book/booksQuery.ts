import { QueryResolvers } from "src/generated/graphql-types";
import { Book } from "src/entities";

export const books: Pick<QueryResolvers, "books"> = {
  async books(root, args, ctx) {
    return ctx.em.find(Book, {});
  },
};
