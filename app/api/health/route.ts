import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  const checks: Record<string, unknown> = {
    env: {
      url_set: url !== "" && !url.includes("TU_PROJECT"),
      url_preview: url.slice(0, 40),
      key_set: key !== "" && !key.includes("TU_ANON"),
      key_preview: key.slice(0, 20) + "...",
    },
  };

  if (!checks.env || (checks.env as Record<string, unknown>).url_set === false) {
    return NextResponse.json(
      { ...checks, diagnóstico: "❌ NEXT_PUBLIC_SUPABASE_URL no está configurado o sigue siendo el placeholder." },
      { status: 200 }
    );
  }

  const supabase = await getSupabaseServerClient();

  // Test tabla pacientes
  const { error: errPacientes } = await supabase
    .from("pacientes")
    .select("id")
    .limit(1);

  checks.tabla_pacientes = errPacientes
    ? { error: errPacientes.code, message: errPacientes.message }
    : "✅ ok";

  // Test tabla turnos
  const { error: errTurnos } = await supabase
    .from("turnos")
    .select("id")
    .limit(1);

  checks.tabla_turnos = errTurnos
    ? { error: errTurnos.code, message: errTurnos.message }
    : "✅ ok";

  // Test INSERT en pacientes (con rollback simulado — solo verifica permisos)
  const { error: errInsert } = await supabase
    .from("pacientes")
    .select("id")
    .eq("dni", "__health_check__")
    .maybeSingle();

  checks.permiso_select_pacientes = errInsert
    ? { error: errInsert.code, message: errInsert.message }
    : "✅ ok";

  return NextResponse.json(checks, { status: 200 });
}
