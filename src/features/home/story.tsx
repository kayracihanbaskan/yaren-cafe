import Image from "next/image";
import { Motif } from "@/components/ui/icons";
export function Story() {
  return (
    <section id="hikayemiz" className="story" aria-labelledby="story-title">
      <div className="container story-grid">
        <div className="story-image" data-reveal>
          <Image
            src="/images/shared-coffee.webp"
            alt="Bir masa etrafında kahvelerini bir araya getiren dostlar"
            fill
            sizes="(max-width: 767px) 100vw, 40vw"
          />
          <span className="story-image-note">
            KAHVE BAHANE. YÂRENLİK ŞAHANE.
          </span>
        </div>
        <div className="story-copy" data-reveal>
          <p className="eyebrow">02 / BİZİM HİKÂYEMİZ</p>
          <Motif />
          <h2 id="story-title" tabIndex={-1}>
            Bir kahveden
            <br />
            <em>çok daha fazlası.</em>
          </h2>
          <p>
            Yâren; dost demek, yol arkadaşı demek.
            <br />
            Bizim içinse aynı masada buluşmak demek.
          </p>
          <p>
            Cezvenin tanıdık sesini, espresso’nun güçlü karakterini ve taze
            demlenmiş bir filtrenin merakını aynı hikâyede buluşturuyoruz. Çünkü
            yöntemler değişse de iyi kahvenin etrafında kurulan bağ hep aynı.
          </p>
          <span className="story-signature">
            Bir fincan ayır, hikâyeye katıl.
          </span>
        </div>
      </div>
    </section>
  );
}
