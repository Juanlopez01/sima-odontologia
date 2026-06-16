"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Clock, Tag } from "lucide-react";

const SERVICIOS = [
  {
    id: "coronas",
    num: "01",
    titulo: "Coronas",
    sub: "Porcelana · Zirconia",
    descripcion:
      "Restauración completa de la pieza dental con materiales de alta estética. Devuelve forma, función y una apariencia totalmente natural.",
    sesiones: "2 – 3 sesiones",
    precio: "A consultar",
  },
  {
    id: "caries",
    num: "02",
    titulo: "Caries",
    sub: "Restauraciones",
    descripcion:
      "Eliminación de caries y reconstrucción con resinas compuestas de última generación. Resultado imperceptible y duradero.",
    sesiones: "1 sesión",
    precio: "A consultar",
  },
  {
    id: "poste",
    num: "03",
    titulo: "Poste de fibra",
    sub: "Poste · Perno",
    descripcion:
      "Varilla de fibra de vidrio que sostiene y refuerza dientes con pérdida de estructura. Más estética que el metal, menos invasiva y igual de resistente.",
    sesiones: "1 – 2 sesiones",
    precio: "A consultar",
  },
  {
    id: "blanqueamiento",
    num: "04",
    titulo: "Blanqueamiento",
    sub: "Tecnología LED",
    descripcion:
      "Blanqueamiento profesional con luz LED de alta potencia. Resultados visibles en una sola sesión, sin sensibilidad.",
    sesiones: "1 sesión · 24 hs",
    precio: "A consultar",
  },
  {
    id: "tratcon",
    num: "05",
    titulo: "Conductos",
    sub: "Endodoncia",
    descripcion:
      "Elimina la infección interior del diente y preserva la pieza natural. Con anestesia moderna es completamente indoloro.",
    sesiones: "1 – 2 sesiones",
    precio: "A consultar",
  },
  {
    id: "bruxismo",
    num: "06",
    titulo: "Placa de bruxismo",
    sub: "Protección nocturna",
    descripcion:
      "Placa personalizada que protege tus dientes del desgaste, alivia la tensión mandibular y mejora la calidad del sueño.",
    sesiones: "2 visitas · 7 días",
    precio: "A consultar",
  },
  {
    id: "implantes",
    num: "07",
    titulo: "Implantes",
    sub: "Titanio · Alta durabilidad",
    descripcion:
      "Reemplazo permanente del diente perdido con implante de titanio. Función y estética idénticas al diente natural.",
    sesiones: "Varias etapas",
    precio: "A consultar",
  },
];

export default function ServiciosGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SERVICIOS.find((s) => s.id === activeId) ?? null;

  function toggle(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {SERVICIOS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`
                group text-left rounded-2xl p-4 border transition-all duration-200 cursor-pointer
                ${isActive
                  ? "bg-sima-dark border-sima-dark text-white shadow-lg shadow-sima-dark/20 scale-[0.98]"
                  : "bg-white border-sima-gray text-sima-dark hover:border-sima-dark hover:shadow-md"
                }
              `}
            >
              <span className={`text-[11px] font-bold tracking-widest block mb-2 ${isActive ? "text-white/40" : "text-sima-mid"}`}>
                {s.num}
              </span>
              <p className={`text-sm font-extrabold leading-tight ${isActive ? "text-white" : "text-sima-dark"}`}>
                {s.titulo}
              </p>
              <p className={`text-[11px] mt-0.5 font-medium ${isActive ? "text-white/50" : "text-sima-mid"}`}>
                {s.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* Panel de detalle */}
      {active && (
        <div className="bg-white border border-sima-gray rounded-2xl overflow-hidden shadow-sm">
          {/* Header del panel */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-sima-gray">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-sima-mid tracking-widest">{active.num}</span>
              <div>
                <h3 className="font-extrabold text-sima-dark text-base leading-tight">{active.titulo}</h3>
                <p className="text-xs text-sima-mid">{active.sub}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="w-7 h-7 rounded-lg bg-sima-light flex items-center justify-center text-sima-mid hover:bg-sima-dark hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            <p className="text-slate-600 text-sm leading-relaxed">{active.descripcion}</p>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-sima-light rounded-xl px-4 py-2.5 flex-1">
                <Clock className="w-3.5 h-3.5 text-sima-mid shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-sima-mid uppercase tracking-wide">Sesiones</p>
                  <p className="text-sm font-bold text-sima-dark">{active.sesiones}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-sima-light rounded-xl px-4 py-2.5 flex-1">
                <Tag className="w-3.5 h-3.5 text-sima-mid shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-sima-mid uppercase tracking-wide">Precio</p>
                  <p className="text-sm font-bold text-sima-dark">{active.precio}</p>
                </div>
              </div>
            </div>

            <Link
              href="/turnos"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sima-dark text-white font-bold text-sm hover:bg-sima-accent transition-colors"
            >
              Reservar turno para {active.titulo.toLowerCase()}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
