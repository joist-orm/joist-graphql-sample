import { Context } from "src/context";
import { books } from "src/resolvers/book/booksQuery";
import { run } from "src/resolvers/testUtils";
import { newBook } from "src/entities";

describe("books", () => {
  it.withCtx("handles this business case", async (ctx) => {
    const { em } = ctx;
    // Given two books
    const [b1, b2] = [newBook(em), newBook(em)];
    const result = await runBooks(ctx, () => ({}));
    // Then both are returned
    expect(result).toMatchEntity([b1, b2]);
  });
});

async function runBooks(ctx: Context, argsFn: () => {}) {
  return await run(ctx, async () => {
    return books.books({}, argsFn(), ctx, undefined!);
  });
}
