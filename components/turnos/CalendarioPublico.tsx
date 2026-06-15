"use client";

import { useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { agendarTurno } from "@/app/turnos/actions";

/* ─── Configuración de la agenda ───────────────────────────────── */

const HORARIOS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30",
];

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/* ─── Helpers ──────────────────────────────────────────────────── */

function toISO(date: Date) {
  return date.toISOString().split("T")[0];
}

function isSameDay(a: Date, b: Date) {
  return toISO(a) === toISO(b);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ─── Props ────────────────────────────────────────────────────── */

interface Props {
  // Slots ocupados: Map de "YYYY-MM-DD" → Set de "HH:MM"
  turnosOcupados: Record<string, string[]>;
}

/* ─── Formulario ───────────────────────────────────────────────── */

function FormularioTurno({
  fecha,
  hora,
  onCancel,
}: {
  fecha: Date;
  hora: string;
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fechaLegible = fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await agendarTurno({
        nombre: data.get("nombre") as string,
        dni: data.get("dni") as string,
        telefono: data.get("telefono") as string,
        fecha_nacimiento: data.get("fecha_nacimiento") as string,
        motivo: data.get("motivo") as string,
        fecha_turno: toISO(fecha),
        hora_turno: hora,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setExito(true);
      }
    });
  }

  if (exito) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-sima-dark">¡Turno solicitado!</h3>
        <p className="text-slate-500 max-w-xs">
          Tu solicitud fue registrada para el{" "}
          <span className="font-semibold text-sima-dark">{fechaLegible}</span> a las{" "}
          <span className="font-semibold text-sima-dark">{hora}hs</span>.
          Te confirmaremos a la brevedad.
        </p>
        <button
          onClick={onCancel}
          className="mt-2 px-6 py-2 rounded-lg bg-sima-gray text-sima-dark font-semibold hover:bg-slate-200 transition-colors"
        >
          Volver al calendario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Resumen del turno elegido */}
      <div className="bg-sima-accent/10 border border-sima-accent/20 rounded-xl p-4 flex items-center gap-3">
        <Clock className="w-5 h-5 text-sima-accent flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-sima-dark capitalize">{fechaLegible}</p>
          <p className="text-sm text-slate-500">Horario: <span className="font-bold text-sima-accent">{hora}hs</span></p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-semibold text-sima-dark">
            Nombre completo <span className="text-red-400">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="María García"
            className="px-3 py-2.5 rounded-lg border border-sima-gray bg-white text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dni" className="text-sm font-semibold text-sima-dark">
            DNI <span className="text-red-400">*</span>
          </label>
          <input
            id="dni"
            name="dni"
            type="text"
            required
            inputMode="numeric"
            maxLength={8}
            placeholder="12345678"
            className="px-3 py-2.5 rounded-lg border border-sima-gray bg-white text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="telefono" className="text-sm font-semibold text-sima-dark">
            Teléfono <span className="text-red-400">*</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+54 9 11 1234-5678"
            className="px-3 py-2.5 rounded-lg border border-sima-gray bg-white text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fecha_nacimiento" className="text-sm font-semibold text-sima-dark">
            Fecha de nacimiento <span className="text-red-400">*</span>
          </label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            required
            className="px-3 py-2.5 rounded-lg border border-sima-gray bg-white text-sima-dark focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="motivo" className="text-sm font-semibold text-sima-dark">
          Motivo de la consulta
        </label>
        <select
          id="motivo"
          name="motivo"
          defaultValue=""
          className="px-3 py-2.5 rounded-lg border border-sima-gray bg-white text-sima-dark focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
        >
          <option value="" disabled>Seleccioná un motivo...</option>
          <option value="Primera consulta">Primera consulta (sin cargo)</option>
          <option value="Estética dental">Estética dental</option>
          <option value="Implantología">Implantología</option>
          <option value="Restauración">Restauración</option>
          <option value="Blanqueamiento">Blanqueamiento</option>
          <option value="Control">Control</option>
          <option value="Urgencia">Urgencia</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-sima-gray text-sima-dark font-semibold hover:border-sima-accent hover:text-sima-accent transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Confirmar turno"
          )}
        </button>
      </div>
    </form>
  );
}

/* ─── Selector de horarios ─────────────────────────────────────── */

