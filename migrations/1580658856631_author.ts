import { createCreatedAtFunction, createEntityTable, createUpdatedAtFunction, foreignKey } from "joist-orm/pg-migrate";
import { MigrationBuilder } from "node-pg-migrate";

export function up(b: MigrationBuilder): void {
  createUpdatedAtFunction(b);
  createCreatedAtFunction(b);

  createEntityTable(b, "authors", {
    first_name: { type: "varchar(255)", notNull: true },
    last_name: { type: "varchar(255)", notNull: false },
  });

  createEntityTable(b, "books", {
    title: { type: "varchar(255)", notNull: true },
    author_id: foreignKey("authors", { notNull: true }),
  });

  createEntityTable(b, "book_reviews", {
    rating: { type: "int", notNull: true },
    book_id: foreignKey("books", { notNull: true }),
  });
}
