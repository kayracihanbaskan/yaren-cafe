import { ContactForm } from "@/features/contact/contact-form";
import { FriendshipArt, Spark } from "@/components/brand/coffee-art";
import type { Messages } from "@/i18n/types";
import type { DesignCopy } from "@/i18n/design-copy";

export function ContactSection({
  copy,
  design,
}: {
  copy: Messages["contact"];
  design: DesignCopy;
}) {
  return (
    <section
      id="iletisim"
      className="contact-section paper"
      aria-labelledby="contact-title"
    >
      <div className="section-shell contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">{design.contactLabel}</p>
          <h2 id="contact-title" tabIndex={-1}>
            {design.contact[0]}
            <br />
            <em>{design.contact[1]}</em>
          </h2>
          <p>{design.contactBody}</p>
          <FriendshipArt className="contact-art" />
          <span className="contact-handnote">{design.contactNote}</span>
        </div>
        <div className="contact-paper">
          <Spark className="contact-pin" />
          <ContactForm copy={copy} />
        </div>
      </div>
    </section>
  );
}
