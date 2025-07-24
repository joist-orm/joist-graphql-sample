import { saveAuthor } from "src/resolvers/author/saveAuthorMutation";
import { makeRunInputMutation } from "src/resolvers/testUtils";

describe("saveAuthor", () => {
  it.withCtx("can create", async (ctx) => {
    const result = await runSaveAuthor(ctx, () => ({ firstName: "a1" }));
    expect(result.author).toMatchEntity({ firstName: "a1" });
  });
});

const runSaveAuthor = makeRunInputMutation(saveAuthor);
