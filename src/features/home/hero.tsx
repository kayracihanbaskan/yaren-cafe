import Image from "next/image";
import { ArrowIcon, Motif, SunIcon } from "@/components/ui/icons";
export function Hero() {
  return (
    <section
      className="hero container"
      aria-labelledby="hero-title"
      id="baslangic"
    >
      <div className="hero-copy">
        <p className="eyebrow hero-enter">
          <SunIcon /> GELENEKTEN GELEN, BUGÜNE DEMLENEN
        </p>
        <h1 id="hero-title" className="hero-enter">
          Her fincanda <em>ortak bir</em> hikâye.
        </h1>
        <p className="hero-description hero-enter">
          Biraz gelenek, biraz merak.
          <br />
          Bizi bir araya getiren, iyi bir kahve.
        </p>
        <div className="hero-actions hero-enter">
          <a href="#kahveler" className="button button-primary">
            Kahveleri Keşfet <ArrowIcon />
          </a>
          <a href="#hikayemiz" className="text-link">
            Yâren’i tanı <ArrowIcon diagonal />
          </a>
        </div>
        <div className="hero-note">
          <Motif />
          <span>
            KÖKLERİ TANIDIK.
            <br />
            HİKÂYESİ YEPYENİ.
          </span>
        </div>
      </div>
      <div className="hero-visual hero-enter">
        <div className="hero-image">
          <Image
            src="/images/turkish-coffee.webp"
            alt="Gün ışığında ahşap masa üzerinde Türk kahvesi, bakır cezve ve zeytin dalı"
            fill
            preload
            sizes="(max-width: 767px) 100vw, 52vw"
            quality={85}
          />
          <div className="image-caption">
            <span>BİR FİNCANLIK MOLA</span>
            <span>YÂREN İLE</span>
          </div>
        </div>
        <div className="hero-seal" aria-hidden="true">
          <span>İYİ KAHVE</span>
          <Motif />
          <span>GÜZEL SOHBET</span>
        </div>
        <p className="photo-note">
          <span>01 / KAHVENİN BİRLEŞTİREN HÂLİ</span>
          <span>YAVAŞLA. TADINI ÇIKAR.</span>
        </p>
      </div>
    </section>
  );
}
