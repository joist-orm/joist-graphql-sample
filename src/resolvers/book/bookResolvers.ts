import { getMetadata } from "joist-orm";
import { Book, BookReview } from "src/entities";
import { BookResolvers } from "src/generated/graphql-types";
import { entityResolver } from "src/resolvers/utils";

export const bookResolvers: BookResolvers = {
  ...entityResolver(getMetadata(Book)),

  async reviews(book, args, ctx) {
    return ctx.em.find(BookReview, { book }, { limit: args.first ?? undefined, orderBy: { id: "ASC" } });
  },
};
