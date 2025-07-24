import { Context } from "src/context";
import { deleteAuthor } from "src/resolvers/author/deleteAuthorMutation";
import { run } from "src/resolvers/testUtils";
import { newAuthor } from "src/entities";

describe("deleteAuthor", () => {
  it.withCtx("can delete an author", async (ctx) => {
    // Given an author
    const { em } = ctx;
    const a = newAuthor(em);
    // When we delete it
    await runDeleteAuthor(ctx, () => ({ id: a.id }));
    // Then its deleted
    expect(a.isDeletedEntity).toBe(true);
  });
});

async function runDeleteAuthor(ctx: Context, argFn: () => { id: string }) {
  return await run(ctx, async (ctx) => {
    return deleteAuthor.deleteAuthor({}, argFn(), ctx, undefined!);
  });
}
