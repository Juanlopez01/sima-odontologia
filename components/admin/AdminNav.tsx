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

export function AdminBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const ALL = [
    ...NAV,
    { href: "/admin/turnos/nuevo", label: "Nueva cita", icon: PlusCircle },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-sima-dark border-t border-white/5 flex items-stretch"
      aria-label="Navegación admin"
    >
      {ALL.map(({ href, icon: Icon, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold transition-colors
              ${active ? "text-sima-accent" : "text-slate-400 hover:text-white"}
            `}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
