import { MutationResolvers } from "src/generated/graphql-types";
import { Author } from "src/entities";

export const deleteAuthor: Pick<MutationResolvers, "deleteAuthor"> = {
  async deleteAuthor(root, args, { em }) {
    em.delete(await em.load(Author, args.id));
    await em.flush();
    return { emptyResult: undefined };
  },
};
