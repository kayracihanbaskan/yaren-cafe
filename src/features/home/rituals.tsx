import Image from "next/image";
import { FriendshipArt, Spark } from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";

export function Rituals({ copy }: { copy: DesignCopy }) {
  return (
    <section
      id="ritueller"
      className="rituals paper"
      aria-labelledby="ritual-title"
    >
      <div className="section-shell">
        <p className="eyebrow">{copy.ritualLabel}</p>
        <div className="ritual-composition">
          <div className="ritual-headline">
            <h2 id="ritual-title">
              <span>{copy.ritual[0]}</span>
              <span>{copy.ritual[1]}</span>
              <em>{copy.ritual[2]}</em>
            </h2>
            <Spark className="ritual-spark" />
          </div>
          <div className="ritual-photo">
            <Image
              src="/images/friendship-coffee.webp"
              alt={copy.ritualAlt}
              fill
              sizes="(max-width: 760px) 100vw, 72vw"
              quality={85}
            />
            <span className="ritual-photo-note">{copy.ritualNote}</span>
          </div>
          <div className="friendship-sticker">
            <FriendshipArt />
          </div>
        </div>
        <p className="ritual-body" data-reveal>
          {copy.ritualBody}
        </p>
      </div>
    </section>
  );
}
