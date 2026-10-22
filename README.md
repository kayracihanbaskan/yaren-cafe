# Yâren

**Her fincanda ortak bir hikâye.**

Geleneksel Türk kahvesini modern demleme kültürüyle buluşturan, tek sayfalık hayali bir kahve markası çalışması.

## Çalıştırma

Node.js 22+ ve npm gerekir (`.nvmrc`: 22).

```bash
npm ci
npm run dev
```

[localhost:3000](http://localhost:3000) adresini aç. Üretim için `npm run build` ardından `npm start` çalıştır.

## Kontroller

```bash
npm run lint
npm run typecheck
npm run test:unit
npx playwright install chromium
npm test
```

Tarayıcı testleri geliştirme sunucusunu otomatik açar. Zaten çalışan bir sunucu için `TEST_BASE_URL=http://localhost:3000 npm test` kullan. `CHROMIUM_PATH` ile özel Chromium yolu belirtilebilir; Linux'ta `/usr/bin/chromium` varsa otomatik kullanılır. Test komutu, Node 26'nın yerleşik TypeScript yükleyicisiyle çakışmayı önlemek için Playwright'ın kendi yükleyicisini kullanır.

## Vercel

1. GitHub'daki private repoyu Vercel'e **Import Project** ile ekle.
2. Framework **Next.js**, kök dizin `./`; build `npm run build`, output dizini varsayılan olsun.
3. Varsayılan Vercel alan adı otomatik algılanır. Özel alan adında `SITE_URL=https://alan-adin.com` ortam değişkenini üretim ortamına ekleyip yeniden deploy et. `.env.example` yerel kullanım içindir; sır içermez.

Canonical, sitemap ve paylaşım URL'leri aynı üretim adresini kullanır. Vercel preview dağıtımları `noindex, nofollow` ve `Disallow: /` üretir. Canlı dağıtım bu çalışma sırasında yapılmadı.

## Yapı

```text
src/
  app/                 # App Router, metadata, fontlar ve stil sistemi
  components/
    brand/             # Wordmark ve monogram
    layout/            # Başlık, mobil navigasyon ve footer
    motion/            # Küçük istemci animasyon adası
    ui/                # Ortak SVG ikonları
  features/
    home/              # Sunucu bileşenleri ve kahve verisi
    contact/           # İstemci formu ve bağımsız doğrulama
  hooks/               # Tek IntersectionObserver hook'u
  lib/                 # Üretim URL'si ve SEO yapılandırması
public/
  brand/               # Bağımsız SVG logo ve 512px monogram
  images/              # Yerel, optimize WebP görselleri
tests/                 # Unit, gerçek tarayıcı ve axe kontrolleri
```

Sunucu bileşenleri sayfayı render eder; istemci sınırı menü, iletişim formu ve animasyon controller'ıdır. Kaydırma için native anchor, hareket için CSS ve tek `IntersectionObserver` kullanılır; animasyon bağımlılığı, global state veya gereksiz memoization yoktur. `prefers-reduced-motion`, klavye kullanımı, mobil menü odağı ve JavaScript kapalı içerik desteklenir.

## Case study notu

Form yalnızca istemci doğrulaması ve başarı durumunu gösterir; mesaj göndermez, kişisel veri saklamaz ve ağ isteği oluşturmaz. Üç fiyat örnektir. Marka hayalidir; adres, çalışma saati, müşteri yorumu veya sosyal hesap uydurulmamıştır.

## Marka dosyaları ve görsel kaynakları

- `public/brand/logo.svg`: font bağımlılığı olmayan, path tabanlı Yâren wordmark.
- `src/app/icon.svg`, `icon.png` ve `favicon.ico`: tarayıcı sekme ikonları; `apple-icon.png`: 180×180 Apple ikonu.
- `public/brand/mark-512.png`: 512×512 marka işareti.
- `src/app/opengraph-image.png` ve `twitter-image.png`: 1200×630 paylaşım kartları.
- `public/images/turkish-coffee.webp`: yerleşik **ImageGen** ile bu proje için üretilen Türk kahvesi natürmortu.
- Espresso: [görsel kaynağı](https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd).
- Filtre: [görsel kaynağı](https://images.unsplash.com/photo-1442512595331-e89e73853f31).
- Dostlarla kahve: [görsel kaynağı](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085).
- Cormorant Garamond ve Manrope variable: Fontsource paketlerinden, OFL lisanslı, `next/font/local` ile aynı alan adından sunulur.

<details>
<summary>Üretilen hero görselinin son prompt'u</summary>

Use case: photorealistic-natural. Asset type: hero photograph for Yâren, an elegant Turkish coffee brand website combining Turkish tradition with contemporary coffee culture. Produce one exquisite editorial still-life photograph, no typography. Landscape 3:2 composition, elevated 45 degree angle. A small handmade ivory ceramic Turkish coffee demitasse filled with rich dark foamy Turkish coffee on a matching saucer, a little hammered copper cezve with elegant dark wooden handle, a few scattered roasted beans, on a richly textured dark walnut cafe table. A folded warm natural linen napkin and a small olive branch in the background. Late afternoon warm sunlight enters from upper left creating a striking diagonal shadow on the wood. Main cup and cezve grouped around the central-right area, generous breathing room. Tactile real materials, artisan ceramics, restrained tones of ivory, walnut brown, muted olive green and copper. Warm understated contemporary Anatolian hospitality, premium magazine food photography, fine natural grain, realistic shallow depth of field. Avoid: any text, logos, watermark, people, hands, excessive props, latte art, cappuccino, plastic, fake steam, surreal elements. The drink must look like authentic Turkish coffee.

</details>

## Çalışmada neler yapıldı?

Yâren için kırık beyaz, koyu kahve ve zeytin tonlarında, kültürel detayları çağdaş editoryal tasarımla buluşturan mobil uyumlu bir site hazırladım. Next.js App Router, React ve TypeScript ile sunucu ağırlıklı bir yapı kurup form, menü ve ölçülü animasyonları küçük istemci bileşenlerinde tuttum. Tasarımda UI/UX Pro Max araştırması, paralel tasarım ajanları ve ImageGen kullanıldı; logo, favicon, paylaşım görselleri ve SEO dosyaları da tamamlandı. Çalışan etkileşimleri Playwright, doğrulamayı Node test runner, erişilebilirliği axe ve üretim derlemesini Next.js ile kontrol ettim.
