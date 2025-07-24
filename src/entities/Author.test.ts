import { Author, newAuthor } from "src/entities";

describe("Author", () => {
  it.withCtx("can be created", async ({ em }) => {
    const a = newAuthor(em, {
      firstName: "a1",
      books: [{ title: "b1" }],
    });
    await em.flush();
  });

  it.withCtx("can be created with a factory", async ({ em }) => {
    const a = newAuthor(em);
    await em.flush();
  });
});
