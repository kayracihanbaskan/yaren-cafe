import { ContactForm } from "@/features/contact/contact-form";
import { BrandMark } from "@/components/brand/brand-mark";
export function ContactSection() {
  return (
    <section
      className="contact container"
      id="iletisim"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <p className="eyebrow">03 / BİR MERHABA İLE BAŞLAR</p>
        <h2 id="contact-title" tabIndex={-1}>
          Bir fincan da
          <br />
          <em>sohbete ayıralım.</em>
        </h2>
        <p>
          Bir fikrin, bir sorun ya da sadece
          <br />
          paylaşmak istediğin bir kahve hikâyen mi var?
          <br />
          Seni dinlemeyi isteriz.
        </p>
        <BrandMark className="contact-mark" />
      </div>
      <div className="contact-form-slot">
        <ContactForm />
      </div>
    </section>
  );
}
