"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, PlusCircle, ClipboardList } from "lucide-react";

const NAV = [
  { href: "/admin",            label: "Turnos",    icon: LayoutDashboard },
  { href: "/admin/pacientes",  label: "Pacientes", icon: Users           },
  { href: "/admin/historial",  label: "Historial", icon: ClipboardList   },
];

export function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="flex-1 p-3 flex flex-col gap-1" aria-label="Navegación admin">
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
            ${isActive(href)
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
        >
          <Icon className={`w-4 h-4 shrink-0 transition-colors
            ${isActive(href) ? "text-sima-accent" : "group-hover:text-sima-accent"}`}
          />
          {label}
        </Link>
      ))}

      {/* Nueva cita — siempre destacado */}
      <Link href="/admin/turnos/nuevo"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors mt-2
          ${pathname === "/admin/turnos/nuevo"
            ? "bg-sima-accent text-white"
            : "bg-sima-accent/15 text-sima-accent hover:bg-sima-accent/25"
          }`}
      >
        <PlusCircle className="w-4 h-4 shrink-0" />
        Nueva cita
      </Link>
    </nav>
  );
}

export function AdminNavMobile() {
  const pathname = usePathname();

  const ALL = [
    ...NAV,
    { href: "/admin/turnos/nuevo", label: "Nueva cita", icon: PlusCircle },
  ];

  return (
    <>
      {ALL.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} aria-label={label}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors
            ${pathname === href || (href !== "/admin" && pathname.startsWith(href))
              ? "text-sima-accent bg-white/10"
              : "text-slate-400 hover:text-white hover:bg-white/10"
            }`}
        >
          <Icon className="w-4 h-4" />
        </Link>
      ))}
    </>
  );
}
