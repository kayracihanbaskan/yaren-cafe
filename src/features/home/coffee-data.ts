export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: string;
  notes: string;
  image: string;
  alt: string;
  ritual: string;
};
export const coffees: readonly Coffee[] = [
  {
    id: "turk-kahvesi",
    name: "Türk Kahvesi",
    description:
      "Ağır ateşte, sabırla. İncecik öğütülen çekirdeklerden, kırk yıl hatırı kalan bir fincan.",
    price: "₺120",
    notes: "Yoğun · Kadifemsi · Geleneksel",
    image: "/images/turkish-coffee.webp",
    alt: "Ceviz masada bakır cezve ve köpüklü Türk kahvesi fincanı",
    ritual: "KÖKLERİMİZDEN",
  },
  {
    id: "espresso",
    name: "Espresso",
    description:
      "Küçük bir fincanda kocaman bir karakter. Dengeli gövdesi ve kalıcı aromasıyla anın özü.",
    price: "₺110",
    notes: "Güçlü · Dengeli · Çikolata notalı",
    image: "/images/espresso.webp",
    alt: "Ahşap masa üzerinde kremalı sade kahve",
    ritual: "ANIN ÖZÜ",
  },
  {
    id: "filtre-kahve",
    name: "Filtre Kahve",
    description:
      "Aceleye gelmeyen bir lezzet. Özenle seçilen çekirdekler, tane tane açılan aromalar.",
    price: "₺140",
    notes: "Yumuşak · Aromatik · Ferah",
    image: "/images/filter-coffee.webp",
    alt: "Cam demleyiciye ince ağızlı kettle ile dökülen su ve filtre kahve",
    ritual: "YENİ RİTÜELLER",
  },
];
