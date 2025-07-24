import { newBook } from "src/entities";
import { bookResolvers } from "src/resolvers/book/bookResolvers";
import { makeRunObjectField, makeRunObjectFields } from "src/resolvers/testUtils";

describe("bookResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    const b = newBook(em, { title: "b1" });
    const result = await runFields(ctx, b, ["title"]);
    expect(result).toMatchEntity({ title: "b1" });
  });
});

const runFields = makeRunObjectFields(bookResolvers);
const runField = makeRunObjectField(bookResolvers);
