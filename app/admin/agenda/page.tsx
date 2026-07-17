import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { bloquearDia, desbloquearDia } from "./actions";
import { CalendarX, Trash2, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

interface DiaBloqueado {
  id: string;
  fecha: string;
  motivo: string | null;
}

function formatFecha(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AgendaPage() {
  const supabase = getSupabaseAdminClient();
  const hoy = new Date().toISOString().split("T")[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("dias_bloqueados")
    .select("*")
    .gte("fecha", hoy)
    .order("fecha");

  const bloqueados: DiaBloqueado[] = data ?? [];

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-extrabold text-sima-dark">Cierre de agenda</h1>
        <p className="text-slate-500 text-sm mt-1">
          Bloqueá días para que no se puedan tomar turnos online (feriados, vacaciones, etc.).
        </p>
      </div>

      {/* Formulario para cerrar un día */}
      <div className="bg-white rounded-2xl border border-sima-gray p-5 flex flex-col gap-4">
        <h2 className="text-base font-bold text-sima-dark flex items-center gap-2">
          <Lock className="w-4 h-4 text-sima-accent" />
          Cerrar un día
        </h2>
        <form action={bloquearDia} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="fecha" className="text-sm font-semibold text-sima-dark">
              Fecha <span className="text-red-400">*</span>
            </label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              min={hoy}
              required
              className="px-3 py-2.5 rounded-xl border border-sima-gray text-sima-dark focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="motivo" className="text-sm font-semibold text-sima-dark">
              Motivo <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <input
              id="motivo"
              name="motivo"
              type="text"
              placeholder="Ej: Feriado nacional, Vacaciones..."
              className="px-3 py-2.5 rounded-xl border border-sima-gray text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sima-dark text-white font-bold hover:bg-sima-dark/80 transition-colors"
          >
            <CalendarX className="w-4 h-4" />
            Cerrar día
          </button>
        </form>
      </div>

      {/* Lista de días bloqueados */}
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold text-sima-dark">
          Días cerrados próximos
          {bloqueados.length > 0 && (
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
              {bloqueados.length}
            </span>
          )}
        </h2>

        {bloqueados.length === 0 ? (
          <div className="bg-white rounded-xl border border-sima-gray p-8 text-center text-slate-400">
            <CalendarX className="w-8 h-8 mx-auto mb-2 text-slate-200" />
            <p className="font-medium text-sm">Sin días bloqueados</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {bloqueados.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-sima-gray px-4 py-3"
              >
                <CalendarX className="w-5 h-5 text-red-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sima-dark text-sm capitalize truncate">
                    {formatFecha(d.fecha)}
                  </p>
                  {d.motivo && (
                    <p className="text-xs text-slate-400 truncate">{d.motivo}</p>
                  )}
                </div>
                <form action={desbloquearDia}>
                  <input type="hidden" name="id" value={d.id} />
                  <button
                    type="submit"
                    title="Reabrir este día"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
