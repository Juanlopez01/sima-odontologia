"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, User, Loader2, Plus, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { buscarPacientePorDni, crearTurnoManual } from "@/app/admin/actions";

const SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30",
];

type Paciente = { id: string; nombre_completo: string; telefono: string | null };

export default function NuevaCitaPage() {
  const router = useRouter();

  // Búsqueda de paciente
  const [dni, setDni] = useState("");
  const [paciente, setPaciente] = useState<Paciente | null | "no-encontrado">(null);
  const [buscando, startBuscar] = useTransition();

  // Datos del nuevo paciente (si no existe)
  const [nombre, setNombre]   = useState("");
  const [telefono, setTel]    = useState("");
  const [fechaNac, setFechaNac] = useState("");

  // Datos del turno
  const [fecha, setFecha]   = useState("");
  const [hora, setHora]     = useState("");
  const [motivo, setMotivo] = useState("");

  // Submit
  const [enviando, startEnviar] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleBuscar() {
    if (!dni.trim()) return;
    startBuscar(async () => {
      const { paciente: found } = await buscarPacientePorDni(dni);
      setPaciente(found ?? "no-encontrado");
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.set("dni", dni);
    fd.set("fecha_turno", fecha);
    fd.set("hora_turno", hora);
    fd.set("motivo", motivo);
    if (paciente === "no-encontrado") {
      fd.set("nombre_completo", nombre);
      fd.set("telefono", telefono);
      fd.set("fecha_nacimiento", fechaNac);
    }
    startEnviar(async () => {
      const result = await crearTurnoManual(fd);
      if (result?.error) setError(result.error);
      // Si no hay error, crearTurnoManual hace redirect a /admin
    });
  }

  const pacienteEncontrado = paciente !== null && paciente !== "no-encontrado";
  const noEncontrado = paciente === "no-encontrado";
  const hoy = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-xl">
      <Link href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sima-dark transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver al panel
      </Link>

      <div className="bg-white rounded-2xl border border-sima-gray p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-extrabold text-sima-dark">Nueva cita</h1>
          <p className="text-sm text-slate-500 mt-1">
            Registrá un turno tomado por teléfono o en persona. Queda confirmado directamente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* ── Paso 1: Buscar paciente ── */}
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-bold text-sima-dark flex items-center gap-1.5">
              <User className="w-4 h-4 text-sima-accent" />
              Paciente
            </legend>

            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder="DNI del paciente"
                value={dni}
                onChange={e => { setDni(e.target.value); setPaciente(null); }}
                className="flex-1 px-3 py-2.5 rounded-xl border border-sima-gray text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors text-sm"
                required
              />
              <button
                type="button"
                onClick={handleBuscar}
                disabled={buscando || !dni.trim()}
                className="px-4 py-2.5 rounded-xl bg-sima-accent text-white font-semibold hover:bg-sima-accent-hover disabled:opacity-40 transition-colors flex items-center gap-1.5 text-sm"
              >
                {buscando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Buscar
              </button>
            </div>

            {/* Paciente encontrado */}
            {pacienteEncontrado && (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-800">{(paciente as Paciente).nombre_completo}</p>
                  <p className="text-xs text-emerald-600">{(paciente as Paciente).telefono ?? "Sin teléfono"}</p>
                </div>
              </div>
            )}

            {/* Paciente no encontrado → crear */}
            {noEncontrado && (
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Paciente no encontrado — completá los datos para crearlo
                </p>
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  className="px-3 py-2 rounded-lg border border-amber-200 text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm bg-white"
                />
                <input
                  type="tel"
                  placeholder="Teléfono (opcional)"
                  value={telefono}
                  onChange={e => setTel(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-amber-200 text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm bg-white"
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-500 font-medium">Fecha de nacimiento *</label>
                  <input
                    type="date"
                    value={fechaNac}
                    onChange={e => setFechaNac(e.target.value)}
                    required
                    className="px-3 py-2 rounded-lg border border-amber-200 text-sima-dark focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm bg-white"
                  />
                </div>
              </div>
            )}
          </fieldset>

          {/* ── Paso 2: Fecha y hora ── */}
          {(pacienteEncontrado || noEncontrado) && (
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-bold text-sima-dark flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sima-accent" />
                Fecha y horario
              </legend>

              <input
                type="date"
                value={fecha}
                min={hoy}
                onChange={e => setFecha(e.target.value)}
                required
                className="px-3 py-2.5 rounded-xl border border-sima-gray text-sima-dark focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors text-sm"
              />

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setHora(slot)}
                    className={`py-2 rounded-lg text-sm font-semibold border-2 transition-colors
                      ${hora === slot
                        ? "bg-sima-accent border-sima-accent text-white"
                        : "bg-white border-sima-gray text-slate-600 hover:border-sima-accent hover:text-sima-accent"
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {!hora && <p className="text-xs text-slate-400">Seleccioná un horario</p>}
            </fieldset>
          )}

          {/* ── Paso 3: Motivo ── */}
          {(pacienteEncontrado || noEncontrado) && hora && (
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-bold text-sima-dark flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sima-accent" />
                Motivo de la consulta
              </legend>
              <input
                type="text"
                placeholder="Ej: Revisión, blanqueamiento, consulta..."
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                required
                className="px-3 py-2.5 rounded-xl border border-sima-gray text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors text-sm"
              />
            </fieldset>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* Submit */}
          {(pacienteEncontrado || noEncontrado) && hora && motivo && (
            <button
              type="submit"
              disabled={enviando}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover disabled:opacity-50 transition-colors shadow-sm text-base"
            >
              {enviando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              {enviando ? "Guardando..." : "Confirmar cita"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
