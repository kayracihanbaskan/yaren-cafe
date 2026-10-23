import { Bean, Spark } from "@/components/brand/coffee-art";
import { ArrowIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/types";
import { BeanPlayground } from "./bean-playground";
import { getBeanLabCopy } from "./copy";
import "@/styles/bean-lab.css";

export function BeanMoment({ locale }: { locale: Locale }) {
  const copy = getBeanLabCopy(locale);

  return (
    <section
      className="bean-lab-scene paper"
      id="cekirdek-masasi"
      aria-labelledby="bean-title"
      data-sc-act="flow"
    >
      <div className="bean-lab-surface">
        <BeanPlayground copy={copy}>
          <div
            className="bean-lab-background"
            aria-hidden="true"
            data-sc-parallax="-.45"
          >
            <span className="bean-stain stain-one" />
            <span className="bean-stain stain-two" />
            <Spark className="bean-scene-spark" />
          </div>
          <div className="bean-lab-copy section-shell">
            <span className="bean-lab-label">
              <span />
              {locale === "tr"
                ? "CİDDİ KAHVE. KÜÇÜK BİR OYUN."
                : "SERIOUS COFFEE. A LITTLE PLAY."}
            </span>
            <h2 id="bean-title">
              <span>{copy.headline[0]}</span>
              <em>{copy.headline[1]}</em>
            </h2>
            <p className="bean-lab-intro">{copy.intro}</p>
            <p id="bean-instructions" className="bean-lab-hint">
              <span className="bean-mouse-hint">{copy.mouse}</span>
              <span className="bean-touch-hint">{copy.touch}</span>
            </p>
            <a href="#kahveler" className="sticker-button bean-coffee-link">
              {copy.coffee}
              <ArrowIcon diagonal />
            </a>
          </div>
          <div className="bean-lab-badge" aria-hidden="true">
            <Bean />
            <span>{copy.badge[0]}</span>
            <span>{copy.badge[1]}</span>
            <em>{copy.badge[2]}</em>
          </div>
        </BeanPlayground>
        <div className="bean-lab-floor dark-paper" aria-hidden="true" />
      </div>
      <div className="bean-lab-note dark-paper">
        <div className="section-shell">
          <p>{copy.note}</p>
          <a href="#ritueller">
            {copy.footer}
            <ArrowIcon diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
