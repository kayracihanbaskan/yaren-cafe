import Image from "next/image";
import { MeetingCups, Spark } from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";

export function Rituals({ copy }: { copy: DesignCopy }) {
  return (
    <section
      id="ritueller"
      className="rituals paper"
      aria-labelledby="ritual-title"
      data-sc-act="flow"
      data-sc-span="3"
    >
      <div className="ritual-stage" data-sc-stage>
        <div className="section-shell">
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
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 72vw"
                quality={85}
                className="ritual-photo-ground"
              />
              <div
                className="ritual-photo-window"
                data-sc-reveal="iris"
                data-sc-reveal-at="0 0.55"
              >
                <Image
                  src="/images/friendship-coffee.webp"
                  alt={copy.ritualAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 72vw"
                  quality={85}
                />
              </div>
              <span className="ritual-photo-note">{copy.ritualNote}</span>
            </div>
            <div className="friendship-sticker">
              <MeetingCups />
            </div>
          </div>
          <p className="ritual-body">{copy.ritualBody}</p>
        </div>
      </div>
    </section>
  );
}
