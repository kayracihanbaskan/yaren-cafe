export type CoffeeId = "turk-kahvesi" | "espresso" | "filtre-kahve";
export type Coffee = {
  id: CoffeeId;
  price: number;
  image: string;
  position: string;
};
export type CoffeeCopy = {
  name: string;
  description: string;
  notes: readonly string[];
  ritual: string;
  alt: string;
  story: {
    title: string;
    paragraphs: readonly string[];
    steps: readonly string[];
    pairing: string;
  };
};
export type LocalizedCoffee = Coffee & CoffeeCopy;
