import Link from "next/link";
import Image from "next/image";
import { Clock, CreditCard, Banknote, MessageCircle, ArrowRight, Images } from "lucide-react";
import CasosCarousel, { type Caso } from "./CasosCarousel";

type Precios = { debito: string; efectivo: string };
type Fotos   = { antes: string; despues: string; labelDespues?: string };

type Servicio = {
  num: string;
  titulo: string;
  sub: string;
  descripcion: string;
  sesiones: string;
  precios?: Precios;
  fotos?: Fotos;
  casos?: Caso[];
  galeria?: string[];
  whatsapp?: true;
  verFotos?: true;
};

const WA_NUMBER = "5491140600936";

const SERVICIOS: Servicio[] = [
  {
    num: "01",
    titulo: "Limpieza dental",
    sub: "Profilaxis",
    descripcion: "Eliminación profesional de sarro y placa bacteriana. Esencial para mantener encías y dientes sanos. Se realiza con ultrasonido y pulido final.",
    sesiones: "1 sesión",
    whatsapp: true,
    fotos: { antes: "/limpieza-antes.jpeg", despues: "/limpieza-despues.jpeg" },
  },
  {
    num: "02",
    titulo: "Blanqueamiento",
    sub: "Luz halógena · 2 sesiones",
    descripcion: "1ª sesión: evaluación de encías, limpieza dental y aplicación de gel blanqueador con luz halógena. 2ª sesión (una semana después): se refuerza el tratamiento para un tono más uniforme. Incluye kit de cuidado.",
    sesiones: "2 sesiones",
    precios: { debito: "$252.600", efectivo: "$220.000" },
    fotos: { antes: "/blanqueamiento-antes.jpg", despues: "/blanqueamiento-despues.jpg" },
  },
  {
    num: "03",
    titulo: "Placa de bruxismo",
    sub: "Descanso nocturno",
    descripcion: "1ª visita: evaluamos tu caso y hacemos la impresión. 2ª visita (5 a 7 días después): prueba en boca para verificar ajuste y confort, ultimamos detalles y entregamos.",
    sesiones: "2 visitas · 7 días",
    precios: { debito: "$252.600", efectivo: "$220.000" },
    fotos: { antes: "/bruxismo-antes.jpg", despues: "/bruxismo-despues.jpg", labelDespues: "Con placa" },
  },
  {
    num: "04",
    titulo: "Coronas",
    sub: "Porcelana · Zirconia",
    descripcion: "Restauración completa en porcelana o zirconia — sin acrílico. Los mejores materiales para un resultado natural, duradero y estéticamente impecable.",
    sesiones: "2 – 3 sesiones",
    whatsapp: true,
    fotos: { antes: "/zirconio-antes.jpg.jpeg", despues: "/zirconio-despues.jpeg", labelDespues: "Con corona" },
  },
  {
    num: "05",
    titulo: "Caries",
    sub: "Restauraciones",
    descripcion: "Eliminación de caries y reconstrucción con resinas compuestas de última generación. Resultado imperceptible y duradero.",
    sesiones: "1 sesión",
    whatsapp: true,
    casos: [
      { antes: "/caries-antes.png", despues: "/caries-despues.png" },
    ],
  },
  {
    num: "06",
    titulo: "Poste de fibra",
    sub: "Poste · Perno",
    descripcion: "Varilla de fibra de vidrio que sostiene y refuerza dientes con pérdida de estructura. Más estética que el metal, menos invasiva y igual de resistente.",
    sesiones: "1 – 2 sesiones",
    whatsapp: true,
  },
  {
    num: "07",
    titulo: "Conductos",
    sub: "Endodoncia",
    descripcion: "Elimina la infección interior del diente y preserva la pieza natural. Con anestesia moderna es completamente indoloro. Contamos con equipo de rayos X en el consultorio para diagnóstico en el momento. Especialista presente el 3er jueves de cada mes, de 14 a 17 hs.",
    sesiones: "1 – 2 sesiones",
    whatsapp: true,
  },
  {
    num: "08",
    titulo: "Implantes",
    sub: "Titanio · Alta durabilidad",
    descripcion: "Reemplazo permanente del diente perdido con implante de titanio. Función y estética idénticas al diente natural.",
    sesiones: "Varias etapas",
    whatsapp: true,
  },
  {
    num: "09",
    titulo: "Prótesis removible",
    sub: "Dentadura · Acrílico",
    descripcion: "Rehabilitación oral con prótesis totales o parciales removibles. Recuperá tu función masticatoria y estética con comodidad y un ajuste personalizado.",
    sesiones: "Varias etapas",
    whatsapp: true,
    galeria: ["/protesis-removible1..jpg.jpeg", "/protesis-removible2.jpg.jpeg", "/protesis-removible3.jpg.jpeg", "/protesis-removible4.jpg.jpeg"],
  },
  {
    num: "10",
    titulo: "Exodoncias",
    sub: "Extracciones",
    descripcion: "Extracción dental simple o compleja realizada con anestesia local. El procedimiento es cómodo, rápido y sin dolor.",
    sesiones: "1 sesión",
    whatsapp: true,
  },
];

