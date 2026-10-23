# Yâren

Yâren, Türk kahvesinin kültürel sıcaklığını çağdaş kahve kültürüyle buluşturan hayali bir markadır. Site; büyük tipografi, kesilmiş ürün fotoğrafları, özgün fincan çizimleri ve krem–espresso geçişleriyle tek sayfalık bir marka hikâyesi sunar. Next.js App Router, React, TypeScript ve Tailwind CSS üzerine kurulur; hareketler CSS ve IntersectionObserver ile sağlanır. İletişim formu yalnızca tarayıcıda doğrulanır; mesaj göndermez ve bilgi kaydetmez.

## Çalıştırma

Node.js 22 veya üzeri gerekir.

```bash
npm install
npm run dev
```

[http://localhost:3000/tr](http://localhost:3000/tr) Türkçe sayfayı, `/en` İngilizce sayfayı açar. `/` Türkçe sayfaya yönlenir. Üretim için `npm run build` ve `npm start` kullanılabilir; bu revizyonda dağıtım yapılmadı.

## Tasarım sistemi

- Renkler, font rolleri, boşluklar ve hareket tokenları: `src/styles/theme.css`.
- Kompozisyonlar ve 375/768/1440 px düzenleri: `src/styles/editorial.css`.
- Üç font rolü: `--font-display`, `--font-accent`, `--font-body`.
- Mevcut yerel Manrope ve Lora fontları tekrar kullanılır. Latin ve Latin Extended dosyaları Türkçe karakterleri destekler. Fontlar ziyaretçiye aynı alan adından sunulur.
- Kendi fontlarını kullanmak için `src/app/fonts.ts` içindeki `next/font/local` kaynaklarını ve `theme.css` içindeki üç rolü değiştir.
- Sayfanın Türkçe ve İngilizce anlatısı: `src/i18n/design-copy.ts`; ürün açıklamaları ve form metinleri: `src/i18n/messages/`.
- Örnek fiyatlar: Türk Kahvesi ₺120, Espresso ₺135, Filtre Kahve ₺125. Veriler `src/features/coffee/coffee-data.ts` içindedir.

## Sayfa ve etkileşimler

Başlangıç kolajını marka manifestosu, üç kahvelik seçki, her kahveye ait ayrı bir hikâye, birlikte kahve ritüeli, iletişim formu ve büyük Yâren imzası izler. Navigasyon, keşfet butonu ve ürün bağlantıları ilgili sayfa bölümüne gider. Mobil menü Escape ile kapanır ve odağı açma düğmesine döndürür; bölüm seçildiğinde kapanır. Klavye odağı görünürdür; hareket azaltma tercihi dekoratif animasyonları ve yumuşak kaydırmayı kapatır.

Form; boş alanları, yalnızca boşluk içeren değerleri ve geçersiz e-posta biçimini kontrol eder. Hatalar ilgili alana bağlanır, ilk hatalı alan odaklanır. Başarı ekranı bunun bir demo olduğunu ve mesajın gönderilmediğini açıkça belirtir. Sunucu isteği veya kişisel veri saklama yapılmaz.

## Scroll Craft denemesi

Mevcut sayfanın dört bölümüne kaydırma etkileşimleri eklendi: hero fotoğrafı, arka zemin, buhar ve damga bağımsız derinlik katmanlarıdır; manifesto başlığı yerleşir ve atasözünün altı çizilir; kahve seçkisi masaüstünde dikey kaydırmayla yatay ilerler; ritüel fotoğrafı açılırken iki fincan yaklaşır ve özgün hatır halkası tamamlanır. Kahve hikâyeleri, iletişim formu ve kapanış normal belge akışında kalır.

1000 px genişlik ve 760 px yükseklik altındaki ekranlarda sabitleme kullanılmaz; kahveler doğal yatay kaydırma ve önceki/sonraki düğmeleriyle gezilir. Bütün ürünler zaten görünüyorsa gereksiz yön düğmeleri gösterilmez. Klavye odağı ilgili kahveyi görünür alana getirir. Hareket azaltma tercihinde sabitlemeler ve dönüşümler kalkar, koleksiyon normal ızgaraya döner; ilk açılışta hareket motoru indirilmez. JavaScript kapalıyken içerik normal akışta okunur.

Scroll Craft motoru değiştirilmeden `public/vendor/scrollcraft/` içine alındı. Next.js bağlantısı ve yaşam döngüsü `src/components/motion/scroll-craft-controller.tsx`, projeye özel koreografi `src/styles/scroll-scenes.css` içindedir. Yeni fotoğraf veya video üretilmedi, yeni bağımlılık eklenmedi. Yerel brief, skor ve ekran şeritleri git dışında tutulan `scrollcraft/builds/yaren-scroll-study/` klasöründedir.

## Çekirdek oyun alanı

Çekirdek sahnesi `/tr#cekirdek-masasi` ve `/en#cekirdek-masasi` adreslerinde ana sayfanın parçasıdır; kahve hikâyeleri ile ritüeller arasında yer alır. Ayrı sayfa veya menü girdisi yoktur. Alanın en az %20’si görünür olduğunda yağmur başlar. Metin üzerinde opak dikdörtgen yüzeyler bulunmaz; Canvas üzerindeki yumuşak alfa geçişi yazının çevresindeki çekirdekleri hafifletir. Fotoğraf gerçekliğindeki çekirdekler yukarıdan dökülür, çarpışır, döner ve zeminde birikir; fare hareketi veya parmak dokunuşu ve yatay savurma ile yeniden havalanır. Dikey dokunma kaydırması ve yakınlaştırma korunur.

“Durdur / Başlat”, “Yeniden dök” ve “Karıştır” düğmeleri çalışır. Oyun alanı odaktayken boşluk hareketi durdurur, sağ/sol oklar çekirdekleri savurur. Hareket azaltma tercihinde ilk görünüm durgundur; kullanıcı düğmeyle hareketi başlatabilir. Görünmeyen sekmede ve alan ekran dışına çıktığında fizik döngüsü durur. Başlangıçta telefonda 38, büyük ekranda 76 gövde kullanılır; yeniden dökme sayıyı artırmaz.

Fizik ve Canvas çizimi `src/features/bean-lab/` içinde bağımsız tutulur. Yeni fizik kütüphanesi eklenmedi. `public/images/coffee-bean.webp`, yerleşik ImageGen ile bu çalışma için üretilen saydam çekirdek görselidir; Sharp ile 185×256 piksel ve yaklaşık 26 KB WebP dosyasına indirildi. Son kaynak Chromium'da 375/768/1440 px, fare, dokunma emülasyonu, klavye ve azaltılmış hareket ile kontrol edildi; gerçek cihaz testi yapılmadı.

## Tipografi

Üç rol `src/styles/theme.css` üzerinden değiştirilebilir:

| Rol | Aile | Kullanım |
| --- | --- | --- |
| `--font-display` | Bricolage Grotesque 48pt ExtraBold, 800 | Ana ve bölüm başlıkları, ürün adları |
| `--font-accent` | Lora, özellikle italik | Vurgular, fiyatlar, alıntılar |
| `--font-body` | Manrope | Paragraflar, gezinme ve kontroller |

Gövde 16 px, yardımcı metin 14 px, bilgi etiketleri 12 px tokenlarıyla yönetilir. Başlıklar bölüme özgü `clamp()` ölçeklerini korur; 375 px ekranda ana başlık yaklaşık 62 px, 1440 px ekranda yaklaşık 131 px olur. Harf aralığı yeni display fontuna göre açılmıştır. Dekoratif damgaların mikro yazıları bilgi metni sayılmaz.

Fontlar `next/font/local` ile aynı sunucudan yüklenir. Yeni display fontu yaklaşık 46 KB WOFF2 dosyasıdır; lisansı `src/assets/fonts/bricolage-OFL.txt` içindedir. Kaynak: [Atelier Triay](https://github.com/ateliertriay/bricolage). Türkçe karakterler (`ĞğİıŞşÇçÖöÜüâ₺`) font kapsamından ve Chromium'da gerçekten kullanılan font adlarından doğrulandı. Aileyi değiştirmek için `src/app/fonts.ts` içindeki yerel dosya ve ilgili rol tokenı değiştirilir.

## Görsel kaynakları ve araçlar

- Apocalypse Coffee yalnızca yaratıcı kalite, tipografik ölçek ve kompozisyon araştırması için incelendi; markası veya görselleri kullanılmadı.
- Mevcut Yâren wordmark'ı korundu. Cezve, kahve çekirdeği, yıldız ve sohbet eden fincanlar `src/components/brand/coffee-art.tsx` içinde özgün SVG çizimleridir.
- `coffee-cutout.webp` ve `friendship-coffee.webp`, bu tasarım için OpenAI ImageGen ile üretildi. Sharp ile WebP olarak optimize edildi; ilk görsel gerçek saydamlığını korur.
- Mevcut `turkish-coffee.webp`, `espresso-cup.webp` ve `cafe-table.webp` önceki proje için ImageGen ile üretilmiş yerel fotoğraflardır.
- `filter-coffee.webp`: [Unsplash kaynağı](https://images.unsplash.com/photo-1442512595331-e89e73853f31).
- Bricolage Grotesque: Atelier Triay’dan yerel WOFF2, SIL OFL 1.1. Lora ve Manrope: mevcut yerel Fontsource paketleri, OFL lisansı.
- Geliştirme komutları kullanıcının isteğiyle RTK üzerinden çalıştırıldı.

## Bu revizyondaki kontrol

Yerel Chromium'da 375, 768 ve 1440 px ekran görüntüleri gözle incelendi. Türkçe ve İngilizce sayfalar, mobil menü, Escape, bölüm bağlantıları, formun hata/başarı durumları ve yeniden yazma akışı tarayıcıda kontrol edildi. Otomatik test paketleri, GitHub Actions ve CI/CD çalıştırılmadı. `tests/` klasörü önceki arayüze ait kontrolleri içerir; bu yeniden tasarım için güncellenmedi veya çalıştırılmadı.

Marka hayalidir; adres, çalışma saati, müşteri yorumu veya sosyal hesap uydurulmamıştır. Canonical, sitemap ve paylaşım URL'leri mevcut `SITE_URL` yapılandırmasını kullanmaya devam eder.