function SelectorHorarios({
  fecha,
  ocupados,
  onSelect,
}: {
  fecha: Date;
  ocupados: string[];
  onSelect: (hora: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-sima-dark text-sm">
        Horarios disponibles —{" "}
        <span className="capitalize">
          {fecha.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
        </span>
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {HORARIOS.map((hora) => {
          const ocupado = ocupados.includes(hora);
          return (
            <button
              key={hora}
              disabled={ocupado}
              onClick={() => onSelect(hora)}
              aria-label={`Turno a las ${hora}${ocupado ? " (ocupado)" : ""}`}
              className={`
                px-3 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all
                ${ocupado
                  ? "border-sima-gray bg-sima-gray text-slate-400 line-through cursor-not-allowed"
                  : "border-sima-accent/30 bg-sima-accent/5 text-sima-accent hover:bg-sima-accent hover:text-white hover:border-sima-accent hover:scale-105 active:scale-95"
                }
              `}
            >
              {hora}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-400">
        Los horarios tachados ya están reservados.
      </p>
    </div>
  );
}

/* ─── Calendario ───────────────────────────────────────────────── */

export default function CalendarioPublico({ turnosOcupados }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // El primer día reservable es mañana (no se toman turnos para el mismo día)
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHora, setSelectedHora] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null);
    setSelectedHora(null);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null);
    setSelectedHora(null);
  }

  function handleSelectDay(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    setSelectedDate(date);
    setSelectedHora(null);
  }

  function handleSelectHora(hora: string) {
    setSelectedHora(hora);
  }

  function handleCancel() {
    setSelectedHora(null);
    // Mantiene la fecha seleccionada para que vean los horarios
  }

  // Días inhabilitados: hoy inclusive, pasados y domingos
  function isDayDisabled(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    return date < minDate || date.getDay() === 0;
  }

  // Slots ocupados para la fecha seleccionada
  const ocupadosHoy = selectedDate
    ? (turnosOcupados[toISO(selectedDate)] ?? [])
    : [];

  // Celda vacía inicial para alinear la grilla
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // No permitir navegar antes del mes actual
  const isPrevDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* ── Panel izquierdo: Calendario ── */}
      <div className="bg-white rounded-2xl border border-sima-gray shadow-sm p-5">
        {/* Cabecera mes */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            disabled={isPrevDisabled}
            aria-label="Mes anterior"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sima-gray disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-sima-dark" />
          </button>

          <h2 className="font-bold text-sima-dark text-lg">
            {MESES[viewMonth]} {viewYear}
          </h2>

          <button
            onClick={nextMonth}
            aria-label="Mes siguiente"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sima-gray transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-sima-dark" />
          </button>
        </div>

        {/* Grilla días semana */}
        <div className="grid grid-cols-7 mb-2">
          {DIAS_SEMANA.map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Grilla días del mes */}
        <div className="grid grid-cols-7 gap-y-1">
          {blanks.map((_, i) => <div key={`b-${i}`} />)}
          {days.map((day) => {
            const date = new Date(viewYear, viewMonth, day);
            const disabled = isDayDisabled(day);
            const isToday = isSameDay(date, today); // solo referencia visual, siempre deshabilitado
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const isoDate = toISO(date);
            const hasSlotsTaken = !disabled && (turnosOcupados[isoDate]?.length ?? 0) > 0;
            const fullyBooked = !disabled && (turnosOcupados[isoDate]?.length ?? 0) >= HORARIOS.length;

            return (
              <button
                key={day}
                onClick={() => !disabled && !fullyBooked && handleSelectDay(day)}
                disabled={disabled || fullyBooked}
                aria-label={`${day} de ${MESES[viewMonth]}`}
                aria-pressed={isSelected}
                className={`
                  relative mx-auto w-9 h-9 rounded-full text-sm font-medium
                  flex items-center justify-center transition-all
                  ${disabled || fullyBooked
                    ? "text-slate-300 cursor-not-allowed"
                    : isSelected
                      ? "bg-sima-accent text-white shadow-md shadow-sima-accent/30 scale-110"
                      : isToday
                        ? "ring-2 ring-sima-accent text-sima-accent font-bold hover:bg-sima-accent hover:text-white"
                        : "text-sima-dark hover:bg-sima-accent/10"
                  }
                `}
              >
                {day}
                {/* Punto indicador de slots parcialmente ocupados */}
                {hasSlotsTaken && !fullyBooked && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-sima-gray text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sima-accent inline-block" />
            Disponible
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            Parcialmente ocupado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-200 inline-block" />
            No disponible
          </span>
        </div>
      </div>

      {/* ── Panel derecho: Horarios / Formulario ── */}
      <div className="bg-white rounded-2xl border border-sima-gray shadow-sm p-5 min-h-[300px] flex flex-col justify-center">
        {!selectedDate && (
          <div className="text-center text-slate-400 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-sima-gray flex items-center justify-center">
              <Clock className="w-7 h-7 text-slate-300" />
            </div>
            <p className="font-medium">Seleccioná un día en el calendario</p>
            <p className="text-sm">Luego elegí el horario que más te convenga.</p>
          </div>
        )}

        {selectedDate && !selectedHora && (
          <SelectorHorarios
            fecha={selectedDate}
            ocupados={ocupadosHoy}
            onSelect={handleSelectHora}
          />
        )}

        {selectedDate && selectedHora && (
          <FormularioTurno
            fecha={selectedDate}
            hora={selectedHora}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
