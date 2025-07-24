import { QueryResolvers } from "src/generated/graphql-types";
import { Author } from "src/entities";
import { convertInfoToLoadHint } from "joist-graphql-resolver-utils";
import { getMetadata } from "joist-orm";

export const author: Pick<QueryResolvers, "author"> = {
  async author(_, args, ctx, info) {
    const hint = convertInfoToLoadHint(getMetadata(Author), info);
    return ctx.em.load(Author, args.id, hint ?? {});
  },
};
