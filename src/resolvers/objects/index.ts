import { authorResolvers } from "src/resolvers/author/authorResolvers";
import { bookResolvers } from "src/resolvers/book/bookResolvers";
import { bookReviewResolvers } from "src/resolvers/bookReview/bookReviewResolvers";
import { pageInfoResolvers } from "src/resolvers/pageInfo/pageInfoResolvers";

// This file is auto-generated

export const objectResolvers = {
  Author: authorResolvers,
  Book: bookResolvers,
  BookReview: bookReviewResolvers,
  PageInfo: pageInfoResolvers,
};
