"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function bloquearDia(formData: FormData): Promise<{ error: string | null }> {
  const fecha = (formData.get("fecha") as string)?.trim();
  const motivo = (formData.get("motivo") as string)?.trim() || null;

  if (!fecha) return { error: "Seleccioná una fecha." };

  const supabase = getSupabaseAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("dias_bloqueados")
    .upsert({ fecha, motivo }, { onConflict: "fecha" });

  if (error) return { error: "No se pudo cerrar el día." };
  revalidatePath("/admin/agenda");
  return { error: null };
}

export async function desbloquearDia(formData: FormData): Promise<{ error: string | null }> {
  const id = formData.get("id") as string;
  if (!id) return { error: "ID inválido." };

  const supabase = getSupabaseAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("dias_bloqueados")
    .delete()
    .eq("id", id);

  if (error) return { error: "No se pudo reabrir el día." };
  revalidatePath("/admin/agenda");
  return { error: null };
}
