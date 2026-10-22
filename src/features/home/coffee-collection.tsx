import Image from "next/image";
import { coffees } from "./coffee-data";
import { Motif } from "@/components/ui/icons";
export function CoffeeCollection() {
  return (
    <section
      id="kahveler"
      className="collection container"
      aria-labelledby="coffee-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">01 / KAHVELERİMİZ</p>
          <h2 id="coffee-title" tabIndex={-1}>
            Her damak için
            <br />
            <em>bir yâren.</em>
          </h2>
        </div>
        <p>
          Alıştığın lezzetler, yeni keşifler.
          <br />
          Senin kahven, senin ritüelin.
        </p>
      </div>
      <div className="coffee-grid">
        {coffees.map((coffee, index) => (
          <article
            className="coffee-card"
            key={coffee.id}
            aria-labelledby={`${coffee.id}-title`}
            data-reveal
          >
            <div className={`coffee-image coffee-image-${index}`}>
              <Image
                src={coffee.image}
                alt={coffee.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                quality={80}
              />
              <span className="coffee-number">0{index + 1}</span>
              <span className="coffee-ritual">{coffee.ritual}</span>
            </div>
            <div className="coffee-title-row">
              <h3 id={`${coffee.id}-title`}>{coffee.name}</h3>
              <span className="coffee-price">{coffee.price}</span>
            </div>
            <p className="coffee-description">{coffee.description}</p>
            <p className="coffee-notes">
              <Motif />
              {coffee.notes}
            </p>
          </article>
        ))}
      </div>
      <p className="price-note">
        Fiyatlar, bu güzel hikâyenin örnek menüsüne aittir.
      </p>
    </section>
  );
}
