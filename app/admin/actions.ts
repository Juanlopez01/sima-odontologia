"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { EstadoDiente } from "@/lib/supabase/types";

export async function confirmarTurno(id: string): Promise<{ error: string | null }> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("turnos")
    .update({ estado: "confirmado" })
    .eq("id", id);

  if (error) return { error: "No se pudo confirmar el turno." };
  revalidatePath("/admin");
  return { error: null };
}

export async function rechazarTurno(id: string): Promise<{ error: string | null }> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("turnos")
    .update({ estado: "rechazado" })
    .eq("id", id);

  if (error) return { error: "No se pudo rechazar el turno." };
  revalidatePath("/admin");
  return { error: null };
}

export async function cancelarTurno(id: string): Promise<{ error: string | null }> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("turnos")
    .update({ estado: "cancelado" })
    .eq("id", id);

  if (error) return { error: "No se pudo cancelar el turno." };
  revalidatePath("/admin");
  return { error: null };
}

export async function buscarPacientePorDni(dni: string): Promise<{
  paciente: { id: string; nombre_completo: string; telefono: string | null } | null;
  error: string | null;
}> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pacientes")
    .select("id, nombre_completo, telefono")
    .eq("dni", dni.trim())
    .maybeSingle();

  if (error) return { paciente: null, error: "Error al buscar paciente." };
  return { paciente: data, error: null };
}

export async function crearTurnoManual(formData: FormData): Promise<{ error: string | null }> {
  const supabase = getSupabaseAdminClient();

  const dni            = (formData.get("dni") as string)?.trim();
  const nombre         = (formData.get("nombre_completo") as string)?.trim();
  const telefono       = (formData.get("telefono") as string)?.trim() || null;
  const fecha_nac      = (formData.get("fecha_nacimiento") as string)?.trim();
  const fecha_turno    = formData.get("fecha_turno") as string;
  const hora_turno     = formData.get("hora_turno") as string;
  const motivo         = (formData.get("motivo") as string)?.trim();

  if (!dni || !fecha_turno || !hora_turno || !motivo)
    return { error: "Completá todos los campos obligatorios." };

  // Buscar o crear paciente
  let pacienteId: string;
  const { data: existente } = await supabase
    .from("pacientes").select("id").eq("dni", dni).maybeSingle();

  if (existente) {
    pacienteId = existente.id;
  } else {
    if (!nombre || !fecha_nac)
      return { error: "Paciente no encontrado. Completá nombre y fecha de nacimiento para crearlo." };
    const { data: nuevo, error: errPac } = await supabase
      .from("pacientes")
      .insert({ dni, nombre_completo: nombre, telefono, fecha_nacimiento: fecha_nac })
      .select("id").single();
    if (errPac || !nuevo) return { error: "No se pudo crear el paciente." };
    pacienteId = nuevo.id;
  }

  // Verificar conflicto de horario
  const { data: conflicto } = await supabase
    .from("turnos").select("id")
    .eq("fecha_turno", fecha_turno)
    .eq("hora_turno", hora_turno + ":00")
    .not("estado", "in", '("rechazado","cancelado")')
    .maybeSingle();

  if (conflicto) return { error: "Ese horario ya está ocupado." };

  const { error } = await supabase.from("turnos").insert({
    paciente_id: pacienteId,
    fecha_turno,
    hora_turno: hora_turno + ":00",
    motivo,
    estado: "confirmado",
  });

  if (error) return { error: "No se pudo crear el turno." };
  revalidatePath("/admin");
  redirect("/admin");
}

export async function actualizarOdontograma(
  pacienteId: string,
  estadoDientes: Record<string, EstadoDiente>
): Promise<{ error: string | null }> {
  const supabase = getSupabaseAdminClient();

  const { data: existing } = await supabase
    .from("odontogramas")
    .select("id")
    .eq("paciente_id", pacienteId)
    .maybeSingle();

  const { error } = existing
    ? await supabase
        .from("odontogramas")
        .update({ estado_dientes: estadoDientes })
        .eq("paciente_id", pacienteId)
    : await supabase
        .from("odontogramas")
        .insert({ paciente_id: pacienteId, estado_dientes: estadoDientes });

  if (error) return { error: "No se pudo guardar el odontograma." };
  revalidatePath(`/admin/pacientes/${pacienteId}`);
  return { error: null };
}
