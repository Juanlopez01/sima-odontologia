"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Clock, CreditCard, Banknote, MessageCircle } from "lucide-react";

type Precios = { debito: string; efectivo: string };

type Servicio = {
  id: string;
  num: string;
  titulo: string;
  sub: string;
  descripcion: string;
  sesiones: string;
  precios?: Precios;
  whatsapp?: true;
};

const SERVICIOS: Servicio[] = [
  {
    id: "coronas",
    num: "01",
    titulo: "Coronas",
    sub: "Porcelana · Zirconia",
    descripcion:
      "Restauración completa de la pieza dental con materiales de alta estética. Devuelve forma, función y una apariencia totalmente natural.",
    sesiones: "2 – 3 sesiones",
    whatsapp: true,
  },
  {
    id: "caries",
    num: "02",
    titulo: "Caries",
    sub: "Restauraciones",
    descripcion:
      "Eliminación de caries y reconstrucción con resinas compuestas de última generación. Resultado imperceptible y duradero.",
    sesiones: "1 sesión",
    whatsapp: true,
  },
  {
    id: "poste",
    num: "03",
    titulo: "Poste de fibra",
    sub: "Poste · Perno",
    descripcion:
      "Varilla de fibra de vidrio que sostiene y refuerza dientes con pérdida de estructura. Más estética que el metal, menos invasiva y igual de resistente.",
    sesiones: "1 – 2 sesiones",
    whatsapp: true,
  },
  {
    id: "blanqueamiento",
    num: "04",
    titulo: "Blanqueamiento",
    sub: "Luz halógena · 2 sesiones",
    descripcion:
      "1ª sesión: evaluación de encías, limpieza dental y aplicación de gel blanqueador con luz halógena. 2ª sesión (una semana después): se refuerza el tratamiento para un tono más uniforme. Incluye kit de cuidado.",
    sesiones: "2 sesiones",
    precios: { debito: "$252.600", efectivo: "$220.000" },
  },
  {
    id: "tratcon",
    num: "05",
    titulo: "Conductos",
    sub: "Endodoncia",
    descripcion:
      "Elimina la infección interior del diente y preserva la pieza natural. Con anestesia moderna es completamente indoloro.",
    sesiones: "1 – 2 sesiones",
    whatsapp: true,
  },
  {
    id: "bruxismo",
    num: "06",
    titulo: "Placa de bruxismo",
    sub: "Descanso nocturno",
    descripcion:
      "1ª visita: evaluamos tu caso y hacemos la impresión. 2ª visita (5 a 7 días después): prueba en boca para verificar ajuste y confort, ultimamos detalles y entregamos.",
    sesiones: "2 visitas · 7 días",
    precios: { debito: "$218.600", efectivo: "$190.000" },
  },
  {
    id: "implantes",
    num: "07",
    titulo: "Implantes",
    sub: "Titanio · Alta durabilidad",
    descripcion:
      "Reemplazo permanente del diente perdido con implante de titanio. Función y estética idénticas al diente natural.",
    sesiones: "Varias etapas",
    whatsapp: true,
  },
];

const WA_NUMBER = "5491100000000"; // Reemplazar con el número real

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
          {/* Header */}
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
              aria-label="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            <p className="text-slate-600 text-sm leading-relaxed">{active.descripcion}</p>

            {/* Sesiones */}
            <div className="flex items-center gap-2 bg-sima-light rounded-xl px-4 py-2.5">
              <Clock className="w-3.5 h-3.5 text-sima-mid shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-sima-mid uppercase tracking-wide">Sesiones</p>
                <p className="text-sm font-bold text-sima-dark">{active.sesiones}</p>
              </div>
            </div>

            {/* Precios reales */}
            {active.precios && (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-sima-light rounded-xl px-4 py-2.5 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CreditCard className="w-3 h-3 text-sima-mid" />
                    <p className="text-[10px] font-bold text-sima-mid uppercase tracking-wide">Débito / Crédito</p>
                  </div>
                  <p className="text-base font-black text-sima-dark">{active.precios.debito}</p>
                  <p className="text-[10px] text-sima-mid">hasta 3 cuotas sin interés</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Banknote className="w-3 h-3 text-emerald-600" />
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Efectivo / Transf.</p>
                  </div>
                  <p className="text-base font-black text-emerald-700">{active.precios.efectivo}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">15% OFF</p>
                </div>
              </div>
            )}

            {/* CTA */}
            {active.whatsapp ? (
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola! Me gustaría consultar el precio de ${active.titulo}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebe5c] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar precio por WhatsApp
              </a>
            ) : (
              <Link
                href="/turnos"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sima-dark text-white font-bold text-sm hover:bg-sima-accent transition-colors"
              >
                Reservar turno para {active.titulo.toLowerCase()}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
