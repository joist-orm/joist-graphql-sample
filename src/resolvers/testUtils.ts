import {
  makeMakeRunInputMutation,
  makeMakeRunObjectFields,
  makeMakeRunObjectField,
} from "joist-graphql-resolver-utils/tests";
import { run } from "joist-orm/tests";

export { run };
export const makeRunObjectFields = makeMakeRunObjectFields(run);
export const makeRunObjectField = makeMakeRunObjectField(run);
export const makeRunInputMutation = makeMakeRunInputMutation(run);
