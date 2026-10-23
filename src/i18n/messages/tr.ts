import type { Messages } from "../types";
const tr: Messages = {
  meta: {
    title: "Yâren — Her fincanda ortak bir hikâye.",
    description:
      "Türk kahvesinin hatırı, espresso'nun karakteri ve filtre kahvenin sakinliği. Yâren'in avlusunda kahveni keşfet, hikâyesine ortak ol.",
  },
  common: {
    skip: "İçeriğe geç",
    close: "Hikâyeyi kapat",
    story: "Hikâyesini keşfet",
    readTime: "Bir fincanlık okuma",
    brewing: "Fincana giden yol",
    pairing: "Yanına ne yakışır?",
    priceNote: "Bu avludaki fiyatlar örnek menümüze aittir.",
    backTop: "Başa dön",
    noJsFinder:
      "Kahve bulucuyu kullanmak için JavaScript’i etkinleştirebilirsin. Bu arada kahvelerimizin hikâyelerini keşfetmeye ne dersin?",
  },
  nav: {
    coffees: "Kahvelerimiz",
    story: "Hikâyemiz",
    finder: "Kahveni bul",
    contact: "Bir merhaba",
    menu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    theme: "Görünüm",
    language: "Dil",
    label: "Ana navigasyon",
  },
  theme: { light: "Açık", dark: "Koyu", system: "Sistem" },
  hero: {
    eyebrow: "GELENEKTEN GELEN, BUGÜNE DEMLENEN",
    lines: ["Her fincanda", "ortak bir", "hikâye."],
    description:
      "Bir cezvenin tanıdık sesi, bir fincanın sıcacık hatırı. Aceleyi kapıda bırak; burada kahveye de sohbete de yer var.",
    discover: "Kahveleri Keşfet",
    find: "Bugünkü kahveni bul",
    seal: ["İYİ KAHVE", "GÜZEL SOHBET"],
    caption: "Gün ışığı, biraz kahve, biraz yârenlik.",
    note: "Aceleye değil, sohbete demlendi.",
    values: ["Kökleri tanıdık", "Her fincanı özenli", "Sohbeti hep sıcak"],
  },
  collection: {
    eyebrow: "01 / FİNCANINI SEÇ",
    title: ["Her damak için", "bir yâren."],
    intro:
      "Kimi tanıdık bir hatır, kimi yepyeni bir merak. Üç kahve, üç ayrı ritüel; aynı masada buluşan hikâyeler.",
    caption: "Lezzeti fincanda, hikâyesi bir tık ötede.",
  },
  coffees: {
    "turk-kahvesi": {
      name: "Türk Kahvesi",
      description:
        "Ağır ateşte, sabırla. İncecik öğütülen çekirdeklerden, kırk yıl hatırı kalan bir fincan.",
      notes: ["Kadifemsi", "Dengeli", "Kalıcı"],
      ritual: "KÖKLERİMİZDEN",
      alt: "Ceviz masada bakır cezve ve köpüklü Türk kahvesi fincanı",
      story: {
        title: "Bir fincanın kırk yıllık hatırı",
        paragraphs: [
          "Türk kahvesi, yalnızca bir demleme yöntemi değil, birlikte geçirilen zamana açılan küçük bir kapıdır. İncecik öğütülen kahve, suyla cezvede buluşur; telvesi süzülmeden fincana alınır. Köpüğü, kokusu ve yavaş yavaş içilen son yudumu bu ritüelin ayrı parçalarıdır. Kahvenin yanında sunulan su, lokum ve en önemlisi sohbet, misafirperverliğin gündelik diline dönüşür.",
          "Yâren’de bu tanıdık ritüele özenle yaklaşırız. Kahveyi aceleye getirmeden hazırlar, telvenin dinlenmesine ve aromanın kendini göstermesine zaman tanırız. Damakta kalan gövdesini küçük yudumlarla keşfetmek, fincanın etrafında açılan sohbete kulak vermek isteriz. Bir komşu ziyareti, bir dost buluşması ya da kendine ayırdığın sessiz bir an; fincan küçük olsa da ona eşlik eden hikâyenin yeri hep geniştir. Belki de kahvenin hatırı tam burada başlar.",
        ],
        steps: [
          "İnce öğütülmüş kahveyi suyla cezvede buluştur.",
          "Yavaşça ısıt; köpüğün yükselişine zaman tanı.",
          "Fincana al, telvenin dinlenmesini bekle ve küçük yudumlarla iç.",
        ],
        pairing: "Bir bardak su, küçük bir lokum ve uzamaya müsait bir sohbet.",
      },
    },
    espresso: {
      name: "Espresso",
      description:
        "Küçük bir fincanda güçlü bir karakter. Fındık rengi kreması ve yoğun aromasıyla anın özü.",
      notes: ["Yoğun", "Çikolata notalı", "Güçlü"],
      ritual: "ANIN ÖZÜ",
      alt: "Ahşap masada küçük seramik fincanda fındık rengi kremalı espresso",
      story: {
        title: "Küçük fincan, güçlü karakter",
        paragraphs: [
          "Espresso’nun hikâyesi, İtalyan kahve kültürünün kısa ama özenli molalarında hayat bulur. İnce öğütülmüş kahveden basınçla geçirilen sıcak su, küçük bir fincanda yoğun bir içim oluşturur. Yüzeyindeki fındık rengi krema, gövdesi ve kalıcı aroması bir araya gelir. Bu küçük hacim, kahveyi aceleyle tüketmek gerektiği anlamına gelmez; birkaç yudumun içinde bile durup fark edilecek pek çok ayrıntı vardır.",
          "Yâren’de espresso’yu bir başlangıç noktası olarak görürüz. Önce kokusuna yaklaş, sonra ilk yudumun gövdesini ve bitişte kalan notaları fark et. Çekirdek, öğütüm ve hazırlama arasındaki denge, fincanın karakterini belirler. Kısa bir kaçamak aradığında ya da günün içinden kendine küçük bir parantez açtığında ona yer ayırabilirsin. Uzun bir hikâyeyi bazen tek cümle anlatır; espresso da kahvenin böyle yoğun, yalın ve kendinden emin bir cümlesidir.",
        ],
        steps: [
          "Çekirdeği ince ve eşit biçimde öğüt.",
          "Sıcak suyu kahve yatağından basınçla geçir.",
          "Taze hazırlanan küçük fincanı koklayarak, birkaç sakin yudumda keşfet.",
        ],
        pairing:
          "Küçük bir parça bitter çikolata ve günün içinden kısa bir parantez.",
      },
    },
    "filtre-kahve": {
      name: "Filtre Kahve",
      description:
        "Aceleye gelmeyen bir lezzet. Suyun ritmiyle açılan aromalar, uzun molalara eşlik eden yumuşak bir içim.",
      notes: ["Yumuşak", "Aromatik", "Ferah"],
      ritual: "YAVAŞLIĞIN GÜZELLİĞİ",
      alt: "Cam demleyicide suyun ritmiyle hazırlanan filtre kahve",
      story: {
        title: "Yavaşlığın güzel tarafı",
        paragraphs: [
          "Filtre kahvenin hikâyesinde suyun akışına, çekirdeğin kokusuna ve beklemeye ayrılmış bir yer vardır. Sıcak su öğütülmüş kahvenin içinden geçerken çözünmüş aromaları fincana taşır; filtre ise telveyi geride bırakır. Sonuç, çekirdeğin farklı notalarını fark etmeye alan açan daha berrak bir içimdir. Demleme yöntemi değişebilir, ancak su, öğütüm ve zaman arasındaki ilişki fincanın karakterinde hep söz sahibidir.",
          "Yâren’de filtre kahve, uzun molaların sakin yârenidir. İlk sıcak yudumdan fincanın biraz soğuduğu ana kadar aromanın nasıl değiştiğini izlemeyi severiz. Bir kitabın birkaç sayfası, pencere kenarında geçen zaman ya da akıp giden bir sohbet için masada yerini alır. Mükemmel bir ritüel kurmana gerek yoktur; fincanı eline alıp kokusuna bir an ayırman yeter. Bazen günün en güzel ayrıntısı, hiçbir yere yetişmeden içtiğin bir kahvenin içinde saklanır.",
        ],
        steps: [
          "Filtreni hazırlayıp kahveyi uygun kalınlıkta öğüt.",
          "Suyu kontrollü ve dengeli bir akışla kahveye ekle.",
          "Demlemenin tamamlanmasını bekle; aromaları fincan soğudukça yeniden keşfet.",
        ],
        pairing:
          "Bir dilim sade kek, birkaç kitap sayfası ve kendine ayırdığın zaman.",
      },
    },
  },
  finder: {
    eyebrow: "02 / KÜÇÜK BİR KEŞİF",
    title: "Bugünkü kahveni bul",
    intro:
      "Her günün ritmi başka. Üç küçük seçim yap, bugünün yârenini birlikte bulalım.",
    step: "ADIM",
    next: "Devam",
    back: "Geri",
    submit: "Kahvemi bul",
    reset: "Yeniden keşfet",
    result: "Bugünün yâreni",
    resultNote: "Seçimlerine göre küçük bir lezzet önerisi.",
    resultReasons: {
      "turk-kahvesi":
        "Tanıdık bir ritüel, dengeli bir tat ve sohbete ayrılmış bir fincan. Bugün sana Türk kahvesi yakışır.",
      espresso:
        "Kısa bir mola, yoğun bir karakter. Günün içinden açtığın bu küçük paranteze espresso eşlik etsin.",
      "filtre-kahve":
        "Yumuşak aromalar ve kendine ayırdığın zaman. Bugünün sakin ritmine filtre kahve eşlik etsin.",
    },
    mood: {
      title: "Nasıl bir anın içindesin?",
      options: {
        conversation: "Sohbet uzasın",
        escape: "Kısa bir kaçamak",
        "me-time": "Kendime vakit",
      },
    },
    strength: {
      title: "Nasıl bir tat arıyorsun?",
      options: { soft: "Yumuşak", balanced: "Dengeli", intense: "Yoğun" },
    },
    breakLength: {
      title: "Molan ne kadar?",
      options: {
        short: "2–3 dakika",
        medium: "5–10 dakika",
        long: "Uzun bir mola",
      },
    },
  },
  story: {
    imageAlt:
      "Üç arkadaşın bir masa üzerinde birbirine uzattığı kahve fincanları",
    eyebrow: "03 / BİZİM HİKÂYEMİZ",
    title: ["Kahve bahane,", "yârenlik şahane."],
    lead: "Yâren; dost demek, yol arkadaşı demek. Bizim içinse aynı masada buluşmak demek.",
    body: "Cezvenin tanıdık sesini, espresso’nun güçlü karakterini ve taze demlenmiş bir filtrenin merakını aynı avluda buluşturuyoruz. Yöntemler değişse de iyi kahvenin etrafında kurulan bağ hep aynı. Bir fincan ayır; bu masada senin hikâyene de yer var.",
    signature: "Özenle demlendi, keyifle paylaşıldı.",
    caption: "Aynı masada, bambaşka hikâyeler.",
    values: ["Tanıdık kökler", "Taze bir merak", "Paylaşılan bir an"],
  },
  contact: {
    imageAlt:
      "Gün ışığındaki ahşap kafe masasında Türk kahvesi, su, lokum ve zeytin dalı",
    formLabel: "Yâren iletişim formu",
    eyebrow: "04 / BİR MERHABA İLE BAŞLAR",
    title: ["Masamızda sana da", "yer var."],
    intro:
      "Bir fikrin, bir sorun ya da anlatmak istediğin bir kahve hikâyen mi var? Fincanını al, sohbete katıl.",
    caption: "Bir fincan kahve, bir bardak su, biraz da sohbet.",
    note: "Küçük bir tanışma provası. Bu örnek form mesaj göndermez ve bilgilerini kaydetmez.",
    noJs: "Formu kullanmak için JavaScript’i etkinleştirebilirsin.",
    name: "Ad Soyad",
    email: "E-posta",
    message: "Mesaj",
    namePlaceholder: "Sana nasıl seslenelim?",
    emailPlaceholder: "merhaba@ornek.com",
    messagePlaceholder: "Hikâyeni duymak isteriz…",
    required: "Tüm alanlar gerekli.",
    submit: "Mesajını Gönder",
    successTitle: "Mesajın hazır, teşekkürler!",
    successBody:
      "Bu bir demo olduğu için mesajın gönderilmedi ve bilgilerin kaydedilmedi. Gerçek bir sohbette görüşmek üzere.",
    reset: "Yeni bir mesaj yaz",
    errors: {
      nameRequired: "Sana nasıl seslenelim? Adını yazabilir misin?",
      emailRequired: "E-posta adresini ekleyebilir misin?",
      emailInvalid: "Geçerli bir e-posta adresi yazabilir misin?",
      messageRequired: "Sohbete başlamak için bir mesaj yazabilir misin?",
    },
  },
  footer: {
    eyebrow: "SON YUDUMA KADAR YÂREN",
    title: ["Bir fincan biter,", "hikâyesi kalır."],
    intro: "İyi kahvenin hatırı, güzel sohbetin yâreni.",
    explore: "Avluda bir tur",
    preferences: "Nasıl istersen",
    tagline: "Her fincanda ortak bir hikâye.",
    fictional: "Hayali bir marka. Gerçek bir tasarım tutkusu.",
    crafted: "Özenle demlendi, keyifle paylaşıldı.",
  },
};
export default tr;
