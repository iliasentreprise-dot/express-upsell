import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface QA { q: string; a: string }

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-lg border border-electric/30 bg-navy-card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
            >
              <span className="font-semibold text-white">{it.q}</span>
              <ChevronDown className={`h-5 w-5 text-electric transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


