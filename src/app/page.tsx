import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { RevealController } from "@/components/motion/reveal-controller";
import { Hero } from "@/features/home/hero";
import { CoffeeCollection } from "@/features/home/coffee-collection";
import { Story } from "@/features/home/story";
import { ContactSection } from "@/features/home/contact-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { Motif } from "@/components/ui/icons";
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": new URL("/#website", site.url).href,
                name: "Yâren",
                url: site.url.href,
                inLanguage: "tr-TR",
                description: site.description,
              },
              {
                "@type": "Brand",
                name: "Yâren",
                slogan: "Her fincanda ortak bir hikâye.",
                logo: new URL("/brand/logo.svg", site.url).href,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main id="icerik">
        <Hero />
        <div className="values-strip container">
          <span>GELENEKLE KÖKLENİR.</span>
          <Motif />
          <span>ÖZENLE DEMLENİR.</span>
          <Motif />
          <span>SOHBETLE GÜZELLEŞİR.</span>
        </div>
        <CoffeeCollection />
        <Story />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
