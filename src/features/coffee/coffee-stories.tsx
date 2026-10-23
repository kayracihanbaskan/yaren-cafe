import Image from "next/image";
import { Bean, CezveArt, Spark, SteamArt } from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";
import type { LocalizedCoffee } from "./types";

export function CoffeeStories({
  copy,
  coffees,
}: {
  copy: DesignCopy;
  coffees: LocalizedCoffee[];
}) {
  return (
    <div className="coffee-stories">
      {copy.stories.map((story, index) => {
        const coffee = coffees[index];
        return (
          <section
            id={`hikaye-${story.id}`}
            className={`coffee-story coffee-story-${index + 1} ${index === 1 ? "paper" : "dark-paper"}`}
            key={story.id}
            aria-labelledby={`story-heading-${story.id}`}
          >
            <div className="section-shell story-shell">
              <div className="story-photo-wrap">
                <div className="story-photo">
                  <Image
                    src={coffee.image}
                    alt={coffee.alt}
                    fill
                    sizes="(max-width: 760px) 90vw, 48vw"
                    quality={85}
                    style={{ objectPosition: coffee.position }}
                  />
                </div>
                <span className="story-photo-caption">{story.note}</span>
                {index === 0 ? (
                  <CezveArt className="story-doodle" />
                ) : index === 1 ? (
                  <Spark className="story-doodle" />
                ) : (
                  <SteamArt className="story-doodle" />
                )}
              </div>
              <div className="story-text">
                <span className="story-label">{story.label}</span>
                <h2 id={`story-heading-${story.id}`} data-reveal>
                  {story.title[0]}
                  <br />
                  <em>{story.title[1]}</em>
                </h2>
                <p className="story-body" data-reveal>
                  {story.body}
                </p>
                <div className="story-detail">
                  <Bean />
                  <span>{story.detail}</span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
