"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const FOTOS = [
  { src: "/sala-de-espera.png", alt: "Sala de espera SIMA Odontología" },
  { src: "/sala.jpg",           alt: "Consultorio SIMA Odontología" },
  { src: "/entrada.jpg",        alt: "Interior del consultorio" },
  { src: "/fachada.png",        alt: "Fachada SIMA Odontología" },
];

export default function HeroGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % FOTOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-sima-dark/10">
      {FOTOS.map(({ src, alt }, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="45vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {FOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
