import { Wordmark } from "@/components/brand/wordmark";
import { Bean, CezveArt, Spark } from "@/components/brand/coffee-art";
import type { DesignCopy } from "@/i18n/design-copy";

export function SiteFooter({ copy }: { copy: DesignCopy }) {
  const links = ["#hikayemiz", "#kahveler", "#ritueller", "#iletisim"];
  return (
    <footer className="creative-footer dark-paper torn-edge">
      <div className="section-shell">
        <div className="footer-top">
          <p>{copy.footerTop}</p>
          <a href="#baslangic" className="back-top">
            {copy.backTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="footer-brand">
          <Wordmark />
          <CezveArt className="footer-cezve" />
          <Spark className="footer-spark" />
          <Bean className="footer-bean" />
        </div>
        <div className="footer-bottom">
          <p className="footer-slogan">{copy.slogan}</p>
          <nav aria-label={copy.footerLabel}>
            {links.map((href, index) => (
              <a key={href} href={href}>
                {copy.nav[index]}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-legal">
          <span>{copy.rights}</span>
          <span>{copy.fictional}</span>
        </div>
      </div>
    </footer>
  );
}
