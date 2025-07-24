import { saveBookReview } from "src/resolvers/bookReview/saveBookReviewMutation";
import { makeRunInputMutation } from "src/resolvers/testUtils";
import { newBook } from "src/entities";

describe("saveBookReview", () => {
  it.withCtx("can create", async (ctx) => {
    newBook(ctx.em);
    const result = await runSaveBookReview(ctx, () => ({
      rating: 1,
      bookId: "b:1",
    }));
    expect(result).toBeDefined();
  });
});

const runSaveBookReview = makeRunInputMutation(saveBookReview);
