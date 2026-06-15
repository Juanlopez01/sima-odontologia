import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { Calendar, Clock, User, Phone, Search } from "lucide-react";
import type { EstadoTurno } from "@/lib/supabase/types";

const ESTADOS_VALIDOS: EstadoTurno[] = ["pendiente", "confirmado", "rechazado", "cancelado"];

interface TurnoHistorial {
  id: string;
  paciente_id: string;
  fecha_turno: string;
  hora_turno: string;
  motivo: string;
  estado: EstadoTurno;
  pacientes: {
    nombre_completo: string;
    dni: string;
    telefono: string | null;
    fecha_nacimiento: string;
  } | null;
}

export const dynamic = "force-dynamic";

const ESTADO_BADGE: Record<string, string> = {
  pendiente:  "bg-amber-100  text-amber-700  border-amber-200",
  confirmado: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rechazado:  "bg-red-100   text-red-700    border-red-200",
  cancelado:  "bg-slate-100  text-slate-500  border-slate-200",
};

interface Props {
  searchParams: Promise<{ estado?: string; dni?: string }>;
}

export default async function HistorialPage({ searchParams }: Props) {
  const { estado, dni } = await searchParams;
  const supabase = getSupabaseAdminClient();

  let query = supabase
    .from("turnos")
    .select("*, pacientes(nombre_completo, dni, telefono, fecha_nacimiento)")
    .order("fecha_turno", { ascending: false })
    .order("hora_turno",  { ascending: false });

  const estadoFiltro = ESTADOS_VALIDOS.find(e => e === estado);
  if (estadoFiltro) query = query.eq("estado", estadoFiltro);
  if (dni?.trim())                  query = query.ilike("pacientes.dni", `%${dni.trim()}%`);

  const { data: raw } = await query;
  const todos = (raw ?? []) as unknown as TurnoHistorial[];

  // Conteos para los filtros
  const { data: conteos } = await supabase
    .from("turnos")
    .select("estado");

  const counts = (conteos ?? []).reduce<Record<string, number>>((acc, t) => {
    acc[t.estado] = (acc[t.estado] ?? 0) + 1;
    acc.todos     = (acc.todos ?? 0) + 1;
    return acc;
  }, {});

  const FILTROS = [
    { value: "todos",      label: "Todos"      },
    { value: "pendiente",  label: "Pendientes" },
    { value: "confirmado", label: "Confirmados"},
    { value: "rechazado",  label: "Rechazados" },
    { value: "cancelado",  label: "Cancelados" },
  ];

  const estadoActivo = estado ?? "todos";

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-extrabold text-sima-dark">Historial de citas</h1>
        <p className="text-slate-500 text-sm mt-1">Registro completo de todos los turnos.</p>
      </div>

      {/* Filtros + buscador */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filtros por estado */}
        <div className="flex flex-wrap gap-2">
          {FILTROS.map(f => {
            const active = estadoActivo === f.value;
            const params = new URLSearchParams();
            if (f.value !== "todos") params.set("estado", f.value);
            if (dni) params.set("dni", dni);
            const href = `/admin/historial${params.toString() ? "?" + params.toString() : ""}`;
            return (
              <Link key={f.value} href={href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors
                  ${active
                    ? "bg-sima-accent text-white border-sima-accent"
                    : "bg-white text-slate-500 border-sima-gray hover:border-sima-accent hover:text-sima-accent"
                  }`}
              >
                {f.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                  ${active ? "bg-white/25 text-white" : "bg-sima-gray text-slate-500"}`}>
                  {counts[f.value] ?? 0}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Búsqueda por DNI */}
        <form method="GET" className="flex gap-2 sm:ml-auto">
          {estado && <input type="hidden" name="estado" value={estado} />}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              name="dni"
              type="text"
              inputMode="numeric"
              defaultValue={dni ?? ""}
              placeholder="Buscar por DNI..."
              className="pl-8 pr-3 py-2 rounded-xl border border-sima-gray bg-white text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors text-sm w-44"
            />
          </div>
          <button type="submit"
            className="px-4 py-2 rounded-xl bg-sima-accent text-white font-semibold hover:bg-sima-accent-hover transition-colors text-sm shadow-sm">
            Buscar
          </button>
        </form>
      </div>

      {/* Tabla */}
      {todos.length === 0 ? (
        <div className="bg-white rounded-xl border border-sima-gray p-12 text-center text-slate-400">
          <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-200" />
          <p className="font-medium">Sin resultados</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-sima-gray overflow-hidden">
          {/* Header de tabla */}
          <div className="hidden sm:grid grid-cols-[120px_80px_1fr_120px_120px_110px] gap-4 px-5 py-3 bg-sima-light border-b border-sima-gray text-xs font-bold text-slate-400 uppercase tracking-wide">
            <span>Fecha</span>
            <span>Hora</span>
            <span>Paciente</span>
            <span>DNI</span>
            <span>Teléfono</span>
            <span>Estado</span>
          </div>

          <div className="divide-y divide-sima-gray">
            {todos.map(t => {
              const pac    = t.pacientes;
              const nombre = pac?.nombre_completo ?? "Desconocido";
              const fecha  = new Date(t.fecha_turno + "T12:00:00").toLocaleDateString("es-AR", {
                day: "2-digit", month: "2-digit", year: "2-digit",
              });
              const hora = t.hora_turno.slice(0, 5);

              return (
                <div key={t.id}
                  className="grid grid-cols-1 sm:grid-cols-[120px_80px_1fr_120px_120px_110px] gap-2 sm:gap-4 px-5 py-4 hover:bg-sima-light/60 transition-colors">
                  {/* Fecha */}
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 sm:hidden" />
                    <span className="font-medium">{fecha}</span>
                  </div>

                  {/* Hora */}
                  <div className="sm:block hidden">
                    <span className="text-sm font-semibold text-sima-dark">{hora}hs</span>
                  </div>

                  {/* Paciente */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <Link href={`/admin/pacientes/${t.paciente_id}`}
                        className="text-sm font-semibold text-sima-dark hover:text-sima-accent transition-colors truncate">
                        {nombre}
                      </Link>
                    </div>
                    <p className="text-xs text-slate-400 truncate ml-5">{t.motivo}</p>
                    {/* Hora visible en mobile */}
                    <p className="text-xs text-slate-400 flex items-center gap-1 ml-5 sm:hidden">
                      <Clock className="w-3 h-3" />{hora}hs
                    </p>
                  </div>

                  {/* DNI */}
                  <div className="hidden sm:flex items-center">
                    <span className="text-sm text-slate-500 font-mono">{pac?.dni ?? "—"}</span>
                  </div>

                  {/* Teléfono */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {pac?.telefono ? (
                      <a href={`tel:${pac.telefono}`}
                        className="text-sm text-slate-500 hover:text-sima-accent transition-colors flex items-center gap-1">
                        <Phone className="w-3 h-3" />{pac.telefono}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-300">—</span>
                    )}
                  </div>

                  {/* Estado */}
                  <div className="flex items-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ESTADO_BADGE[t.estado] ?? ""}`}>
                      {t.estado.charAt(0).toUpperCase() + t.estado.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 bg-sima-light border-t border-sima-gray text-xs text-slate-400 font-medium">
            {todos.length} {todos.length === 1 ? "registro" : "registros"}
          </div>
        </div>
      )}
    </div>
  );
}
