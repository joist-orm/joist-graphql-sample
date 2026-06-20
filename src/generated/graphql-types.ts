import { type GraphQLResolveInfo, GraphQLScalarType } from "graphql";
import { CursorPageInfo } from "joist-graphql-resolver-utils";
import type { Context } from "src/context";
import { Author, Book, BookReview } from "src/entities";

export interface Resolvers {
  Author: AuthorResolvers;
  Book: BookResolvers;
  BookReview: BookReviewResolvers;
  Mutation: MutationResolvers;
  PageInfo: PageInfoResolvers;
  Query: QueryResolvers;
  AuthorsConnection?: AuthorsConnectionResolvers;
  AuthorsEdge?: AuthorsEdgeResolvers;
  BookReviewsConnection?: BookReviewsConnectionResolvers;
  BookReviewsEdge?: BookReviewsEdgeResolvers;
  BooksConnection?: BooksConnectionResolvers;
  BooksEdge?: BooksEdgeResolvers;
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
  reviews: Resolver<Book, BookReviewsArgs, readonly BookReview[]>;
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

export interface PageInfoResolvers {
  endCursor: Resolver<CursorPageInfo, {}, string | null | undefined>;
  hasNextPage: Resolver<CursorPageInfo, {}, boolean>;
  hasPreviousPage: Resolver<CursorPageInfo, {}, boolean>;
  startCursor: Resolver<CursorPageInfo, {}, string | null | undefined>;
  totalCount: Resolver<CursorPageInfo, {}, number>;
}

export interface QueryResolvers {
  author: Resolver<{}, QueryAuthorArgs, Author>;
  authors: Resolver<{}, QueryAuthorsArgs, AuthorsConnection>;
  book: Resolver<{}, QueryBookArgs, Book>;
  bookReview: Resolver<{}, QueryBookReviewArgs, BookReview>;
  bookReviews: Resolver<{}, QueryBookReviewsArgs, BookReviewsConnection>;
  books: Resolver<{}, {}, readonly Book[]>;
  testQuery: Resolver<{}, QueryTestQueryArgs, number>;
}

export interface AuthorsConnectionResolvers {
  edges: Resolver<AuthorsConnection, {}, readonly AuthorsEdge[]>;
  nodes: Resolver<AuthorsConnection, {}, readonly Author[]>;
  pageInfo: Resolver<AuthorsConnection, {}, CursorPageInfo>;
}

export interface AuthorsEdgeResolvers {
  cursor: Resolver<AuthorsEdge, {}, string>;
  node: Resolver<AuthorsEdge, {}, Author>;
}

export interface BookReviewsConnectionResolvers {
  edges: Resolver<BookReviewsConnection, {}, readonly BookReviewsEdge[]>;
  nodes: Resolver<BookReviewsConnection, {}, readonly BookReview[]>;
  pageInfo: Resolver<BookReviewsConnection, {}, CursorPageInfo>;
}

export interface BookReviewsEdgeResolvers {
  cursor: Resolver<BookReviewsEdge, {}, string>;
  node: Resolver<BookReviewsEdge, {}, BookReview>;
}

export interface BooksConnectionResolvers {
  edges: Resolver<BooksConnection, {}, readonly BooksEdge[]>;
  nodes: Resolver<BooksConnection, {}, readonly Book[]>;
  pageInfo: Resolver<BooksConnection, {}, CursorPageInfo>;
}

export interface BooksEdgeResolvers {
  cursor: Resolver<BooksEdge, {}, string>;
  node: Resolver<BooksEdge, {}, Book>;
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

export interface BookReviewsArgs {
  first?: number | null | undefined;
}
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
export interface QueryAuthorsArgs {
  after?: string | null | undefined;
  before?: string | null | undefined;
  filter?: AuthorFilter | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}
export interface QueryBookArgs {
  id: string;
}
export interface QueryBookReviewArgs {
  id: string;
}
export interface QueryBookReviewsArgs {
  after?: string | null | undefined;
  before?: string | null | undefined;
  filter?: BookReviewFilter | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}
export interface QueryTestQueryArgs {
  error?: boolean | null | undefined;
}
export interface AuthorsConnection {
  edges: AuthorsEdge[];
  nodes: Author[];
  pageInfo: CursorPageInfo;
}

export interface AuthorsEdge {
  cursor: string;
  node: Author;
}

export interface BookReviewsConnection {
  edges: BookReviewsEdge[];
  nodes: BookReview[];
  pageInfo: CursorPageInfo;
}

export interface BookReviewsEdge {
  cursor: string;
  node: BookReview;
}

export interface BooksConnection {
  edges: BooksEdge[];
  nodes: Book[];
  pageInfo: CursorPageInfo;
}

export interface BooksEdge {
  cursor: string;
  node: Book;
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

export interface AuthorFilter {
  createdAt?: DateTime[] | null | undefined;
  firstName?: string[] | null | undefined;
  id?: string[] | null | undefined;
  lastName?: string[] | null | undefined;
  updatedAt?: DateTime[] | null | undefined;
}

export interface BookFilter {
  authorId?: string[] | null | undefined;
  createdAt?: DateTime[] | null | undefined;
  id?: string[] | null | undefined;
  title?: string[] | null | undefined;
  updatedAt?: DateTime[] | null | undefined;
}

export interface BookReviewFilter {
  bookId?: string[] | null | undefined;
  createdAt?: DateTime[] | null | undefined;
  id?: string[] | null | undefined;
  rating?: number[] | null | undefined;
  updatedAt?: DateTime[] | null | undefined;
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
