import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Phone, Calendar, FileText } from "lucide-react";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import OdontogramaEditor from "@/components/odontograma/OdontogramaEditor";
import type { EstadoDiente } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PacienteDetallePage({ params }: Props) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();

  const [{ data: paciente }, { data: odontograma }, { data: turnos }] = await Promise.all([
    supabase.from("pacientes").select("*").eq("id", id).single(),
    supabase.from("odontogramas").select("*").eq("paciente_id", id).maybeSingle(),
    supabase
      .from("turnos")
      .select("*")
      .eq("paciente_id", id)
      .order("fecha_turno", { ascending: false })
      .limit(10),
  ]);

  if (!paciente) notFound();

  const estadoDientes = (odontograma?.estado_dientes ?? {}) as Record<string, EstadoDiente>;

  const edad = (() => {
    const hoy = new Date();
    const nac = new Date(paciente.fecha_nacimiento);
    let a = hoy.getFullYear() - nac.getFullYear();
    if (hoy < new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate())) a--;
    return a;
  })();

  const ESTADO_BADGE: Record<string, string> = {
    pendiente: "bg-amber-100 text-amber-700",
    confirmado: "bg-emerald-100 text-emerald-700",
    rechazado: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Back */}
      <Link
        href="/admin/pacientes"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sima-dark transition-colors self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a pacientes
      </Link>

      {/* Ficha del paciente */}
      <div className="bg-white rounded-2xl border border-sima-gray p-6 flex flex-col sm:flex-row gap-5">
        <div className="w-14 h-14 rounded-full bg-sima-accent/10 flex items-center justify-center shrink-0">
          <User className="w-7 h-7 text-sima-accent" />
        </div>
        <div className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-3">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Nombre</p>
            <p className="font-bold text-sima-dark text-lg">{paciente.nombre_completo}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">DNI</p>
            <p className="font-semibold text-sima-dark">{paciente.dni}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide flex items-center gap-1">
              <Phone className="w-3 h-3" /> Teléfono
            </p>
            <a href={`tel:${paciente.telefono}`} className="font-semibold text-sima-dark hover:text-sima-accent transition-colors">
              {paciente.telefono ?? "—"}
            </a>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Fecha de nacimiento
            </p>
            <p className="font-semibold text-sima-dark">
              {new Date(paciente.fecha_nacimiento + "T12:00:00").toLocaleDateString("es-AR", {
                day: "numeric", month: "long", year: "numeric",
              })}{" "}
              <span className="text-slate-400 font-normal">({edad} años)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Odontograma */}
      <section>
        <h2 className="text-lg font-extrabold text-sima-dark mb-4">Odontograma</h2>
        <p className="text-sm text-slate-500 mb-4">
          Hacé click en cualquier diente para cambiar su estado. Los cambios se guardan al presionar <strong>Guardar cambios</strong>.
        </p>
        <OdontogramaEditor pacienteId={id} initialEstado={estadoDientes} />
      </section>

      {/* Historial de turnos */}
      <section>
        <h2 className="text-lg font-extrabold text-sima-dark mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-sima-accent" />
          Historial de turnos
        </h2>

        {!turnos?.length ? (
          <div className="bg-white rounded-xl border border-sima-gray p-6 text-center text-slate-400">
            Sin turnos registrados
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {turnos.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl border border-sima-gray px-4 py-3 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sima-dark text-sm">
                      {new Date(t.fecha_turno + "T12:00:00").toLocaleDateString("es-AR", {
                        weekday: "short", day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                    <span className="text-slate-400 text-sm">{t.hora_turno.slice(0, 5)}hs</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ESTADO_BADGE[t.estado]}`}
                    >
                      {t.estado.charAt(0).toUpperCase() + t.estado.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5 truncate">{t.motivo}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
