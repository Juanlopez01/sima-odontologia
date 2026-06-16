import Link from "next/link";
import { Calendar, Phone, MapPin, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ServiciosGrid from "@/components/landing/ServiciosGrid";

/* ─── Ícono diente ───────────────────────────────────────────────── */

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 2C8.8 2 6 4.5 6 8C6 10.5 6.8 12 6.2 15.5C5.6 19 4 24.5 5.8 25.5C7.5 26.5 9 23 10 20L11.5 16L13 20C14 23 15.5 26.5 17.2 25.5C19 24.5 17.4 19 16.8 15.5C16.2 12 17 10.5 17 8C17 4.5 15.2 2 12 2Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8C9.8 6 10.8 5.5 12 5.5C13.2 5.5 14.2 6 15 8"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-sima-gray">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-sima-dark flex items-center justify-center group-hover:bg-sima-accent transition-colors duration-200">
            <ToothIcon className="w-4 h-4 text-white" />
          </span>
          <span className="font-black text-sima-dark tracking-tight">
            SIMA<span className="text-sima-accent">.</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Principal">
          <a href="#servicios" className="text-sm font-medium text-sima-mid hover:text-sima-dark transition-colors">Servicios</a>
          <a href="#horarios" className="text-sm font-medium text-sima-mid hover:text-sima-dark transition-colors">Horarios</a>
        </nav>

        {/* CTA */}
        <Link
          href="/turnos"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sima-dark text-white text-sm font-bold hover:bg-sima-accent transition-colors duration-200"
        >
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Pedir turno
        </Link>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="min-h-screen pt-14 bg-white flex flex-col">
      <div className="max-w-5xl mx-auto px-5 flex-1 flex flex-col justify-center py-16 gap-8">

        {/* Encabezado */}
        <div className="flex flex-col gap-5 max-w-2xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-sima-light border border-sima-gray text-xs font-bold text-sima-mid tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Primera consulta sin cargo
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-sima-dark leading-[1.05] tracking-tight">
            Cuidamos<br />
            tu sonrisa<span className="text-sima-accent">.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-sima-mid leading-relaxed max-w-md">
            Estética, implantes, blanqueamiento y más — con atención personalizada y tecnología de vanguardia.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2">
            {[
              "Sin lista de espera",
              "+200 pacientes",
              "Turnos online 24 hs",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sima-mid bg-sima-light border border-sima-gray px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA principal */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <Link
            href="/turnos"
            className="group flex-1 flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-sima-dark text-white font-bold text-base hover:bg-sima-accent transition-all duration-200 shadow-lg shadow-sima-dark/15"
          >
            <span className="flex items-center gap-3">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Reservar turno
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>

          <a
            href="tel:+5491100000000"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-sima-gray text-sima-dark font-bold text-base hover:border-sima-dark transition-colors duration-200"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Llamar
          </a>
        </div>

        {/* Estrellas */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5" aria-label="5 estrellas">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </div>
          <span className="text-sm text-sima-mid font-medium">Más de 200 pacientes satisfechos</span>
        </div>

      </div>

      {/* Divisor animado */}
      <div className="h-px bg-gradient-to-r from-transparent via-sima-gray to-transparent" />
    </section>
  );
}

/* ─── Servicios ──────────────────────────────────────────────────── */

function ServiciosSection() {
  return (
    <section id="servicios" className="py-20 bg-sima-dark">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-8">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-white/30 uppercase">Tratamientos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              ¿Qué necesitás?
            </h2>
            <p className="text-white/50 text-sm max-w-sm">
              Seleccioná un tratamiento para ver descripción, sesiones y precio.
            </p>
          </div>
          <Link
            href="/turnos"
            className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-sima-accent transition-colors border border-white/10"
          >
            <Calendar className="w-4 h-4" />
            Ver turnos
          </Link>
        </div>

        {/* Grid interactivo */}
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
  { dia: "Domingo",   horas: "Cerrado", cerrado: true },
];

function HorariosSection() {
  return (
    <section id="horarios" className="py-20 bg-sima-light border-t border-sima-gray">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Texto */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-sima-mid uppercase">Horarios</span>
              <h2 className="text-3xl sm:text-4xl font-black text-sima-dark leading-tight">
                Encontrá el turno que te queda
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin,    text: "Buenos Aires, Argentina" /* Reemplazar */ },
                { icon: Phone,     text: "+54 9 11 0000-0000",      href: "tel:+5491100000000" },
                { icon: Clock,     text: "Turnos online 24 hs" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 text-sima-mid text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white border border-sima-gray flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {href
                    ? <a href={href} className="hover:text-sima-dark transition-colors font-medium">{text}</a>
                    : <span>{text}</span>
                  }
                </div>
              ))}
            </div>

            <Link
              href="/turnos"
              className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sima-dark text-white font-bold text-sm hover:bg-sima-accent transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Reservar turno
            </Link>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-2xl border border-sima-gray overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-sima-gray bg-sima-dark">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Agenda semanal</span>
            </div>
            <div className="divide-y divide-sima-gray">
              {HORARIOS.map(({ dia, horas, nota, cerrado }) => (
                <div key={dia} className={`flex items-center justify-between px-5 py-3.5 ${cerrado ? "opacity-30" : ""}`}>
                  <span className="text-sm font-bold text-sima-dark w-28">{dia}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${cerrado ? "text-sima-mid" : "text-sima-dark font-medium"}`}>{horas}</span>
                    {nota && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sima-accent/10 text-sima-accent font-bold">
                        {nota}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-sima-gray bg-emerald-50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs font-bold text-emerald-700">Primera consulta sin cargo</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Testimonios ────────────────────────────────────────────────── */

const TESTIMONIALS = [
  { name: "María G.",   initials: "MG", text: "Me hice las carillas y quedé encantada. El trato es increíble y los resultados superaron mis expectativas.",     stars: 5 },
  { name: "Roberto S.", initials: "RS", text: "Tenía miedo al dentista y acá me sentí cómodo desde el primer momento. El implante quedó perfecto.",             stars: 5 },
  { name: "Laura P.",   initials: "LP", text: "El blanqueamiento fue rápido e indoloro. En una sesión noté una diferencia enorme. Lo recomiendo totalmente.",   stars: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-20 bg-white border-t border-sima-gray">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest text-sima-mid uppercase">Opiniones</span>
          <h2 className="text-3xl font-black text-sima-dark">
            Lo que dicen nuestros pacientes
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ name, initials, text, stars }) => (
            <blockquote key={name} className="bg-sima-light rounded-2xl p-6 border border-sima-gray flex flex-col gap-4">
              <div className="flex gap-0.5" aria-label={`${stars} estrellas`}>
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sima-dark text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <footer className="flex items-center gap-3 pt-2 border-t border-sima-gray">
                <div className="w-9 h-9 rounded-full bg-sima-dark text-white flex items-center justify-center font-black text-xs shrink-0">
                  {initials}
                </div>
                <span className="text-sm font-bold text-sima-dark">{name}</span>
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
    <section className="py-20 bg-sima-dark">
      <div className="max-w-5xl mx-auto px-5 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-3 max-w-xl">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Tu primera consulta<br />
            <span className="text-sima-accent">es completamente gratis</span>
          </h2>
          <p className="text-white/50 text-base">
            Sin compromisos. Evaluamos tu caso y definimos el mejor camino juntos.
          </p>
        </div>
        <Link
          href="/turnos"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-sima-accent text-white text-lg font-black hover:bg-sima-accent-hover transition-colors shadow-xl shadow-sima-accent/20"
        >
          <Calendar className="w-5 h-5" />
          Reservar mi turno
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-white/30 text-sm">
          También podés llamarnos al{" "}
          <a href="tel:+5491100000000" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">
            +54 9 11 0000-0000
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-sima-dark border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
            <ToothIcon className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="font-black text-white text-sm">SIMA Odontología</span>
        </div>
        <p className="text-white/20 text-xs text-center">
          © {new Date().getFullYear()} SIMA Odontología · Todos los derechos reservados
        </p>
        <nav className="flex items-center gap-4">
          <a href="#servicios" className="text-white/30 hover:text-white text-xs transition-colors">Servicios</a>
          <a href="#horarios"  className="text-white/30 hover:text-white text-xs transition-colors">Horarios</a>
          <Link href="/admin"  className="text-white/30 hover:text-white text-xs transition-colors">Admin</Link>
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
        <Hero />
        <ServiciosSection />
        <HorariosSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
