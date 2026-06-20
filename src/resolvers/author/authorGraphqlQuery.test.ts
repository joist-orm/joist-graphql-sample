import { addResolversToSchema } from "@graphql-tools/schema";
import { type IResolvers } from "@graphql-tools/utils";
import { graphql } from "graphql";
import { type Context } from "src/context";
import { EntityManager, newAuthor, newBook, newBookReview } from "src/entities";
import { resolvers } from "src/resolvers";
import { loadGqlSchema } from "src/schema";
import { numberOfQueries, queries, resetQueries } from "src/setupTests";

describe("author graphql query", () => {
  it.withCtx("batches paginated book review queries", async (ctx) => {
    const { em } = ctx;
    const author = newAuthor(em, { firstName: "a1" });
    const b1 = newBook(em, { author, title: "b1" });
    const b2 = newBook(em, { author, title: "b2" });
    const b3 = newBook(em, { author, title: "b3" });

    for (const rating of [1, 2, 3, 4, 5, 6]) {
      newBookReview(em, { book: b1, rating });
    }
    for (const rating of [11, 12, 13, 14, 15, 16]) {
      newBookReview(em, { book: b2, rating });
    }
    for (const rating of [21, 22, 23, 24, 25, 26]) {
      newBookReview(em, { book: b3, rating });
    }
    await em.flush();
    resetQueries();
    const queryCtx = Object.assign({ ...ctx }, { em: new EntityManager(ctx, ctx.driver) });

    const schema = addResolversToSchema({
      schema: await loadGqlSchema(),
      resolvers: { ...(resolvers as unknown as IResolvers<unknown, Context, Record<string, unknown>, unknown>) },
      resolverValidationOptions: {
        requireResolversToMatchSchema: "ignore",
        requireResolversForAllFields: "error",
        requireResolversForResolveType: "error",
      },
    });
    const result = await graphql({
      schema,
      source: `query { author(id: 1) { books { reviews(first: 5) { rating } } } }`,
      contextValue: queryCtx,
    });

    expect(result).toMatchObject({
      data: {
        author: {
          books: [
            { reviews: [{ rating: 1 }, { rating: 2 }, { rating: 3 }, { rating: 4 }, { rating: 5 }] },
            { reviews: [{ rating: 11 }, { rating: 12 }, { rating: 13 }, { rating: 14 }, { rating: 15 }] },
            { reviews: [{ rating: 21 }, { rating: 22 }, { rating: 23 }, { rating: 24 }, { rating: 25 }] },
          ],
        },
      },
    });
    expect(result.errors).toEqual(undefined);
    expect(numberOfQueries).toEqual(3);
    expect(queries.map(normalizeSql)).toEqual([
      `SELECT "a".* FROM authors AS a WHERE a.id = ANY($1) ORDER BY a.id ASC LIMIT $2`,
      `SELECT "b".* FROM books AS b WHERE b.author_id = ANY($1) ORDER BY b.id ASC LIMIT $2`,
      `WITH _find (tag, arg0) AS (SELECT unnest($1::int[]), unnest($2::int[])) SELECT _find.tag as tag, _data.* FROM _find AS _find CROSS JOIN LATERAL (SELECT br.* FROM book_reviews AS br WHERE br.book_id = _find.arg0 ORDER BY br.id ASC LIMIT $3) AS _data`,
    ]);
  });
});

/** Normalizes SQL whitespace so query shape assertions are readable. */
function normalizeSql(sql: string): string {
  return sql.replace(/\s+/g, " ").trim();
}
