import { CezveArt, Spark } from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";

export function Manifesto({ copy }: { copy: DesignCopy }) {
  return (
    <section
      id="hikayemiz"
      className="manifesto dark-paper torn-edge"
      aria-labelledby="story-title"
      data-sc-act="flow"
    >
      <div className="section-shell">
        <div className="manifesto-grid">
          <div className="manifesto-heading">
            <h2 id="story-title" tabIndex={-1}>
              <span className="manifesto-line manifesto-line-one">
                {copy.manifesto[0]}
              </span>
              <br />
              <em className="manifesto-line manifesto-line-two">
                {copy.manifesto[1]}
              </em>
            </h2>
            <CezveArt className="manifesto-cezve" />
          </div>
          <div className="manifesto-copy" data-reveal>
            <Spark />
            <p className="manifesto-lead">{copy.manifestoIntro}</p>
            <p>{copy.manifestoBody}</p>
          </div>
        </div>
        <div className="proverb">
          <span aria-hidden="true">“</span>
          <blockquote>{copy.proverb}</blockquote>
          <p>{copy.manifestoNote}</p>
        </div>
      </div>
    </section>
  );
}
