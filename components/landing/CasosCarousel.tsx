"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";

export type Caso = {
  antes: string;
  despues: string;
  labelDespues?: string;
};

export default function CasosCarousel({ casos, titulo }: { casos: Caso[]; titulo: string }) {
  const [idx, setIdx] = useState(0);
  const [ampliada, setAmpliada] = useState<string | null>(null);
  const caso = casos[idx];

  const prev = () => setIdx((i) => (i - 1 + casos.length) % casos.length);
  const next = () => setIdx((i) => (i + 1) % casos.length);

  return (
    <>
      <div className="flex flex-col gap-0">
        {/* Fotos antes/después */}
        <div className="grid grid-cols-2">
          {(["antes", "despues"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setAmpliada(caso[key])}
              aria-label={`Ampliar ${key === "antes" ? "Antes" : (caso.labelDespues ?? "Después")}`}
              className="relative aspect-[4/3] group cursor-zoom-in focus:outline-none"
            >
              <Image
                src={caso[key]}
                alt={`${titulo} — ${key === "antes" ? "Antes" : (caso.labelDespues ?? "Después")}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 400px"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <span className={`
                absolute bottom-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full
                ${key === "antes" ? "bg-black/50 text-white/90" : "bg-sima-accent/90 text-white"}
              `}>
                {key === "antes" ? "Antes" : (caso.labelDespues ?? "Después")}
              </span>
              <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          ))}
        </div>

        {/* Navegación entre casos (solo si hay más de uno) */}
        {casos.length > 1 && (
          <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-t border-white/10">
            <button
              onClick={prev}
              aria-label="Caso anterior"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-white/40 tabular-nums">
              Caso {idx + 1} <span className="font-normal">/ {casos.length}</span>
            </span>
            <button
              onClick={next}
              aria-label="Caso siguiente"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {ampliada && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setAmpliada(null)}
        >
          <button
            onClick={() => setAmpliada(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={ampliada} alt="" fill className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </>
  );
}
