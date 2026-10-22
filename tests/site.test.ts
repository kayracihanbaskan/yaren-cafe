import assert from "node:assert/strict";
import { test } from "node:test";
import { getSiteUrl } from "../src/lib/site";
test("custom production domain wins over Vercel host", () =>
  assert.equal(
    getSiteUrl({
      SITE_URL: "https://kahve.example/",
      VERCEL_PROJECT_PRODUCTION_URL: "ignored.vercel.app",
    }).href,
    "https://kahve.example/",
  ));
test("Vercel production host uses HTTPS", () =>
  assert.equal(
    getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "yaren-cafe.vercel.app" }).href,
    "https://yaren-cafe.vercel.app/",
  ));
test("local development has an honest localhost fallback", () =>
  assert.equal(getSiteUrl({}).href, "http://localhost:3000/"));
for (const SITE_URL of [
  "example.com",
  "javascript:alert(1)",
  "ftp://example.com",
  "https://user:secret@example.com",
]) {
  test(`invalid production origin is rejected: ${SITE_URL}`, () =>
    assert.throws(() => getSiteUrl({ SITE_URL }), /SITE_URL/));
}
