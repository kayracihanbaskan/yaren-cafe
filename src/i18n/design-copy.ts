import type { Locale } from "./types";

const tr = {
  nav: ["Hikâyemiz", "Kahveler", "Ritüeller", "İletişim"],
  menu: "Menüyü aç",
  closeMenu: "Menüyü kapat",
  navigation: "Ana navigasyon",
  hello: "Bir merhaba",
  language: "Switch to English",
  eyebrow: "KÖKLERİ TANIDIK. HİKÂYESİ YENİ.",
  hero: ["Kahve", "bahane.", "Hikâye", "baki."],
  slogan: "Her fincanda ortak bir hikâye.",
  intro:
    "Biraz kahve, bolca yârenlik. Tanıdık bir kokunun etrafında buluşalım; gerisini sohbet getirsin.",
  discover: "Kahveleri Keşfet",
  scroll: "Aşağıda daha çok hikâye var",
  heroNote: "Aceleye değil, sohbete demlendi.",
  heroAlt: "Köpüklü Türk kahvesiyle dolu seramik fincan, tabağı ve bakır cezve",
  seal: "HATIRI VAR",
  years: "YIL",
  stamp: "İYİ KAHVE · GÜZEL SOHBET",
  ticker: [
    "KAHVE BAHANE",
    "SOHBET ŞAHANE",
    "BİR FİNCAN DAHA?",
    "İYİ Kİ GELDİN",
  ],
  manifestoLabel: "YÂREN OLMAK",
  manifesto: ["Bir fincan,", "bin hikâye."],
  manifestoIntro: "Yâren; dost, yol arkadaşı, aynı masada buluşan demek.",
  manifestoBody:
    "Bizim için kahve, bir içecekten biraz fazlası. Bazen eski bir dostla kaldığın yerden devam etmek, bazen kendine ayırdığın küçücük bir mola. Köklerimizden aldığımız sıcaklığı, bugünün kahve merakıyla aynı fincanda buluşturuyoruz.",
  proverb: "Bir fincan kahvenin kırk yıl hatırı vardır.",
  manifestoNote: "Biz o hatırın peşindeyiz.",
  collectionLabel: "FİNCANINI SEÇ",
  collection: ["Üç kahve.", "Üç hikâye."],
  collectionIntro:
    "Aynı masanın farklı karakterleri. Bugün hangi hikâyeye ortaksın?",
  collectionNote: "Fiyatlar örnek menümüze aittir.",
  previousCoffee: "Önceki kahve",
  nextCoffee: "Sonraki kahve",
  storyLink: "Hikâyesine bak",
  productLabels: [
    "KIRK YILLIK HATIR",
    "KÜÇÜK AMA GÜÇLÜ",
    "YAVAŞLA, TADINI ÇIKAR",
  ],
  storiesLabel: "ÇEKİRDEKTEN HİKÂYEYE",
  stories: [
    {
      id: "turk-kahvesi",
      label: "TÜRK KAHVESİ",
      title: ["Kırk yıllık", "hatır."],
      body: "Cezvenin başında başlayan, son yudumdan çok sonra devam eden bir hikâye. İncecik öğütülmüş kahve, ağır ateş ve biraz sabır. Yanında bir lokum, karşında sevdiğin biri. Bizce bazı gelenekler, her gün yeniden yaşanmaya değer.",
      note: "Bir fincanın etrafında koca bir dünya.",
      detail: "AĞIR ATEŞ · İNCE ÖĞÜTÜM · BOL SOHBET",
    },
    {
      id: "espresso",
      label: "ESPRESSO",
      title: ["Anın", "enerjisi."],
      body: "İtalyan kahve geleneğinden, günün tam ortasına. Yoğun aroma, fındık rengi krema ve birkaç yudumda kendini anlatan güçlü bir karakter. Sabahın ilk adımına ya da günün küçük molasına eşlik eden, kısa ama akılda kalan bir hikâye.",
      note: "Küçük bir fincan. Kocaman bir başlangıç.",
      detail: "YOĞUN AROMA · GÜÇLÜ KARAKTER",
    },
    {
      id: "filtre-kahve",
      label: "FİLTRE KAHVE",
      title: ["Zamanın", "tadı."],
      body: "Her şeyin hızlandığı bir günde, biraz yavaşlamaya davet. Suyun kahveyle usulca buluşmasını izle. Pencereyi arala, sevdiğin plağı çevir. Sabırla demlenen bir fincan; sakin sabahların, uzun okumaların ve kendine ayırdığın zamanın yâreni.",
      note: "Güzel şeyler biraz zaman ister.",
      detail: "YAVAŞ DEMLEME · YUMUŞAK İÇİM",
    },
  ],
  ritualLabel: "EN GÜZEL RİTÜEL: BİRLİKTE",
  ritual: ["Gönül", "sohbet ister,", "kahve bahane."],
  ritualBody:
    "Masanın bir ucunda sen, diğer ucunda bir yâren. İki fincan arasına sığan onca şey… Bazen ihtiyacımız olan tam da bu.",
  ritualAlt:
    "Ceviz masada iki dostun paylaştığı, lokum ve suyla sunulan iki fincan Türk kahvesi",
  ritualNote: "Bir sana, bir bana.",
  contactLabel: "SOHBET BURADAN BAŞLASIN",
  contact: ["Bir kahve,", "bir merhaba?"],
  contactBody:
    "Aklında bir soru, anlatacak bir hikâye ya da sadece bir merhaba mı var? Masamızda sana da yer var.",
  contactNote: "Güzel sohbetler bir merhabayla başlar.",
  footerTop: "Kahve biter. Yârenlik kalır.",
  backTop: "Yukarı dön",
  fictional: "Hayali bir marka. Gerçek bir kahve sevgisi.",
  rights: "© 2026 Yâren",
  footerLabel: "Alt navigasyon",
};

