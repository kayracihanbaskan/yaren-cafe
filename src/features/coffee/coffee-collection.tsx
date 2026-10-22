import Image from "next/image";
import { Container } from "@/components/ui/container";
import { eyebrow } from "@/components/ui/button";
import { Rosette } from "@/components/ui/icons";
import { StoryExplorer } from "./story-explorer";
import { StoryContent } from "./story-content";
import type { LocalizedCoffee } from "./types";
import type { Messages } from "@/i18n/types";
export function CoffeeCollection({
  coffees,
  copy,
  common,
}: {
  coffees: readonly LocalizedCoffee[];
  copy: Messages["collection"];
  common: Messages["common"];
}) {
  return (
    <section
      id="kahveler"
      aria-labelledby="coffee-title"
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-7 sm:mb-14">
          <div data-reveal>
            <p className={`${eyebrow} mb-5 text-copper`}>{copy.eyebrow}</p>
            <h2
              id="coffee-title"
              tabIndex={-1}
              className="max-w-xl text-4xl leading-[1.2] tracking-tight sm:text-5xl lg:text-[56px]"
            >
              {copy.title[0]}
              <br />
              <em className="text-olive">{copy.title[1]}</em>
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-[1.8] text-muted"
            data-reveal
          >
            {copy.intro}
          </p>
        </div>
        <div className="grid items-start gap-7 md:grid-cols-3 lg:gap-9">
          {coffees.map((coffee, index) => (
            <article
              key={coffee.id}
              aria-labelledby={`${coffee.id}-title`}
              className={`group min-w-0 rounded-card border border-line bg-surface p-3 shadow-warm transition-shadow duration-300 hover:shadow-lg ${index === 1 ? "md:mt-10" : ""}`}
            >
              <div
                data-reveal
                className={`relative aspect-[1.05] overflow-hidden bg-surface-alt ${index === 0 ? "rounded-t-[44%] rounded-b-2xl" : "rounded-[20px]"}`}
              >
                <Image
                  src={coffee.image}
                  alt={coffee.alt}
                  fill
                  sizes="(max-width:767px) 100vw, 33vw"
                  quality={80}
                  style={{ objectPosition: coffee.position }}
                  className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-full border border-white/50 bg-canvas/95 font-sans text-xs font-semibold text-ink">
                  0{index + 1}
                </span>
              </div>
              <div className="px-3 pb-4 pt-6 sm:px-4">
                <p className={`${eyebrow} mb-3 text-copper`}>{coffee.ritual}</p>
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <h3
                    id={`${coffee.id}-title`}
                    className="min-w-0 text-[26px] leading-tight tracking-tight lg:text-[28px]"
                  >
                    {coffee.name}
                  </h3>
                  <span className="pt-1 font-sans text-base font-medium text-olive">
                    ₺{coffee.price}
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted md:min-h-36 lg:min-h-28">
                  {coffee.description}
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={coffee.name}
                >
                  {coffee.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-muted"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line pt-3">
                  <StoryExplorer
                    title={coffee.story.title}
                    name={coffee.name}
                    image={coffee.image}
                    alt={coffee.alt}
                    labels={common}
                  >
                    <StoryContent story={coffee.story} labels={common} />
                  </StoryExplorer>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
          <span className="flex items-center gap-3">
            <Rosette className="size-7 text-copper" />
            {copy.caption}
          </span>
          <p>{common.priceNote}</p>
        </div>
      </Container>
    </section>
  );
}
