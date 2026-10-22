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
