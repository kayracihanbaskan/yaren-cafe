# Yâren

**Her fincanda ortak bir hikâye.**

Türk kahvesi kültürünü çağdaş bir Anadolu avlusunun sakinliğiyle buluşturan, Türkçe ve İngilizce bir kahve markası case study çalışması.

## Çalıştırma

Node.js 22+ ve npm gerekir (`.nvmrc`: 22).

```bash
npm ci
npm run dev
```

[localhost:3000/tr](http://localhost:3000/tr) veya [localhost:3000/en](http://localhost:3000/en) adresini aç. `/`, kalıcı 308 yönlendirmesiyle `/tr` sayfasına gider. Üretim için `npm run build` ardından `npm start` çalıştır.

## Deneyim ve tasarım

- Krem sıva, ceviz, zeytin ve bakır paleti; kemerli fotoğraflar, yumuşak köşeler, ince geometrik motifler ve çizim fincanlar.
- Her kahve için hikâye, hazırlama adımları ve eşlikçi önerisi. Masaüstünde iki sütunlu dialog, mobilde alttan açılan okuma penceresi; klavye odağı, Escape ve tetikleyiciye geri dönüş desteklenir. JavaScript kapalıyken native `details` aynı içeriği açar.
- Üç soruluk kahve bulucu: sohbet/ruh hali 2, yoğunluk 3, mola süresi 2 puan taşır. 27 yanıt kombinasyonunun tamamı unit testlerle doğrulanır. Yanıtlar kaydedilmez.
- Varsayılan açık tema; koyu ve sistem seçenekleri. Yalnızca tema tercihi `yaren-theme` anahtarıyla saklanır, sekmeler arasında eşitlenir. Koyu temada fotoğraflar doğal renklerini korur.
- `/tr` ve `/en` statik sayfaları; içerik, form hataları, hikâyeler, ekran okuyucu etiketleri ve SEO metinleri çevrilidir. Dil değiştirme mevcut bölüm bağlantısını korur; tarayıcı diliyle otomatik yönlendirme yapılmaz.
- Tailwind CSS 4, CSS değişkenleriyle semantik renkler ve yerel Lora/Manrope variable fontlar. Animasyonlar kısa ve sınırlıdır; `prefers-reduced-motion` desteklenir. Sürekli scroll listener veya animasyon kütüphanesi kullanılmaz.

## Yapı

```text
src/
  app/
    [locale]/          # Statik dil rotaları, sayfa ve SEO metadata
    fonts.ts           # Yerel variable fontlar
    globals.css        # Tailwind ve stil giriş noktası
    robots.ts          # Preview ortamlarında taramayı engeller
    sitemap.ts         # İki dil ve hreflang alternatifleri
  components/
    brand/             # SVG wordmark ve monogram
    layout/            # Header, mobil navigasyon ve footer
    motion/            # Tek IntersectionObserver controller'ı
    preferences/       # Tema provider, tema/dil kontrolleri
    ui/                # Container, buton stilleri ve SVG ikonlar
  features/
    home/              # Sunucuda render edilen tanıtım bölümleri
    coffee/            # Kahve verisi, hikâye dialog'u ve kahve bulucu
    contact/           # Form ve dilden bağımsız doğrulama
  hooks/               # Reveal ve header yüksekliği gözlemcileri
  i18n/                # Tipli, yalnızca sunucuda yüklenen sözlükler
    messages/          # tr.ts ve en.ts
  styles/              # Tema tokenları, temel stiller ve hareket
  lib/                 # Üretim URL'si ve ortam bilgisi
public/
  brand/               # SVG marka dosyaları, doku ve dil bazlı OG kartları
  images/              # Yerel, optimize WebP fotoğraflar
tests/                 # Unit, Chromium, Firefox/WebKit smoke ve axe
```

Sayfa bölümleri sunucu bileşenleridir; menü, tercihler, hikâye dialog'u, kahve bulucu ve form küçük istemci sınırlarında çalışır. Ortak renkler `styles/theme.css` dosyasındadır; bileşen stilleri Tailwind utility sınıflarıyla tanımlanır. İçerik sözlüklerde, temel kahve verisi ve öneri hesabı kendi feature klasöründe tutulur. Global uygulama state'i veya gereksiz memoization kullanılmaz.

## Kontroller

```bash
npm run lint
npm run typecheck
npm run test:unit
npx playwright install chromium firefox webkit
npm test
npm run build
```

Test komutları yalnızca elle çalıştırılır; repoda GitHub Actions veya otomatik CI/CD akışı yoktur. Chromium tam akış, 320/375/768/1440 px, %200 metin büyütme, iki dil/tema ve axe kontrollerini çalıştırır. Firefox ve WebKit, dil değiştirme, tema ve hikâye penceresi için smoke testleri çalıştırır. Ubuntu'da eksik tarayıcı kütüphaneleri `npx playwright install --with-deps chromium firefox webkit` ile kurulabilir.

Tarayıcı testleri geliştirme sunucusunu otomatik açar. Çalışan sunucuda `TEST_BASE_URL=http://localhost:3000 npm test` kullan. Yalnızca Chromium için `npm test -- --project=chromium` çalıştırılabilir. `CHROMIUM_PATH` özel Chromium yolu belirtir; Linux'ta `/usr/bin/chromium` varsa otomatik seçilir. Test komutu, Node 26'nın yerleşik TypeScript yükleyicisiyle çakışmayı önler.

## Vercel ve SEO

1. GitHub'daki private repoyu Vercel'e **Import Project** ile ekle.
2. Framework **Next.js**, kök dizin `./`, build `npm run build`; output dizini varsayılan olsun.
3. Varsayılan Vercel üretim alan adı otomatik algılanır. Özel alan adında `SITE_URL=https://alan-adin.com` ortam değişkenini production ortamına ekleyip yeniden deploy et. `.env.example` sır içermez.

Canonical, sitemap, JSON-LD ve paylaşım URL'leri aynı üretim adresini kullanır. Her dilin kendi canonical ve OG kartı vardır; `tr`, `en` ve `x-default` alternatifleri tanımlıdır. Vercel preview dağıtımları `noindex, nofollow` ve `Disallow: /` üretir. Bu çalışma Vercel'e canlı dağıtım yapmaz.

`.gitignore`; bağımlılıkları, build/test çıktısını, yerel plan/skill klasörlerini, PDF referansını ve gizli ortam dosyalarını repodan dışlar.

## Case study notu

İletişim formu yalnızca istemci doğrulaması ve başarı durumunu gösterir; mesaj göndermez, kişisel veri saklamaz ve ağ isteği oluşturmaz. Bu durum form üzerinde iki dilde açıkça belirtilir. Fiyatlar örnektir. Marka hayalidir; adres, çalışma saati, müşteri yorumu veya sosyal hesap uydurulmamıştır. Kahve hikâyeleri marka anlatısıdır; belirli bir çekirdek menşei veya tedarikçi iddiası içermez.

## Marka dosyaları ve görsel kaynakları

- `public/brand/logo.svg`: font bağımlılığı olmayan, path tabanlı Yâren wordmark.
- `src/app/icon.svg`, `icon.png`, `favicon.ico`: sekme ikonları; `apple-icon.png`: 180×180 Apple ikonu.
- `public/brand/mark-512.png`: 512×512 marka işareti.
- `public/brand/og-tr.png`, `og-en.png`: 1200×630 yerelleştirilmiş paylaşım kartları.
- `public/brand/plaster.svg`: hafif sıva dokusu.
- `public/images/turkish-coffee.webp`, `espresso-cup.webp`, `cafe-table.webp`: yerleşik ImageGen ile proje için üretilen fotoğraflar; son prompt'lar aşağıdadır.
- Filtre kahve: [Unsplash görsel kaynağı](https://images.unsplash.com/photo-1442512595331-e89e73853f31).
- Dostlarla kahve: [Unsplash görsel kaynağı](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085).
- Lora ve Manrope variable: Fontsource paketlerinden, OFL lisanslı, `next/font/local` ile aynı alan adından sunulur.

<details>
<summary>Üretilen hero görselinin son prompt'u</summary>

Use case: photorealistic-natural. Asset type: hero photograph for Yâren, an elegant Turkish coffee brand website combining Turkish tradition with contemporary coffee culture. Produce one exquisite editorial still-life photograph, no typography. Landscape 3:2 composition, elevated 45 degree angle. A small handmade ivory ceramic Turkish coffee demitasse filled with rich dark foamy Turkish coffee on a matching saucer, a little hammered copper cezve with elegant dark wooden handle, a few scattered roasted beans, on a richly textured dark walnut cafe table. A folded warm natural linen napkin and a small olive branch in the background. Late afternoon warm sunlight enters from upper left creating a striking diagonal shadow on the wood. Main cup and cezve grouped around the central-right area, generous breathing room. Tactile real materials, artisan ceramics, restrained tones of ivory, walnut brown, muted olive green and copper. Warm understated contemporary Anatolian hospitality, premium magazine food photography, fine natural grain, realistic shallow depth of field. Avoid: any text, logos, watermark, people, hands, excessive props, latte art, cappuccino, plastic, fake steam, surreal elements. The drink must look like authentic Turkish coffee.

</details>

<details>
<summary>Üretilen espresso görselinin son prompt'u</summary>

Editorial food photograph for Yâren, a contemporary Turkish coffeehouse. A real small ivory ceramic espresso demitasse holding a short double espresso with hazelnut crema, on a matching saucer on a warm walnut table. The small cup must clearly look like espresso, not a large mug or filter coffee. A tiny spoon and a few coffee beans, softly blurred muted olive plaster wall and warm afternoon window light. Quiet artisan cafe atmosphere, tactile natural ceramic, authentic proportions, refined warm cream, walnut and copper palette, landscape 4:3 crop with cup central, generous breathing room, premium natural photography. No text, logos, watermark, hands, people or latte art.

</details>

<details>
<summary>Üretilen kafe masası görselinin son prompt'u</summary>

Quiet editorial cafe still life for Yâren, a contemporary Anatolian courtyard coffeehouse website contact section. Warm ivory plaster wall with soft arched window shadow, small rich walnut table near a window. On the table a handmade cream Turkish coffee demitasse and saucer, a clear small glass of water, two pieces of rose Turkish delight on a tiny ceramic dish, folded natural linen napkin, slender olive branch. Soft afternoon light, calm welcoming intimate mood, imperfect tactile natural materials, muted olive, warm ivory, wood and subtle copper details. Portrait 4:5 composition suitable for a tall rounded photograph, all objects in central lower half and soft airy wall above. Realistic premium editorial food/interior photography. No typography, logos, watermark, people, hands, forms or interface.

</details>

## Çalışmada neler yapıldı?

Yâren'i Anadolu avlusu hissi taşıyan, kültürel detayları ve sakin tipografisiyle öne çıkan mobil uyumlu bir siteye dönüştürdüm. Next.js App Router, React, TypeScript ve Tailwind CSS ile sunucu ağırlıklı ve feature bazlı bir yapı kurdum; kahve hikâyeleri, kahve bulucu, iki dil ve üç tema tercihi ekledim. Logo, favicon, yerelleştirilmiş paylaşım kartları, SEO ve yeni kafe görsellerini bütünlüklü bir tasarımda birleştirdim. Akışları Playwright, öneri ve doğrulama mantığını unit testler, erişilebilirliği axe ve üretim çıktısını Next.js derlemesiyle kontrol ettim.
