"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-sima-dark flex items-center justify-center px-4">
      {/* Fondo decorativo */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sima-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sima-nude/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-sima-accent flex items-center justify-center shadow-lg shadow-sima-accent/30">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div className="text-center">
            <h1 className="text-white font-bold text-xl tracking-tight">
              SIMA<span className="text-sima-accent">.</span> Admin
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Panel de administración</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-sima-accent" />
            <span className="text-white font-semibold text-sm">Acceso restringido</span>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <p className="text-red-400 text-sm">{state.error}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-slate-300 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@simaodontologia.com"
                className="
                  px-4 py-3 rounded-xl
                  bg-white/10 border border-white/10
                  text-white placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-sima-accent/50 focus:border-sima-accent/50
                  transition-colors
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="
                  px-4 py-3 rounded-xl
                  bg-white/10 border border-white/10
                  text-white placeholder:text-slate-500
                  focus:outline-none focus:ring-2 focus:ring-sima-accent/50 focus:border-sima-accent/50
                  transition-colors
                "
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="
                mt-2 w-full py-3 rounded-xl
                bg-sima-accent text-white font-bold
                hover:bg-sima-accent-hover
                disabled:opacity-60 disabled:cursor-not-allowed
                inline-flex items-center justify-center gap-2
                transition-colors shadow-lg shadow-sima-accent/20
              "
            >
              {isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Entrando...</>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
