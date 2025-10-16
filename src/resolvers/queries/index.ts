import type { QueryResolvers } from "src/generated/graphql-types";
import { author } from "src/resolvers/author/authorQuery";
import { books } from "src/resolvers/book/booksQuery";
import { testQuery } from "src/resolvers/queries/testQueryQuery";

// This file is auto-generated

export const queryResolvers: QueryResolvers = { ...author, ...books, ...testQuery };