function PrecioBlock({ precios }: { precios: Precios }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-white/5 rounded-xl px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <CreditCard className="w-3 h-3 text-white/40" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wide">Débito / Crédito</span>
        </div>
        <p className="text-lg font-black text-white leading-none">{precios.debito}</p>
        <p className="text-[10px] text-white/30 mt-0.5">hasta 3 cuotas sin interés</p>
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Banknote className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Efectivo / Transf.</span>
        </div>
        <p className="text-lg font-black text-emerald-300 leading-none">{precios.efectivo}</p>
        <p className="text-[10px] text-emerald-400/70 mt-0.5 font-semibold">15% OFF</p>
      </div>
    </div>
  );
}

function ServicioCard({ s }: { s: Servicio }) {
  const waMsgPrecio = encodeURIComponent(`Hola! Me gustaría consultar el precio de ${s.titulo}.`);
  const waMsgFotos  = encodeURIComponent(`Hola! Me gustaría ver fotos del tratamiento de ${s.titulo}.`);

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Fotos antes/después con zoom */}
      {s.fotos && (
        <CasosCarousel casos={[s.fotos]} titulo={s.titulo} />
      )}

      {/* Carousel de múltiples casos */}
      {s.casos && (
        <CasosCarousel casos={s.casos} titulo={s.titulo} vertical />
      )}

      {/* Galería de múltiples fotos (2x2) */}
      {s.galeria && (
        <div className="grid grid-cols-2">
          {s.galeria.map((src, i) => (
            <div key={src} className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={`${s.titulo} — foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 300px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-white/30 tracking-widest">{s.num}</span>
            <h3 className="text-base font-black text-white leading-tight mt-0.5">{s.titulo}</h3>
            <p className="text-xs text-white/40 font-medium">{s.sub}</p>
          </div>
          <div className="shrink-0 flex items-center gap-1 bg-white/5 rounded-full px-2.5 py-1">
            <Clock className="w-3 h-3 text-white/40" />
            <span className="text-[11px] font-bold text-white/60 whitespace-nowrap">{s.sesiones}</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{s.descripcion}</p>

        {/* Precios / botones */}
        <div className="mt-auto flex flex-col gap-2">
          {s.precios && <PrecioBlock precios={s.precios} />}

          {s.whatsapp && (
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waMsgPrecio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebe5c] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar precio
            </a>
          )}

          {s.verFotos && (
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waMsgFotos}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 text-white/60 font-semibold text-sm hover:bg-white/5 hover:text-white transition-colors"
            >
              <Images className="w-4 h-4" />
              Ver fotos
            </a>
          )}

          {!s.whatsapp && s.precios && (
            <Link
              href="/turnos"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-sima-dark font-bold text-sm hover:bg-sima-accent hover:text-white transition-colors"
            >
              Reservar turno
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ServiciosGrid() {
  const featured = SERVICIOS.filter((s) => s.fotos || s.casos || s.galeria);
  const basic    = SERVICIOS.filter((s) => !s.fotos && !s.casos && !s.galeria);

  return (
    <div className="flex flex-col gap-4">
      {/* Con fotos: 2 cols mobile, 3 cols desktop */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featured.map((s) => <ServicioCard key={s.num} s={s} />)}
      </div>

      {/* Sin fotos: 4 columnas en desktop */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {basic.map((s) => <ServicioCard key={s.num} s={s} />)}
      </div>
    </div>
  );
}
