"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

const SERVICIOS = [
  {
    id: "coronas",
    titulo: "Coronas",
    subtitulo: "Porcelana y zirconia",
    descripcion:
      "Restauración estética de alta durabilidad que recubre completamente la pieza dental dañada, devolviéndole su forma, función y estética natural.",
    sesiones: "2 a 3 sesiones",
    precio: "A consultar",
  },
  {
    id: "caries",
    titulo: "Caries",
    subtitulo: "Restauraciones",
    descripcion:
      "Tratamiento y eliminación de caries con resinas compuestas de última generación. Resultado natural, duradero e imperceptible.",
    sesiones: "1 sesión",
    precio: "A consultar",
  },
  {
    id: "poste",
    titulo: "Poste / Perno",
    subtitulo: "Fibra de vidrio",
    descripcion:
      "Restaura y preserva dientes dañados colocando una varilla de fibra de vidrio para darle sostén y resistencia. Mejor estética, menos invasivo y tan resistente como el metal.",
    sesiones: "1 a 2 sesiones",
    precio: "A consultar",
  },
  {
    id: "blanqueamiento",
    titulo: "Blanqueamiento",
    subtitulo: "Tecnología LED",
    descripcion:
      "Blanqueamiento profesional con tecnología LED de última generación. Resultados visibles desde la primera sesión, sin sensibilidad.",
    sesiones: "1 sesión · Entrega en 24 hs",
    precio: "A consultar",
  },
  {
    id: "tratcon",
    titulo: "Trat. de conductos",
    subtitulo: "Endodoncia",
    descripcion:
      "Elimina la infección del interior del diente conservando la pieza natural. Con anestesia moderna el procedimiento es indoloro y los resultados son duraderos.",
    sesiones: "1 a 2 sesiones",
    precio: "A consultar",
  },
  {
    id: "bruxismo",
    titulo: "Placa de Bruxismo",
    subtitulo: "Protección nocturna",
    descripcion:
      "Placa personalizada que protege los dientes del desgaste por bruxismo, alivia la tensión mandibular y mejora la calidad del sueño.",
    sesiones: "2 visitas · Lista en 7 días",
    precio: "A consultar",
  },
  {
    id: "implantes",
    titulo: "Implantes",
    subtitulo: "Titanio de alta durabilidad",
    descripcion:
      "Implantes de titanio que reemplazan la raíz del diente perdido. Función y estética idénticas a los dientes naturales, con larga durabilidad.",
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
    <div className="flex flex-col gap-4">
      {/* Grilla de servicios */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SERVICIOS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`
                group text-left rounded-2xl border-2 p-4 transition-all duration-200
                ${isActive
                  ? "border-sima-accent bg-sima-accent text-white shadow-lg"
                  : "border-sima-gray bg-white text-sima-dark hover:border-sima-accent hover:shadow-md"
                }
              `}
            >
              <p className={`text-base font-bold leading-tight ${isActive ? "text-white" : "text-sima-dark"}`}>
                {s.titulo}
              </p>
              <p className={`text-xs mt-0.5 font-medium ${isActive ? "text-white/80" : "text-sima-mid"}`}>
                {s.subtitulo}
              </p>
            </button>
          );
        })}
      </div>

      {/* Panel de detalle */}
      {active && (
        <div className="bg-white rounded-2xl border border-sima-gray p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-sima-dark">{active.titulo}</h3>
              <p className="text-sm text-sima-mid font-medium">{active.subtitulo}</p>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="w-7 h-7 rounded-full bg-sima-gray flex items-center justify-center text-sima-mid hover:bg-sima-dark hover:text-white transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-500 leading-relaxed text-sm">{active.descripcion}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sima-light rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-sima-mid uppercase tracking-wide mb-0.5">Sesiones</p>
              <p className="text-sm font-bold text-sima-dark">{active.sesiones}</p>
            </div>
            <div className="bg-sima-light rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-sima-mid uppercase tracking-wide mb-0.5">Precio</p>
              <p className="text-sm font-bold text-sima-dark">{active.precio}</p>
            </div>
          </div>

          <Link
            href="/turnos"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sima-dark text-white text-sm font-bold hover:bg-sima-accent transition-colors"
          >
            Reservar turno
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
