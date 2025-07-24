import { Context } from "src/context";
import { QueryTestQueryArgs } from "src/generated/graphql-types";
import { testQuery } from "src/resolvers/queries/testQueryQuery";
import { run } from "src/resolvers/testUtils";
import { fail } from "src/utils";

describe("testQuery", () => {
  it.withCtx("always returns 1", async (ctx) => {
    const result = await runTestQuery(ctx, () => ({ error: false }));
    expect(result).toBe(1);
  });
});

async function runTestQuery(ctx: Context, argsFn: () => QueryTestQueryArgs) {
  return await run(ctx, async () => {
    return testQuery.testQuery({}, argsFn(), ctx, undefined!);
  });
}
