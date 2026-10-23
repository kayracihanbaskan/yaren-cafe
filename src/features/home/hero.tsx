import Image from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import {
  Bean,
  FortySeal,
  Spark,
  SteamArt,
} from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";

export function Hero({
  copy,
  english,
}: {
  copy: DesignCopy;
  english: boolean;
}) {
  return (
    <section id="baslangic" className="hero paper" aria-labelledby="hero-title">
      <div className="hero-inner section-shell">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {copy.eyebrow}
        </p>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-line">
            {copy.hero[0]}
            <em>{copy.hero[1]}</em>
          </span>
          <span className="hero-line">
            {copy.hero[2]}
            <em>{copy.hero[3]}</em>
          </span>
        </h1>
        <div className="hero-visual">
          <div className="hero-blob" aria-hidden="true" />
          <SteamArt className="hero-steam" />
          <Image
            src="/images/coffee-cutout.webp"
            alt={copy.heroAlt}
            width={1254}
            height={1254}
            className="hero-coffee"
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 65vw, 55vw"
            preload
            quality={85}
          />
          <FortySeal className="hero-seal" english={english} />
          <Spark className="hero-spark" />
          <Bean className="hero-bean bean-one" />
          <Bean className="hero-bean bean-two" />
          <div className="hero-annotation">
            <span>{copy.heroNote}</span>
            <svg viewBox="0 0 100 60" fill="none" aria-hidden="true">
              <path
                d="M4 5c30 1 12 36 75 36m-14-13 16 14-18 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="hero-bottom">
          <p className="hero-slogan">{copy.slogan}</p>
          <p className="hero-intro">{copy.intro}</p>
          <a className="sticker-button" href="#kahveler">
            {copy.discover}
            <ArrowIcon diagonal />
          </a>
        </div>
        <a href="#hikayemiz" className="hero-scroll">
          <span>{copy.scroll}</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
export function CoffeeTicker({ copy }: { copy: DesignCopy }) {
  return (
    <div className="coffee-ticker" aria-label={copy.ticker.join(". ")}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((n) => (
          <div className="ticker-group" key={n}>
            {copy.ticker.map((item) => (
              <span key={item}>
                {item}
                <Spark />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
