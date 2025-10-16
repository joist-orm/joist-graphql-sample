import { type GraphQLResolveInfo, GraphQLScalarType } from "graphql";
import type { Context } from "src/context";
import { Author, Book, BookReview } from "src/entities";

export interface Resolvers {
  Author: AuthorResolvers;
  Book: BookResolvers;
  BookReview: BookReviewResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
  EmptyResult?: EmptyResultResolvers;
  SaveAuthorResult?: SaveAuthorResultResolvers;
  SaveBookResult?: SaveBookResultResolvers;
  SaveBookReviewResult?: SaveBookReviewResultResolvers;
  DateTime: GraphQLScalarType;
}

export type UnionResolvers = {};

export interface AuthorResolvers {
  books: Resolver<Author, {}, readonly Book[]>;
  firstName: Resolver<Author, {}, string>;
  id: Resolver<Author, {}, string>;
  lastName: Resolver<Author, {}, string | null | undefined>;
}

export interface BookResolvers {
  author: Resolver<Book, {}, Author>;
  id: Resolver<Book, {}, string>;
  reviews: Resolver<Book, {}, readonly BookReview[]>;
  title: Resolver<Book, {}, string>;
}

export interface BookReviewResolvers {
  book: Resolver<BookReview, {}, Book>;
  id: Resolver<BookReview, {}, string>;
  rating: Resolver<BookReview, {}, number>;
}

export interface MutationResolvers {
  deleteAuthor: Resolver<{}, MutationDeleteAuthorArgs, EmptyResult | null | undefined>;
  saveAuthor: Resolver<{}, MutationSaveAuthorArgs, SaveAuthorResult>;
  saveBook: Resolver<{}, MutationSaveBookArgs, SaveBookResult>;
  saveBookReview: Resolver<{}, MutationSaveBookReviewArgs, SaveBookReviewResult>;
}

export interface QueryResolvers {
  author: Resolver<{}, QueryAuthorArgs, Author>;
  books: Resolver<{}, {}, readonly Book[]>;
  testQuery: Resolver<{}, QueryTestQueryArgs, number>;
}

export interface EmptyResultResolvers {
  emptyResult: Resolver<EmptyResult, {}, string | null | undefined>;
}

export interface SaveAuthorResultResolvers {
  author: Resolver<SaveAuthorResult, {}, Author>;
}

export interface SaveBookResultResolvers {
  book: Resolver<SaveBookResult, {}, Book>;
}

export interface SaveBookReviewResultResolvers {
  bookReview: Resolver<SaveBookReviewResult, {}, BookReview>;
}

type MaybePromise<T> = T | Promise<T>;
export type Resolver<R, A, T> = (root: R, args: A, ctx: Context, info: GraphQLResolveInfo) => MaybePromise<T>;

export type SubscriptionResolverFilter<R, A, T> = (
  root: R | undefined,
  args: A,
  ctx: Context,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;
export type SubscriptionResolver<R, A, T> = {
  subscribe: (root: R | undefined, args: A, ctx: Context, info: GraphQLResolveInfo) => AsyncIterator<T>;
};

export interface MutationDeleteAuthorArgs {
  id: string;
}
export interface MutationSaveAuthorArgs {
  input: SaveAuthorInput;
}
export interface MutationSaveBookArgs {
  input: SaveBookInput;
}
export interface MutationSaveBookReviewArgs {
  input: SaveBookReviewInput;
}
export interface QueryAuthorArgs {
  id: string;
}
export interface QueryTestQueryArgs {
  error?: boolean | null | undefined;
}
export interface EmptyResult {
  emptyResult: string | null | undefined;
}

export interface SaveAuthorResult {
  author: Author;
}

export interface SaveBookResult {
  book: Book;
}

export interface SaveBookReviewResult {
  bookReview: BookReview;
}

export interface SaveAuthorInput {
  firstName?: string | null | undefined;
  id?: string | null | undefined;
  lastName?: string | null | undefined;
}

export interface SaveBookInput {
  authorId?: string | null | undefined;
  id?: string | null | undefined;
  title?: string | null | undefined;
}

export interface SaveBookReviewInput {
  bookId?: string | null | undefined;
  id?: string | null | undefined;
  rating?: number | null | undefined;
}

export const possibleTypes = {};
