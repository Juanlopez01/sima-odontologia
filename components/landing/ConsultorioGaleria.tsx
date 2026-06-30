"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const FOTOS = [
  { src: "/consul6.jpeg", alt: "Sillón dental SIMA Odontología" },
  { src: "/consul7.jpeg", alt: "Consultorio SIMA Odontología" },
  { src: "/consul8.jpeg", alt: "Equipamiento SIMA Odontología" },
];

export default function ConsultorioGaleria() {
  const [ampliada, setAmpliada] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-8">
        {FOTOS.map(({ src, alt }) => (
          <button
            key={src}
            onClick={() => setAmpliada(src)}
            aria-label={`Ampliar: ${alt}`}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-sima-accent"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="33vw"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="w-4 h-4 text-white" />
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {ampliada && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
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
            className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ampliada}
              alt=""
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
