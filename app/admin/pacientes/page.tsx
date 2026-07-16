import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { Search, User, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function PacientesPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const supabase = getSupabaseAdminClient();

  let pacientes: { id: string; nombre_completo: string; dni: string; telefono: string | null; fecha_nacimiento: string }[] = [];

  if (q?.trim()) {
    const { data } = await supabase
      .from("pacientes")
      .select("*")
      .ilike("nombre_completo", `%${q.trim()}%`)
      .order("nombre_completo");
    pacientes = data ?? [];
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-sima-dark">Pacientes</h1>
        <p className="text-slate-500 text-sm mt-1">Buscá por nombre o apellido para acceder a la ficha y el odontograma.</p>
      </div>

      {/* Buscador */}
      <form method="GET" className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            name="q"
            type="text"
            defaultValue={q ?? ""}
            placeholder="Ingresá el nombre o apellido del paciente..."
            autoFocus
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-sima-gray bg-white text-sima-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sima-accent/40 focus:border-sima-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-sima-accent text-white font-semibold hover:bg-sima-accent-hover transition-colors shadow-sm shrink-0"
        >
          Buscar
        </button>
      </form>

      {/* Resultados */}
      {q && (
        <section>
          <p className="text-sm text-slate-500 mb-3">
            {pacientes.length === 0
              ? `Sin resultados para "${q}"`
              : `${pacientes.length} resultado${pacientes.length !== 1 ? "s" : ""} para "${q}"`}
          </p>

          <div className="flex flex-col gap-2">
            {pacientes.map((p) => (
              <Link
                key={p.id}
                href={`/admin/pacientes/${p.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-sima-gray p-4 hover:border-sima-accent hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-sima-gray flex items-center justify-center shrink-0 group-hover:bg-sima-accent/10 transition-colors">
                  <User className="w-5 h-5 text-slate-500 group-hover:text-sima-accent transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sima-dark truncate group-hover:text-sima-accent transition-colors">
                    {p.nombre_completo}
                  </p>
                  <div className="flex gap-4 mt-0.5">
                    <span className="text-sm text-slate-500">DNI: {p.dni}</span>
                    {p.telefono && (
                      <span className="text-sm text-slate-500">{p.telefono}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sima-accent transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {!q && (
        <div className="bg-white rounded-xl border border-sima-gray p-10 text-center text-slate-400 flex flex-col items-center gap-2">
          <Search className="w-10 h-10 text-slate-200" />
          <p className="font-medium">Ingresá un nombre o apellido para buscar</p>
        </div>
      )}
    </div>
  );
}
