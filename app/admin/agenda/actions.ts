"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function bloquearDia(formData: FormData): Promise<void> {
  const fecha = (formData.get("fecha") as string)?.trim();
  const motivo = (formData.get("motivo") as string)?.trim() || null;

  if (!fecha) return;

  const supabase = getSupabaseAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("dias_bloqueados")
    .upsert({ fecha, motivo }, { onConflict: "fecha" });

  revalidatePath("/admin/agenda");
}

export async function desbloquearDia(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  if (!id) return;

  const supabase = getSupabaseAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("dias_bloqueados")
    .delete()
    .eq("id", id);

  revalidatePath("/admin/agenda");
}
