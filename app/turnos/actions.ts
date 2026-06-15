"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

interface AgendarTurnoInput {
  nombre: string;
  dni: string;
  telefono: string;
  fecha_nacimiento: string;
  motivo: string;
  fecha_turno: string;
  hora_turno: string;
}

export async function agendarTurno(
  input: AgendarTurnoInput
): Promise<{ error: string | null }> {
  try {
    return await _agendarTurno(input);
  } catch (e) {
    console.error("[agendarTurno] excepción inesperada:", e);
    return { error: "Error de conexión. Verificá que las credenciales de Supabase estén configuradas." };
  }
}

async function _agendarTurno(
  input: AgendarTurnoInput
): Promise<{ error: string | null }> {
  const supabase = await getSupabaseServerClient();

  // 1. Buscar o crear el paciente por DNI
  let pacienteId: string;

  const { data: existente, error: errBusqueda } = await supabase
    .from("pacientes")
    .select("id")
    .eq("dni", input.dni)
    .maybeSingle(); // maybeSingle no lanza error cuando no hay filas

  if (errBusqueda) {
    console.error("[agendarTurno] error buscando paciente:", errBusqueda);
    return { error: "Error al conectar con la base de datos. Intentá de nuevo." };
  }

  if (existente) {
    pacienteId = existente.id;
  } else {
    const { data: nuevo, error: errPaciente } = await supabase
      .from("pacientes")
      .insert({
        dni: input.dni,
        nombre_completo: input.nombre,
        telefono: input.telefono,
        fecha_nacimiento: input.fecha_nacimiento,
      })
      .select("id")
      .single();

    if (errPaciente || !nuevo) {
      console.error("[agendarTurno] error creando paciente:", errPaciente);
      return { error: "No pudimos registrar tus datos. Intentá de nuevo." };
    }
    pacienteId = nuevo.id;
  }

  // 2. Verificar que el slot siga disponible (race condition)
  const { data: slotOcupado, error: errSlot } = await supabase
    .from("turnos")
    .select("id")
    .eq("fecha_turno", input.fecha_turno)
    .eq("hora_turno", input.hora_turno + ":00")
    .in("estado", ["pendiente", "confirmado"])
    .maybeSingle();

  if (errSlot) {
    console.error("[agendarTurno] error verificando slot:", errSlot);
    return { error: "Error al verificar disponibilidad. Intentá de nuevo." };
  }

  if (slotOcupado) {
    return {
      error:
        "Ese horario acaba de ser reservado. Por favor elegí otro.",
    };
  }

  // 3. Insertar el turno
  const { error: errTurno } = await supabase.from("turnos").insert({
    paciente_id: pacienteId,
    fecha_turno: input.fecha_turno,
    hora_turno: input.hora_turno + ":00",
    motivo: input.motivo || "Sin especificar",
    estado: "pendiente",
  });

  if (errTurno) {
    // El error de unique constraint significa que el slot se tomó entre el check y el insert
    if (errTurno.code === "23505") {
      return {
        error: "Ese horario acaba de ser reservado. Por favor elegí otro.",
      };
    }
    return { error: "Ocurrió un error al registrar el turno. Intentá más tarde." };
  }

  return { error: null };
}
