import type { CoffeeId } from "./types";
export type Mood = "conversation" | "escape" | "me-time";
export type Strength = "soft" | "balanced" | "intense";
export type BreakLength = "short" | "medium" | "long";
export type FinderAnswers = {
  mood: Mood;
  strength: Strength;
  breakLength: BreakLength;
};
const moodCoffee: Record<Mood, CoffeeId> = {
  conversation: "turk-kahvesi",
  escape: "espresso",
  "me-time": "filtre-kahve",
};
const strengthCoffee: Record<Strength, CoffeeId> = {
  soft: "filtre-kahve",
  balanced: "turk-kahvesi",
  intense: "espresso",
};
const breakCoffee: Record<BreakLength, CoffeeId> = {
  short: "espresso",
  medium: "turk-kahvesi",
  long: "filtre-kahve",
};
/** Taste has the strongest vote; two matching ritual choices can outweigh it. */
export function recommendCoffee(answers: FinderAnswers): CoffeeId {
  const scores: Record<CoffeeId, number> = {
    "turk-kahvesi": 0,
    espresso: 0,
    "filtre-kahve": 0,
  };
  scores[moodCoffee[answers.mood]] += 2;
  scores[strengthCoffee[answers.strength]] += 3;
  scores[breakCoffee[answers.breakLength]] += 2;
  return (Object.keys(scores) as CoffeeId[]).reduce((best, id) =>
    scores[id] > scores[best] ? id : best,
  );
}
