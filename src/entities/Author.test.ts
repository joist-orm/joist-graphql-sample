import { newAuthor } from "src/entities";

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

  it.withCtx("can be created with books and reviews", async function (ctx) {
    const { em } = ctx;
    newAuthor(em, {
      firstName: "a1",
      books: Array.from({ length: 10 }, (_, bookIndex) => ({
        title: `b${bookIndex + 1}`,
        reviews: Array.from({ length: 10 }, (_, reviewIndex) => ({
          rating: reviewIndex + 1,
        })),
      })),
    });
    await em.flush();
  });
});
