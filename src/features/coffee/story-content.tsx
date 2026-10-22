import type { CoffeeCopy } from "./types";
import type { Messages } from "@/i18n/types";
import { Motif } from "@/components/ui/icons";
export function StoryContent({
  story,
  labels,
}: {
  story: CoffeeCopy["story"];
  labels: Pick<Messages["common"], "brewing" | "pairing">;
}) {
  return (
    <div className="space-y-6 text-base leading-[1.8] text-muted">
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="rounded-2xl border border-line bg-canvas p-5">
        <h3 className="mb-4 text-xl text-ink">{labels.brewing}</h3>
        <ol className="space-y-4">
          {story.steps.map((step, index) => (
            <li className="flex items-start gap-3" key={step}>
              <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-olive text-xs font-semibold text-on-primary">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="border-t border-line pt-5">
        <h3 className="mb-3 flex items-center gap-3 text-xl text-ink">
          <Motif className="h-4 w-8 text-copper" />
          {labels.pairing}
        </h3>
        <p>{story.pairing}</p>
      </div>
    </div>
  );
}
