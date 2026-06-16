import { headers } from "next/headers";
import { LogOut } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { logout } from "./login/actions";
import { AdminNav, AdminBottomNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  if (pathname === "/admin/login") return <>{children}</>;

  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-sima-light flex">
      {/* ── Sidebar desktop ── */}
      <aside className="hidden md:flex flex-col w-60 bg-sima-dark border-r border-white/5 shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-sima-accent flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-tight leading-none">
              SIMA<span className="text-sima-accent">.</span>
            </p>
            <p className="text-slate-500 text-xs">Admin</p>
          </div>
        </div>

        {/* Nav — Client Component con usePathname */}
        <AdminNav />

        {/* Footer con email y logout */}
        <div className="p-3 border-t border-white/5 shrink-0">
          <div className="px-3 py-2 mb-1">
            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
          </div>
          <form action={logout}>
            <button type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4 shrink-0" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Header mobile ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 bg-sima-dark border-b border-white/5 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sima-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-white font-bold text-sm">SIMA Admin</span>
          </div>
          <form action={logout}>
            <button type="submit" aria-label="Cerrar sesión"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-auto">
          {children}
        </main>
      </div>

      <AdminBottomNav />
    </div>
  );
}
