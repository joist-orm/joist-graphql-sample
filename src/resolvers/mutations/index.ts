import { MutationResolvers } from "src/generated/graphql-types";
import { deleteAuthor } from "src/resolvers/author/deleteAuthorMutation";
import { saveAuthor } from "src/resolvers/author/saveAuthorMutation";
import { saveBook } from "src/resolvers/book/saveBookMutation";
import { saveBookReview } from "src/resolvers/bookReview/saveBookReviewMutation";

// This file is auto-generated

export const mutationResolvers: MutationResolvers = { ...deleteAuthor, ...saveAuthor, ...saveBook, ...saveBookReview };
