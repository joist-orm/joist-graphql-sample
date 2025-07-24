import { DeepNew, FactoryOpts, newTestInstance } from "joist-orm";
import { BookReview } from "src/entities";
import type { EntityManager } from "src/entities";

export function newBookReview(em: EntityManager, opts: FactoryOpts<BookReview> = {}): DeepNew<BookReview> {
  return newTestInstance(em, BookReview, opts, {});
}
