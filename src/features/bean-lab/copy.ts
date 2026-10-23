import type { Locale } from "@/i18n/types";

const tr = {
  title: "Çekirdek meselesi · Yâren",
  description:
    "Biraz kahve, biraz oyun. Dökülen kahve çekirdeklerini fare veya parmağınla savur.",
  home: "Yâren'e dön",
  otherLanguage: "Switch to English",
  headline: ["Biraz kahve,", "biraz oyun."],
  intro: "Bazı güzel hikâyeler, biraz dağıtarak başlar.",
  mouse: "Fareyi çekirdeklerin arasından geçir. Gerisini yerçekimine bırak.",
  touch: "Çekirdeklere dokun veya parmağınla yana doğru savur.",
  keyboard: "Klavye: oklarla dağıt, boşlukla duraklat.",
  pause: "Durdur",
  play: "Başlat",
  pour: "Yeniden dök",
  scatter: "Karıştır",
  paused: "Hareket duraklatıldı. Hazır olduğunda başlat.",
  region: "Etkileşimli kahve çekirdeği alanı",
  badge: ["DOKUN.", "DAĞIT.", "TEKRAR."],
  coffee: "Şimdi bir kahve?",
  note: "Çekirdekler dağılsın. Sohbet toparlanır.",
  footer: "Oyun burada, hikâye fincanda.",
  noJs: "Bu küçük oyunu kullanmak için JavaScript'i etkinleştir. Kahvelerimizi keşfetmeye devam edebilirsin.",
};
export type BeanLabCopy = typeof tr;
const en: BeanLabCopy = {
  title: "A little bean play · Yâren",
  description:
    "A little coffee, a little play. Scatter falling coffee beans with your mouse or finger.",
  home: "Back to Yâren",
  otherLanguage: "Türkçeye geç",
  headline: ["A little coffee,", "a little play."],
  intro: "Some good stories start with a little mess.",
  mouse: "Move your mouse through the beans. Let gravity do the rest.",
  touch: "Tap the beans or flick your finger sideways to scatter them.",
  keyboard: "Keyboard: arrows to scatter, space to pause.",
  pause: "Pause",
  play: "Play",
  pour: "Pour again",
  scatter: "Mix it up",
  paused: "Motion is paused. Press play when you are ready.",
  region: "Interactive coffee bean playground",
  badge: ["TOUCH.", "SCATTER.", "REPEAT."],
  coffee: "Now, a coffee?",
  note: "Scatter the beans. Gather the stories.",
  footer: "A little play. A story in every cup.",
  noJs: "Enable JavaScript to play with the beans. You can still explore our coffees.",
};
export function getBeanLabCopy(locale: Locale): BeanLabCopy {
  return locale === "tr" ? tr : en;
}
