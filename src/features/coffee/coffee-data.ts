import type { Coffee, LocalizedCoffee } from "./types";
import type { Messages } from "@/i18n/types";
export const coffees: readonly Coffee[] = [
  {
    id: "turk-kahvesi",
    price: 120,
    image: "/images/turkish-coffee.webp",
    position: "65% center",
  },
  {
    id: "espresso",
    price: 110,
    image: "/images/espresso-cup.webp",
    position: "center",
  },
  {
    id: "filtre-kahve",
    price: 140,
    image: "/images/filter-coffee.webp",
    position: "53% center",
  },
];
export function localizeCoffees(messages: Messages): LocalizedCoffee[] {
  return coffees.map((coffee) => ({
    ...coffee,
    ...messages.coffees[coffee.id],
  }));
}
