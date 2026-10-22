import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContact } from "../src/features/contact/validation";
const valid = {
  name: "  Çağrı Şen  ",
  email: "  cagri@example.com  ",
  message: "  Kahve hikâyemi paylaşmak isterim.  ",
};
test("valid Turkish names and trimmed values are accepted", () =>
  assert.deepEqual(validateContact(valid), {}));
for (const field of ["name", "email", "message"] as const) {
  test(`whitespace-only ${field} is rejected`, () =>
    assert.ok(validateContact({ ...valid, [field]: "   " })[field]));
}
for (const email of [
  "cagri",
  "cagri@",
  "@example.com",
  "cagri@example",
  "ca gri@example.com",
  "cagri@@example.com",
]) {
  test(`malformed email ${email} is rejected`, () =>
    assert.ok(validateContact({ ...valid, email }).email));
}
