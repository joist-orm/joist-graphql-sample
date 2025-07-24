import { Context } from "src/context";
import { SaveBookInput } from "src/generated/graphql-types";
import { saveBook } from "src/resolvers/book/saveBookMutation";
import { makeRunInputMutation, run } from "src/resolvers/testUtils";
import { Book, newAuthor } from "src/entities";

describe("saveBook", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const a1 = newAuthor(em);
    const result = await runSaveBook(ctx, () => ({
      title: "b2",
      authorId: a1.id,
    }));
    expect(result.book).toMatchEntity({
      title: "b2",
      author: a1,
    });
  });
});

const runSaveBook = makeRunInputMutation(saveBook);
