import { useEffect, useState } from "react";

interface Props {
  targetDate?: Date;
  durationSeconds?: number;
  onExpire?: () => void;
  variant?: "boxes" | "inline";
}

export function Countdown({ targetDate, durationSeconds, onExpire, variant = "boxes" }: Props) {
  const computeTarget = () => {
    if (targetDate) return targetDate.getTime();
    if (durationSeconds) return Date.now() + durationSeconds * 1000;
    return Date.now() + 3 * 24 * 60 * 60 * 1000;
  };
  const [target] = useState(computeTarget);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  useEffect(() => {
    if (diff === 0 && onExpire) onExpire();
  }, [diff, onExpire]);

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  if (variant === "inline") {
    const mm = String(Math.floor(diff / 60000)).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return <span className="font-mono font-bold">{mm}:{ss}</span>;
  }

  const Cell = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center min-w-[64px] sm:min-w-[80px] rounded-lg bg-navy-card border border-electric/40 px-3 py-3">
      <span className="text-2xl sm:text-4xl font-black text-electric tabular-nums">{String(v).padStart(2, "0")}</span>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      <Cell v={d} l="jours" />
      <Cell v={h} l="heures" />
      <Cell v={m} l="min" />
      <Cell v={s} l="sec" />
    </div>
  );
}


