import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function ZoomableImage({
  src,
  alt,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in ${className ?? ""}`}
      >
        {children ?? (
          <img src={src} alt={alt} className={imgClassName} />
        )}
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-xl animate-in fade-in"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white border border-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[96vw] object-contain rounded-lg shadow-2xl border border-electric/40"
          />
        </div>
      )}
    </>
  );
}
