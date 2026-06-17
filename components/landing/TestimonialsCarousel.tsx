"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { name: "Raul Luna",                initials: "RL", text: "La calidad del servicio brindado por Macarena es excelente. Recuperé la confianza en mi sonrisa luego de pasar por un tratamiento de limpieza muy bien efectuado por una excelente profesional." },
  { name: "Lujan Figueroa",           initials: "LF", text: "Excelente atención, y muy profesional la Doc Macarena, me sentí muy cómoda, podés preguntar las dudas que tengas, y aun después de mi cita le mandé y me respondió muy amable." },
  { name: "Honoria Longhi",           initials: "HL", text: "Excelente profesional Maca! Súper amable y muy atenta, la recomiendo!" },
  { name: "Santiago Iglesias Bracco", initials: "SI", text: "Excelente atención, amabilidad y puntualidad. Realmente contento con todo lo hecho; blanqueamiento, caries y seguiré yendo! 100% recomendable. Gracias" },
  { name: "Santiago Gallo",           initials: "SG", text: "Trabajo impecable. Super profesional. Me hizo de todo, inclusive blanqueamiento y todo increíble. Gracias" },
  { name: "Carolina Maya Bornacelly", initials: "CM", text: "Excelente doctora, soy Colombiana y ella de urgencia me ayudó a restaurar un diente de manera inmediata. Muy empática y querida conmigo como paciente. El trabajo realizado fue excelente. Muchas gracias" },
  { name: "Julieta Erika Fernandez",  initials: "JF", text: "La experiencia fue muy buena. Recibí una atención adecuada y amable. La odontóloga me iba explicando todo el trabajo. Un espacio muy lindo y limpio. Recibí mi placa de bruxismo super rápido y en perfectas condiciones!" },
  { name: "Clau Saa",                 initials: "CS", text: "Excelente lugar, la doctora es buenísima, todos los materiales que usa son de primera marca, vale la pena y lo recomiendo. Me hice un arreglo de caries en una pieza visible estéticamente y quedó perfecta." },
  { name: "Veronica Gudiño",          initials: "VG", text: "Excelente profesional, muy amable, yo me hice un blanqueamiento y el resultado fue espectacular. Muchas gracias Dra. Sirimarco." },
  { name: "Nahuel Maza",              initials: "NM", text: "Excelente atención y muy buen servicio. En mi caso me realicé un blanqueamiento y los resultados fueron mucho mejores de lo esperado." },
  { name: "Agus Rodriguez",           initials: "AR", text: "Súper recomendable!!! Excelente profesional, dedicada y amable. Me cambió la sonrisa!!" },
  { name: "Luz Botta",                initials: "LB", text: "Excelente atención! Me realicé un blanqueamiento y quedé muy conforme con el resultado, super recomendable." },
  { name: "Lic. Milagros Casale",     initials: "MC", text: "Excelente! Me hice un blanqueamiento y quedé super contenta con los resultados. Maca es una genia!" },
];

export default function TestimonialsCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-white border-t border-sima-gray">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold tracking-widest text-sima-mid uppercase">Opiniones</span>
            <h2 className="text-2xl sm:text-3xl font-black text-sima-dark">Lo que dicen nuestros pacientes</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full border border-sima-gray flex items-center justify-center text-sima-mid hover:text-sima-dark hover:border-sima-dark transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="w-9 h-9 rounded-full border border-sima-gray flex items-center justify-center text-sima-mid hover:text-sima-dark hover:border-sima-dark transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map(({ name, initials, text }) => (
            <blockquote
              key={name}
              className="snap-start shrink-0 w-[85%] sm:w-[320px] bg-sima-light rounded-2xl p-6 border border-sima-gray flex flex-col gap-4"
            >
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sima-dark text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <footer className="flex items-center gap-3 pt-2 border-t border-sima-gray">
                <div className="w-9 h-9 rounded-full bg-sima-dark text-white flex items-center justify-center font-black text-xs shrink-0">
                  {initials}
                </div>
                <span className="text-sm font-bold text-sima-dark">{name}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="text-center text-sima-mid text-xs sm:hidden">← deslizá para ver más →</p>
      </div>
    </section>
  );
}
