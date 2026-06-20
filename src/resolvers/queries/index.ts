import type { QueryResolvers } from "src/generated/graphql-types";
import { author } from "src/resolvers/author/authorQuery";
import { authors } from "src/resolvers/author/authorsQuery";
import { book } from "src/resolvers/book/bookQuery";
import { books } from "src/resolvers/book/booksQuery";
import { bookReview } from "src/resolvers/bookReview/bookReviewQuery";
import { bookReviews } from "src/resolvers/bookReview/bookReviewsQuery";
import { testQuery } from "src/resolvers/queries/testQueryQuery";

// This file is auto-generated

export const queryResolvers: QueryResolvers = {
  ...author,
  ...authors,
  ...book,
  ...bookReview,
  ...bookReviews,
  ...books,
  ...testQuery,
};
