import { newBookReview } from "src/entities";
import { bookReviewResolvers } from "src/resolvers/bookReview/bookReviewResolvers";
import { makeRunObjectField, makeRunObjectFields } from "src/resolvers/testUtils";

describe("bookReviewResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given a Book review
    const br = newBookReview(em);
    // Then we can query it
    const result = await runBookReviewKeys(ctx, br, ["rating"]);
    expect(br).toMatchEntity(result);
  });
});

const runBookReviewKeys = makeRunObjectFields(bookReviewResolvers);
const runBookReview = makeRunObjectField(bookReviewResolvers);
