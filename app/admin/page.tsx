import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import TurnoCard from "@/components/admin/TurnoCard";
import { Calendar, CheckCircle, Clock, Users, Plus, Phone, MessageCircle } from "lucide-react";
import type { EstadoTurno } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

interface TurnoConPaciente {
  id: string;
  paciente_id: string;
  fecha_turno: string;
  hora_turno: string;
  motivo: string;
  estado: EstadoTurno;
  pacientes: { nombre_completo: string; dni: string; telefono: string | null } | null;
}

function waLink(tel: string, nombre: string) {
  const num = tel.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(`Hola ${nombre}, te contactamos desde SIMA Odontología.`)}`;
}

export default async function AdminDashboard() {
  const supabase = getSupabaseAdminClient();

  const hoy = new Date().toISOString().split("T")[0];

  // Lunes de la semana actual
  const lunesDate = new Date();
  lunesDate.setDate(lunesDate.getDate() - ((lunesDate.getDay() + 6) % 7));
  const lunes = lunesDate.toISOString().split("T")[0];
  const domingoDate = new Date(lunesDate);
  domingoDate.setDate(domingoDate.getDate() + 6);
  const domingo = domingoDate.toISOString().split("T")[0];

  const [{ data: turnos }, { count: totalPacientes }] = await Promise.all([
    supabase
      .from("turnos")
      .select("*, pacientes(nombre_completo, dni, telefono)")
      .order("fecha_turno", { ascending: true })
      .order("hora_turno", { ascending: true }),
    supabase.from("pacientes").select("*", { count: "exact", head: true }),
  ]);

  const todos      = (turnos ?? []) as unknown as TurnoConPaciente[];
  const pendientes = todos.filter(t => t.estado === "pendiente");
  const agendaHoy  = todos.filter(t => t.fecha_turno === hoy && t.estado === "confirmado");
  const semana     = todos.filter(t => t.fecha_turno >= lunes && t.fecha_turno <= domingo && t.estado === "confirmado");
  const proximos   = todos.filter(t => t.fecha_turno > hoy && t.estado === "confirmado").slice(0, 8);

  const STATS = [
    { label: "Pendientes",       value: pendientes.length,       icon: Clock,        color: "text-amber-500",  bg: "bg-amber-50",  ring: pendientes.length > 0 ? "ring-2 ring-amber-200" : "" },
    { label: "Confirmados hoy",  value: agendaHoy.length,        icon: CheckCircle,  color: "text-emerald-500",bg: "bg-emerald-50", ring: "" },
    { label: "Esta semana",      value: semana.length,           icon: Calendar,     color: "text-sima-accent",bg: "bg-sky-50",    ring: "" },
    { label: "Total pacientes",  value: totalPacientes ?? 0,     icon: Users,        color: "text-violet-500", bg: "bg-violet-50", ring: "" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Encabezado */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-sima-dark">Panel de administración</h1>
          <p className="text-slate-500 text-sm mt-1 capitalize">
            {new Date().toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link
          href="/admin/turnos/nuevo"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nueva cita
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg, ring }) => (
          <div key={label} className={`bg-white rounded-xl border border-sima-gray p-4 flex items-center gap-3 ${ring}`}>
            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-sima-dark">{value}</p>
              <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Agenda del día */}
      <section>
        <h2 className="text-base font-bold text-sima-dark mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sima-accent" />
          Agenda de hoy
          {agendaHoy.length > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              {agendaHoy.length} {agendaHoy.length === 1 ? "turno" : "turnos"}
            </span>
          )}
        </h2>

        {agendaHoy.length === 0 ? (
          <div className="bg-white rounded-xl border border-sima-gray p-6 text-center text-slate-400">
            <p className="font-medium">Sin turnos confirmados para hoy</p>
            <Link href="/admin/turnos/nuevo" className="inline-flex items-center gap-1.5 mt-2 text-sm text-sima-accent hover:underline font-semibold">
              <Plus className="w-3.5 h-3.5" />
              Agregar una cita de hoy
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-sima-gray overflow-hidden divide-y divide-sima-gray">
            {agendaHoy.map(t => {
              const nombre = t.pacientes?.nombre_completo ?? "Desconocido";
              const tel    = t.pacientes?.telefono ?? null;
              return (
                <div key={t.id} className="flex items-center gap-4 px-4 py-3">
                  <div className="text-center shrink-0 w-14">
                    <span className="text-sm font-extrabold text-sima-accent block">
                      {t.hora_turno.slice(0, 5)}
                    </span>
                    <span className="text-[10px] text-slate-400">hs</span>
                  </div>
                  <div className="w-px self-stretch bg-sima-gray shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link href={`/admin/pacientes/${t.paciente_id}`}
                      className="font-semibold text-sima-dark hover:text-sima-accent transition-colors truncate block text-sm">
                      {nombre}
                    </Link>
                    <p className="text-xs text-slate-400 truncate">{t.motivo}</p>
                  </div>
                  {tel && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={`tel:${tel}`}
                        className="w-8 h-8 rounded-lg bg-sima-gray flex items-center justify-center text-slate-500 hover:text-sima-accent hover:bg-sima-accent/10 transition-colors"
                        title={`Llamar a ${nombre}`}>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a href={waLink(tel, nombre)} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                        title={`WhatsApp a ${nombre}`}>
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Pendientes */}
      <section>
        <h2 className="text-base font-bold text-sima-dark mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          Solicitudes pendientes
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
            {pendientes.length}
          </span>
        </h2>

        {pendientes.length === 0 ? (
          <div className="bg-white rounded-xl border border-sima-gray p-8 text-center text-slate-400">
            <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-300" />
            <p className="font-medium">Sin solicitudes pendientes</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendientes.map(turno => <TurnoCard key={turno.id} turno={turno} />)}
          </div>
        )}
      </section>

      {/* Próximas citas */}
      {proximos.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-sima-dark mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            Próximas citas confirmadas
          </h2>
          <div className="flex flex-col gap-2">
            {proximos.map(turno => <TurnoCard key={turno.id} turno={turno} />)}
          </div>
        </section>
      )}
    </div>
  );
}
