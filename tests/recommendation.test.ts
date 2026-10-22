import assert from "node:assert/strict";
import { test } from "node:test";
import {
  recommendCoffee,
  type FinderAnswers,
} from "../src/features/coffee/recommendation";
const cases = [
  ["conversation", "soft", ["filtre-kahve", "turk-kahvesi", "filtre-kahve"]],
  [
    "conversation",
    "balanced",
    ["turk-kahvesi", "turk-kahvesi", "turk-kahvesi"],
  ],
  ["conversation", "intense", ["espresso", "turk-kahvesi", "espresso"]],
  ["escape", "soft", ["espresso", "filtre-kahve", "filtre-kahve"]],
  ["escape", "balanced", ["espresso", "turk-kahvesi", "turk-kahvesi"]],
  ["escape", "intense", ["espresso", "espresso", "espresso"]],
  ["me-time", "soft", ["filtre-kahve", "filtre-kahve", "filtre-kahve"]],
  ["me-time", "balanced", ["turk-kahvesi", "turk-kahvesi", "filtre-kahve"]],
  ["me-time", "intense", ["espresso", "espresso", "filtre-kahve"]],
] as const;
for (const [mood, strength, expected] of cases) {
  for (const [index, breakLength] of ["short", "medium", "long"].entries()) {
    const answers = { mood, strength, breakLength } as FinderAnswers;
    test(`${mood}, ${strength}, ${breakLength} recommends ${expected[index]}`, () =>
      assert.equal(recommendCoffee(answers), expected[index]));
  }
}
