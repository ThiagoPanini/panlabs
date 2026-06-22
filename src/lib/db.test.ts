import { describe, expect, it } from "vitest";
import { ensureSchema, type Queryable } from "./db";

function fakeDb() {
  const statements: string[] = [];
  const db: Queryable = {
    async query(sql: string) {
      statements.push(sql);
      return { rows: [] };
    },
  };
  return { db, statements };
}

describe("ensureSchema", () => {
  it("creates the click_event table with slug and ts columns, idempotently", async () => {
    const { db, statements } = fakeDb();
    await ensureSchema(db);
    expect(statements).toHaveLength(1);
    const ddl = statements[0];
    expect(ddl).toMatch(/create table if not exists click_event/i);
    expect(ddl).toMatch(/\bslug\b/);
    expect(ddl).toMatch(/\bts\b/);
  });
});
