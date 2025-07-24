import { newAuthor } from "src/entities";
import { authorResolvers } from "src/resolvers/objects/author/authorResolvers";
import { makeRunObjectFields, makeRunObjectField } from "src/resolvers/testUtils";

describe("authorResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given an Author
    const a = newAuthor(em);
    // Then we can query it
    const result = await runFields(ctx, a, ["firstName", "lastName"]);
    expect(result).toMatchEntity(result);
  });
});

const runFields = makeRunObjectFields(authorResolvers);
const runField = makeRunObjectField(authorResolvers);