export type DesignCopy = typeof tr;
const en: DesignCopy = {
  nav: ["Our story", "Coffees", "Rituals", "Say hello"],
  menu: "Open menu",
  closeMenu: "Close menu",
  navigation: "Main navigation",
  hello: "Say hello",
  language: "Türkçeye geç",
  eyebrow: "FAMILIAR ROOTS. FRESH STORIES.",
  hero: ["Coffee", "brings us.", "Stories", "keep us."],
  slogan: "A shared story in every cup.",
  intro:
    "A little coffee, a lot of companionship. Come for a familiar aroma; stay for the conversation.",
  discover: "Discover our coffees",
  scroll: "More stories below",
  heroNote: "Brewed for company, never in a hurry.",
  heroAlt:
    "A handmade Turkish coffee cup with frothy coffee, an ivory saucer and a copper cezve",
  seal: "OF FRIENDSHIP",
  years: "YEARS",
  stamp: "GOOD COFFEE · GREAT COMPANY",
  ticker: [
    "COME FOR COFFEE",
    "STAY FOR COMPANY",
    "ONE MORE CUP?",
    "GLAD YOU'RE HERE",
  ],
  manifestoLabel: "THE MEANING OF YÂREN",
  manifesto: ["One cup,", "a thousand stories."],
  manifestoIntro:
    "Yâren means a friend, a companion, someone to share a table with.",
  manifestoBody:
    "To us, coffee is a little more than a drink. It is picking up where you left off with an old friend, or taking a small moment for yourself. We bring the warmth of our roots and the curiosity of today's coffee culture together in one cup.",
  proverb: "A cup of coffee is remembered for forty years.",
  manifestoNote: "That is the kind of connection we brew.",
  collectionLabel: "CHOOSE YOUR CUP",
  collection: ["Three coffees.", "Three stories."],
  collectionIntro:
    "Different characters at the same table. Which story feels like yours today?",
  collectionNote: "Prices are examples from our illustrative menu.",
  previousCoffee: "Previous coffee",
  nextCoffee: "Next coffee",
  storyLink: "Explore the story",
  productLabels: [
    "FORTY YEARS OF FRIENDSHIP",
    "SMALL BUT MIGHTY",
    "SLOW DOWN. SIP SLOWLY.",
  ],
  storiesLabel: "FROM BEAN TO STORY",
  stories: [
    {
      id: "turk-kahvesi",
      label: "TURKISH COFFEE",
      title: ["A lasting", "friendship."],
      body: "A story that starts at the cezve and carries on long after the last sip. Finely ground coffee, a gentle heat, a little patience. A Turkish delight on the side and a friend across the table. Some traditions deserve to be lived again, every day.",
      note: "A whole world around one little cup.",
      detail: "GENTLE HEAT · FINE GRIND · GOOD COMPANY",
    },
    {
      id: "espresso",
      label: "ESPRESSO",
      title: ["A moment", "of energy."],
      body: "From Italian coffee heritage to the heart of your day. A rich aroma, hazelnut crema and a bold character that speaks in just a few sips. The first step of your morning or a little afternoon pause: a short story that stays with you.",
      note: "A little cup. A big beginning.",
      detail: "RICH AROMA · BOLD CHARACTER",
    },
    {
      id: "filtre-kahve",
      label: "FILTER COFFEE",
      title: ["Take your", "time."],
      body: "An invitation to slow down when everything else speeds up. Watch the water gently meet the grounds. Open the window, put on your favourite record. A patiently brewed companion for quiet mornings, long reads and moments of your own.",
      note: "Good things take a little time.",
      detail: "SLOW BREW · SMOOTH SIP",
    },
  ],
  ritualLabel: "OUR FAVOURITE RITUAL: TOGETHER",
  ritual: ["The heart", "wants company,", "coffee helps."],
  ritualBody:
    "You at one end of the table, a friend at the other. All the things that fit between two cups. Sometimes, this is all we need.",
  ritualAlt:
    "Two friends sharing two small cups of Turkish coffee with water and Turkish delight on a walnut table",
  ritualNote: "One for you, one for me.",
  contactLabel: "LET'S START A CONVERSATION",
  contact: ["A coffee,", "a hello?"],
  contactBody:
    "A question, a story to tell, or just a hello? There is always a place for you at our table.",
  contactNote: "Good conversations start with a hello.",
  footerTop: "Coffee ends. Companionship stays.",
  backTop: "Back to top",
  fictional: "An imagined brand. A real love of coffee.",
  rights: "© 2026 Yâren",
  footerLabel: "Footer navigation",
};

export function getDesignCopy(locale: Locale): DesignCopy {
  return locale === "tr" ? tr : en;
}
