import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import CalendarioPublico from "@/components/turnos/CalendarioPublico";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

/* ─── Fetch de turnos ocupados ─────────────────────────────────── */

async function getTurnosOcupados(): Promise<Record<string, string[]>> {
  const supabase = await getSupabaseServerClient();

  // Traemos solo turnos pendientes y confirmados desde hoy en adelante
  const hoy = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("turnos")
    .select("fecha_turno, hora_turno")
    .gte("fecha_turno", hoy)
    .in("estado", ["pendiente", "confirmado"]);

  if (error || !data) return {};

  // Agrupar por fecha → array de horarios "HH:MM"
  return data.reduce<Record<string, string[]>>((acc, turno) => {
    const fecha = turno.fecha_turno;
    // hora_turno viene como "HH:MM:SS", normalizamos a "HH:MM"
    const hora = turno.hora_turno.slice(0, 5);
    acc[fecha] = [...(acc[fecha] ?? []), hora];
    return acc;
  }, {});
}

/* ─── Page ─────────────────────────────────────────────────────── */

export const dynamic = "force-dynamic"; // siempre fresco, nunca cacheado

export default async function TurnosPage() {
  const turnosOcupados = await getTurnosOcupados();

  return (
    <>
      {/* Navbar mínima */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-sima-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-sima-accent flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">S</span>
            </span>
            <span className="font-semibold text-sima-dark text-lg tracking-tight">
              SIMA<span className="text-sima-accent">.</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sima-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-sima-light py-10 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
          {/* Encabezado */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sima-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-sima-accent uppercase tracking-wide">
                Agenda online
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sima-dark">
              Reservá tu turno
            </h1>
            <p className="text-slate-500 text-lg max-w-xl">
              Elegí el día y horario que más te convenga. La primera consulta es{" "}
              <span className="font-semibold text-sima-dark">sin cargo</span>.
            </p>
          </div>

          {/* Info rápida */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Horario de atención", value: "Lun–Vie · 9:00 a 18:00" },
              { label: "Dirección", value: "Av. Ejemplo 1234, CABA" },
              { label: "Primera consulta", value: "100% sin cargo" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-sima-gray px-4 py-3 flex flex-col gap-0.5"
              >
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {label}
                </span>
                <span className="text-sm font-bold text-sima-dark">{value}</span>
              </div>
            ))}
          </div>

          {/* Calendario principal */}
          <CalendarioPublico turnosOcupados={turnosOcupados} />
        </div>
      </main>

      <WhatsAppButton />
    </>
  );
}
