import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealController } from "@/components/motion/reveal-controller";
import { Hero } from "@/features/home/hero";
import { Story } from "@/features/home/story";
import { ContactSection } from "@/features/home/contact-section";
import { CoffeeCollection } from "@/features/coffee/coffee-collection";
import { CoffeeFinder } from "@/features/coffee/coffee-finder";
import { localizeCoffees } from "@/features/coffee/coffee-data";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
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
        slogan: copy.hero.lines.join(" "),
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
      <SiteHeader locale={locale} nav={copy.nav} theme={copy.theme} />
      <main id="icerik">
        <Hero copy={copy.hero} alt={copy.coffees["turk-kahvesi"].alt} />
        <CoffeeCollection
          coffees={coffees}
          copy={copy.collection}
          common={copy.common}
        />
        <CoffeeFinder
          coffees={coffees}
          copy={copy.finder}
          common={copy.common}
        />
        <Story copy={copy.story} />
        <ContactSection copy={copy.contact} />
      </main>
      <SiteFooter
        locale={locale}
        copy={copy.footer}
        nav={copy.nav}
        theme={copy.theme}
        common={copy.common}
      />
      <RevealController />
    </>
  );
}
