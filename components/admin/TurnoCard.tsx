"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Check, X, Calendar, Clock, User, Phone, Loader2, MessageCircle, Ban } from "lucide-react";
import { confirmarTurno, rechazarTurno, cancelarTurno } from "@/app/admin/actions";

interface TurnoConPaciente {
  id: string;
  fecha_turno: string;
  hora_turno: string;
  motivo: string;
  estado: string;
  paciente_id: string;
  pacientes: {
    nombre_completo: string;
    dni: string;
    telefono: string | null;
  } | null;
}

interface Props {
  turno: TurnoConPaciente;
  soloLectura?: boolean;
}

const ESTADO_BADGE: Record<string, string> = {
  pendiente:  "bg-amber-100 text-amber-700 border-amber-200",
  confirmado: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rechazado:  "bg-red-100 text-red-700 border-red-200",
  cancelado:  "bg-slate-100 text-slate-500 border-slate-200",
};

function waLink(telefono: string, nombre: string) {
  const num = telefono.replace(/\D/g, "");
  const msg = encodeURIComponent(`Hola ${nombre}, te contactamos desde SIMA Odontología.`);
  return `https://wa.me/${num}?text=${msg}`;
}

export default function TurnoCard({ turno, soloLectura = false }: Props) {
  const [isPendingConfirm,  startConfirm]  = useTransition();
  const [isPendingRechazar, startRechazar] = useTransition();
  const [isPendingCancelar, startCancelar] = useTransition();

  const fechaLegible = new Date(turno.fecha_turno + "T12:00:00").toLocaleDateString("es-AR", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

  const nombre = turno.pacientes?.nombre_completo ?? "Paciente desconocido";
  const tel    = turno.pacientes?.telefono ?? null;
  const esPendiente  = turno.estado === "pendiente";
  const esConfirmado = turno.estado === "confirmado";

  return (
    <article className="bg-white rounded-xl border border-sima-gray p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-sima-gray flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-slate-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/admin/pacientes/${turno.paciente_id}`}
              className="font-bold text-sima-dark hover:text-sima-accent transition-colors truncate"
            >
              {nombre}
            </Link>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${ESTADO_BADGE[turno.estado] ?? ""}`}>
              {turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Calendar className="w-3.5 h-3.5" />{fechaLegible}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="w-3.5 h-3.5" />{turno.hora_turno.slice(0, 5)}hs
            </span>
            {tel && (
              <a href={`tel:${tel}`}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-sima-accent transition-colors">
                <Phone className="w-3.5 h-3.5" />{tel}
              </a>
            )}
            {tel && (
              <a href={waLink(tel, nombre)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
                <MessageCircle className="w-3.5 h-3.5" />WA
              </a>
            )}
          </div>

          <p className="text-sm text-slate-400 mt-1 truncate">
            <span className="font-medium text-slate-600">Motivo:</span> {turno.motivo}
          </p>
        </div>
      </div>

      {/* Acciones */}
      {!soloLectura && (
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {esPendiente && (
            <>
              <button
                onClick={() => startRechazar(async () => { await rechazarTurno(turno.id); })}
                disabled={isPendingConfirm || isPendingRechazar}
                aria-label="Rechazar turno"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors"
              >
                {isPendingRechazar ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                Rechazar
              </button>
              <button
                onClick={() => startConfirm(async () => { await confirmarTurno(turno.id); })}
                disabled={isPendingConfirm || isPendingRechazar}
                aria-label="Confirmar turno"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 disabled:opacity-50 transition-colors shadow-sm"
              >
                {isPendingConfirm ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Confirmar
              </button>
            </>
          )}

          {esConfirmado && (
            <button
              onClick={() => {
                if (confirm("¿Cancelar este turno?"))
                  startCancelar(async () => { await cancelarTurno(turno.id); });
              }}
              disabled={isPendingCancelar}
              aria-label="Cancelar turno"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-slate-200 text-slate-500 text-sm font-semibold hover:border-red-200 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              {isPendingCancelar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
              Cancelar
            </button>
          )}
        </div>
      )}
    </article>
  );
}
