
# Joist Sample App

This is a bare minimum sample app using Joist as an ORM.

There are two domain objects, `Author` and `Book`, and a single test, `Author.test.ts`.

There are no examples of business logic or Joist's various features; for those see the docs.

## Setup

- `yarn i`
- `docker-compose up -d db`
- `yarn pg-migrate`
- `yarn joist-codegen` (if you've made migration/schema changes)
- `yarn test`

## Dependency Compatibility

Dependencies use the latest releases supported by the current tooling:

- `joist-orm` is pinned to `2.4.0`.
- GraphQL stays on `16.14.2` because Mercurius requires GraphQL 16. The `joist-graphql-resolver-utils/graphql` resolution keeps Joist's resolver types on the same version.
- `node-pg-migrate` stays on `8.0.4` to satisfy Joist's peer dependency.
- TypeScript stays on `6.0.3` because `ts-jest` does not support TypeScript 7.

## Example Workflow

A typical workflow for adding a new entity looks like:

- Run `npm run pg-new-migration "add book review"`
- Edit the `migrations/...add-book-review.ts` file and add
  ```typescript
  createEntityTable(pgm, "book_reviews", {
    book_id: foreignKey("books"),
    rating: { type: "integer", notNull: true },
  });
  ```
- Run `yarn pg-migrate`
  - If you change your migration, and want to re-apply it from scratch, run `docker-compose exec db ./reset.sh`
- Run `yarn joist-codegen`
- Copy/paste the `Author.test.ts` and write a test for `Publisher`

## Steps Taken to Setup This Repo

TODO: Automate this with more, probably with mrm.

- Install basic prettier/TypeScript/jest.

  ```shell
  npm install -g mrm
  npm install -g \
    @homebound/mrm-tasks-prettier \
    @homebound/mrm-tasks-gitignore \
    @homebound/mrm-tasks-typescript
  mrm @homebound/mrm-tasks-prettier \
    @homebound/mrm-tasks-gitignore \
    @homebound/mrm-tasks-typescript
  ```

- Copy/paste `migrations/...author.ts`
- Add `joist-orm`, `joist-migration-utils`, `joist-codegen` to `package.json`
- Copy/paste `.env`, changed port
- Add `tsx`, `env-cmd` to `package.json`
  - Should come from `mrm`?
- Add `pg-migrate` script, run it
- Add `joist-codegen` script, run it
- Add `Author.test.ts`
- Add `dotenv` to `package.json`
- Add `pg-new-migration` to `package.json`
- Add `.gitattributes` to suppress diffs on generated files
