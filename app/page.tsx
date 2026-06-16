import Link from "next/link";
import { Calendar, Phone, MapPin, Clock, Star } from "lucide-react";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ServiciosGrid from "@/components/landing/ServiciosGrid";

/* ─── Logo diente SVG ────────────────────────────────────────────── */

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M12 2C8.8 2 6 4.5 6 8C6 10.5 6.8 12 6.2 15.5C5.6 19 4 24.5 5.8 25.5C7.5 26.5 9 23 10 20L11.5 16L13 20C14 23 15.5 26.5 17.2 25.5C19 24.5 17.4 19 16.8 15.5C16.2 12 17 10.5 17 8C17 4.5 15.2 2 12 2Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M9 8C9.8 6 10.8 5.5 12 5.5C13.2 5.5 14.2 6 15 8"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-b border-sima-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-sima-dark flex items-center justify-center group-hover:bg-sima-accent transition-colors">
            <ToothIcon className="w-4 h-4 text-white" />
          </span>
          <span className="font-bold text-sima-dark text-base tracking-tight">
            SIMA<span className="text-sima-accent">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#servicios" className="text-sm font-medium text-sima-mid hover:text-sima-dark transition-colors">
            Servicios
          </a>
          <a href="#horarios" className="text-sm font-medium text-sima-mid hover:text-sima-dark transition-colors">
            Horarios
          </a>
          <a href="tel:+5491100000000" className="text-sm font-medium text-sima-mid hover:text-sima-dark transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Llamar
          </a>
        </nav>

        <Link
          href="/turnos"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sima-dark text-white text-sm font-semibold hover:bg-sima-accent transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          Pedir turno
        </Link>
      </div>
    </header>
  );
}

/* ─── Hero + Servicios ───────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="pt-14 min-h-screen flex flex-col bg-white">
      {/* Encabezado */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ToothIcon className="w-5 h-5 text-sima-accent" />
          <span className="text-xs font-semibold tracking-widest text-sima-mid uppercase">SIMA Odontología</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sima-dark leading-tight">
          Primera consulta<br />
          <span className="text-sima-accent">sin cargo</span>
        </h1>
        <p className="text-sima-mid text-base max-w-xs">
          Atención personalizada en un ambiente cálido y moderno.
        </p>
      </div>

      {/* Botón TURNOS grande */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 w-full">
        <Link
          href="/turnos"
          className="flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-sima-dark text-white hover:bg-sima-accent transition-colors shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <div>
              <p className="text-lg font-extrabold tracking-tight">Reservar turno</p>
              <p className="text-white/60 text-xs font-medium">Elegí día y horario online</p>
            </div>
          </div>
          <span className="text-white/50 group-hover:text-white transition-colors text-2xl font-light">→</span>
        </Link>
      </div>

      {/* Grilla de servicios */}
      <div id="servicios" className="max-w-5xl mx-auto px-4 sm:px-6 pb-10 w-full flex-1">
        <p className="text-xs font-semibold tracking-widest text-sima-mid uppercase mb-3">
          Nuestros tratamientos
        </p>
        <ServiciosGrid />
      </div>
    </section>
  );
}

/* ─── Horarios ───────────────────────────────────────────────────── */

const HORARIOS = [
  { dia: "Lunes",     horas: "15:00 – 19:30" },
  { dia: "Martes",    horas: "9:00 – 19:30"  },
  { dia: "Miércoles", horas: "16:00 – 19:30" },
  { dia: "Jueves",    horas: "9:00 – 19:30"  },
  { dia: "Viernes",   horas: "15:00 – 19:30" },
  { dia: "Sábado",    horas: "15:00 y 16:00", nota: "Turnos especiales" },
  { dia: "Domingo",   horas: "Cerrado",        cerrado: true },
];

function HorariosSection() {
  return (
    <section id="horarios" className="py-16 bg-sima-light border-t border-sima-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold tracking-widest text-sima-mid uppercase mb-2">
                Horarios
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sima-dark">
                Encontrá el turno que mejor te queda
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sima-mid text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {/* Reemplazar con dirección real */}
                <span>Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center gap-3 text-sima-mid text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+5491100000000" className="hover:text-sima-dark transition-colors">
                  +54 9 11 0000-0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sima-mid text-sm">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Turnos online disponibles las 24 hs</span>
              </div>
            </div>

            <Link
              href="/turnos"
              className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sima-dark text-white font-bold hover:bg-sima-accent transition-colors text-sm"
            >
              <Calendar className="w-4 h-4" />
              Reservar turno
            </Link>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-2xl border border-sima-gray overflow-hidden">
            <div className="px-5 py-3 border-b border-sima-gray">
              <span className="text-xs font-semibold tracking-widest text-sima-mid uppercase">
                Agenda semanal
              </span>
            </div>
            <div className="divide-y divide-sima-gray">
              {HORARIOS.map(({ dia, horas, nota, cerrado }) => (
                <div key={dia} className={`flex items-center justify-between px-5 py-3 ${cerrado ? "opacity-35" : ""}`}>
                  <span className="text-sm font-semibold text-sima-dark">{dia}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${cerrado ? "text-sima-mid" : "text-sima-dark font-medium"}`}>
                      {horas}
                    </span>
                    {nota && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sima-accent/10 text-sima-accent font-semibold">
                        {nota}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonios ────────────────────────────────────────────────── */

const TESTIMONIALS = [
  { name: "María G.", initials: "MG", text: "Me hice las carillas y quedé encantada. El trato es increíble y los resultados superaron mis expectativas.", stars: 5 },
  { name: "Roberto S.", initials: "RS", text: "Tenía miedo al dentista y acá me sentí cómodo desde el primer momento. El implante quedó perfecto.", stars: 5 },
  { name: "Laura P.", initials: "LP", text: "El blanqueamiento fue rápido e indoloro. En una sesión noté una diferencia enorme.", stars: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-16 bg-white border-t border-sima-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-widest text-sima-mid uppercase mb-6">
          Opiniones
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ name, initials, text, stars }) => (
            <blockquote key={name} className="bg-sima-light rounded-2xl p-5 border border-sima-gray flex flex-col gap-3">
              <div className="flex gap-0.5" aria-label={`${stars} estrellas`}>
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sima-dark text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <footer className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sima-dark text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {initials}
                </div>
                <span className="text-sm font-semibold text-sima-dark">{name}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA final ──────────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section className="py-16 bg-sima-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-extrabold text-xl">Tu primera consulta es gratis</p>
          <p className="text-white/50 text-sm mt-1">Sin compromisos. Te asesoramos y definimos el mejor camino.</p>
        </div>
        <Link
          href="/turnos"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Reservar ahora
        </Link>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-sima-dark border-t border-white/5 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sima-accent flex items-center justify-center">
            <ToothIcon className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="font-bold text-white text-sm">SIMA Odontología</span>
        </div>
        <p className="text-white/30 text-xs text-center">
          © {new Date().getFullYear()} SIMA Odontología. Todos los derechos reservados.
        </p>
        <nav className="flex items-center gap-4">
          <a href="#servicios" className="text-white/40 hover:text-white text-xs transition-colors">Servicios</a>
          <a href="#horarios" className="text-white/40 hover:text-white text-xs transition-colors">Horarios</a>
          <Link href="/admin" className="text-white/40 hover:text-white text-xs transition-colors">Admin</Link>
        </nav>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HorariosSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
