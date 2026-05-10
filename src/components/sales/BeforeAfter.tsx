import { ZoomableImage } from "./ZoomableImage";

function Slot({ label, src }: { label: string; src: string }) {
  return (
    <ZoomableImage
      src={src}
      alt={label}
      className="group relative aspect-[3/4] block rounded-lg border-2 border-electric/40 bg-navy hover:border-electric transition-colors overflow-hidden"
    >
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute top-2 left-2 text-[10px] font-bold tracking-widest bg-electric text-white px-2 py-0.5 rounded z-10">
        {label}
      </span>
    </ZoomableImage>
  );
}

export function BeforeAfter({
  name,
  quote,
  beforeSrc,
  afterSrc,
}: {
  name: string;
  quote: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  return (
    <div className="rounded-xl border border-electric/30 bg-navy-card p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-3">
        <Slot label="AVANT" src={beforeSrc} />
        <Slot label="APRÈS" src={afterSrc} />
      </div>
      <p className="mt-4 font-bold text-white">{name}</p>
      <p className="mt-1 text-sm text-muted-foreground italic">"{quote}"</p>
    </div>
  );
}
