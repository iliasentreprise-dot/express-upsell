import { useRef, useState } from "react";
import { Upload } from "lucide-react";

function Slot({ label }: { label: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => ref.current?.click()}
      className="group relative aspect-[3/4] flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-electric/40 bg-navy hover:border-electric transition-colors overflow-hidden"
    >
      {src ? (
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-electric">
          <Upload className="h-7 w-7" />
          <span className="text-xs">Cliquer pour ajouter</span>
        </div>
      )}
      <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest bg-electric text-white px-2 py-0.5 rounded">
        {label}
      </span>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setSrc(URL.createObjectURL(f));
        }}
      />
    </div>
  );
}

export function BeforeAfter({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="rounded-xl border border-electric/30 bg-navy-card p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-3">
        <Slot label="AVANT" />
        <Slot label="APRÈS" />
      </div>
      <p className="mt-4 font-bold text-white">{name}</p>
      <p className="mt-1 text-sm text-muted-foreground italic">"{quote}"</p>
    </div>
  );
}


