import { authors } from "src/resolvers/author/authorsQuery";
import { makeRunQuery } from "src/resolvers/testUtils";

describe("authors", () => {
  it.withCtx("returns authors", async (ctx) => {
    const result = await run(ctx);
    expect(result).toBeDefined();
  });
});

const run = makeRunQuery(authors);
