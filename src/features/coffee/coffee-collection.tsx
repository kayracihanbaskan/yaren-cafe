import Image from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import { Bean, Spark } from "@/components/brand/coffee-art";
import type { LocalizedCoffee } from "./types";
import type { DesignCopy } from "@/i18n/design-copy";

export function CoffeeCollection({
  coffees,
  copy,
}: {
  coffees: LocalizedCoffee[];
  copy: DesignCopy;
}) {
  return (
    <section
      id="kahveler"
      className="collection paper"
      aria-labelledby="coffee-title"
    >
      <div className="section-shell">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">{copy.collectionLabel}</p>
            <h2 id="coffee-title" tabIndex={-1}>
              {copy.collection[0]}
              <br />
              <em>{copy.collection[1]}</em>
            </h2>
          </div>
          <div className="collection-aside">
            <Bean />
            <p>{copy.collectionIntro}</p>
          </div>
        </div>
        <div className="coffee-grid">
          {coffees.map((coffee, index) => (
            <article
              className={`coffee-product product-${index + 1}`}
              key={coffee.id}
            >
              <a
                className="product-photo-link"
                href={`#hikaye-${coffee.id}`}
                aria-label={`${coffee.name}: ${copy.storyLink}`}
              >
                <div className="product-photo">
                  <Image
                    src={coffee.image}
                    alt={coffee.alt}
                    fill
                    sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw"
                    quality={80}
                    style={{ objectPosition: coffee.position }}
                  />
                </div>
                <span className="product-sticker">
                  {copy.productLabels[index]}
                </span>
                <span className="product-number" aria-hidden="true">
                  0{index + 1}
                </span>
                {index === 1 && <Spark className="product-spark" />}
              </a>
              <div className="product-title">
                <h3>{coffee.name}</h3>
                <span className="product-price">₺{coffee.price}</span>
              </div>
              <p className="product-description">{coffee.description}</p>
              <div className="product-notes">
                {coffee.notes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </div>
              <a href={`#hikaye-${coffee.id}`} className="text-link">
                {copy.storyLink}
                <ArrowIcon diagonal />
              </a>
            </article>
          ))}
        </div>
        <p className="price-note">* {copy.collectionNote}</p>
      </div>
    </section>
  );
}
