import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealController } from "@/components/motion/reveal-controller";
import { Hero, CoffeeTicker } from "@/features/home/hero";
import { Manifesto } from "@/features/home/manifesto";
import { ContactSection } from "@/features/home/contact-section";
import { CoffeeCollection } from "@/features/coffee/coffee-collection";
import { CoffeeStories } from "@/features/coffee/coffee-stories";
import { Rituals } from "@/features/home/rituals";
import { getDesignCopy } from "@/i18n/design-copy";
import { localizeCoffees } from "@/features/coffee/coffee-data";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  const design = getDesignCopy(locale);
  const coffees = localizeCoffees(copy);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": new URL(`/${locale}#website`, site.url).href,
        name: "Yâren",
        url: new URL(`/${locale}`, site.url).href,
        inLanguage: locale,
        description: copy.meta.description,
      },
      {
        "@type": "Brand",
        name: "Yâren",
        slogan: design.slogan,
        logo: new URL("/brand/logo.svg", site.url).href,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader locale={locale} copy={design} />
      <main id="icerik">
        <Hero copy={design} english={locale === "en"} />
        <CoffeeTicker copy={design} />
        <Manifesto copy={design} />
        <CoffeeCollection coffees={coffees} copy={design} />
        <CoffeeStories copy={design} coffees={coffees} />
        <Rituals copy={design} />
        <ContactSection copy={copy.contact} design={design} />
      </main>
      <SiteFooter copy={design} />
      <RevealController />
    </>
  );
}
