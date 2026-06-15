import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Wrench,
  CircleDot,
  Sun,
  Phone,
  Calendar,
  ChevronRight,
  Star,
  Shield,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

/* ─── Datos ──────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Sparkles,
    title: "Estética Dental",
    description:
      "Coronas de porcelana, carillas de composite y cerámica para una sonrisa perfecta y natural.",
    badge: null,
    iconColor: "text-sima-accent",
    imgBg: "from-sky-200 to-sky-100",
    // Reemplazar con foto real: /images/estetica-dental.jpg
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e38?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Wrench,
    title: "Restauraciones",
    description:
      "Postes de fibra de vidrio, resinas de última generación y reconstrucciones estéticas.",
    badge: null,
    iconColor: "text-amber-500",
    imgBg: "from-amber-200 to-amber-100",
    img: "https://images.unsplash.com/photo-1588776814546-1ffedca9b88b?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: CircleDot,
    title: "Implantología",
    description:
      "Implantes de titanio de alta durabilidad. Recuperá la función y estética de tus dientes.",
    badge: null,
    iconColor: "text-emerald-500",
    imgBg: "from-emerald-200 to-emerald-100",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Sun,
    title: "Blanqueamiento",
    description:
      "Blanqueamiento LED en consultorio con resultados visibles desde la primera sesión.",
    badge: "Entrega en 24 hs",
    iconColor: "text-yellow-500",
    imgBg: "from-yellow-200 to-yellow-100",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Activity,
    title: "Endodoncia",
    description:
      "Tratamiento de conductos radiculares para eliminar la infección y conservar el diente natural.",
    badge: null,
    iconColor: "text-rose-500",
    imgBg: "from-rose-200 to-rose-100",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Shield,
    title: "Placa de Bruxismo",
    description:
      "Si apretás o rechinás los dientes, podés estar desgastando tu esmalte sin darte cuenta. Nuestra placa protege tus dientes, alivia la tensión mandibular y mejora tu descanso.",
    badge: "Lista en 7 días",
    iconColor: "text-violet-500",
    imgBg: "from-violet-200 to-violet-100",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
  },
];

// Paneles informativos — textos y fotos se actualizan cuando la cliente los envíe
const INFO_PANELS = [
  {
    icon: Shield,
    title: "¿Qué es la placa de bruxismo?",
    body: "El bruxismo puede causar desgaste dental, fracturas, sensibilidad y dolor en la articulación de la mandíbula, muchas veces sin que lo notes. Nuestra placa de descanso actúa como una barrera entre los dientes superiores e inferiores, protegiéndolos del desgaste, aliviando la tensión muscular y mejorando tu descanso. Se adapta perfectamente a tu mordida.",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-100",
    // Reemplazar con foto real: /images/panel-bruxismo.jpg
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Placa de bruxismo personalizada",
  },
  {
    icon: Sun,
    title: "Blanqueamiento dental: lo que tenés que saber",
    body: "Un tratamiento profesional y seguro que aclara el color natural de tus dientes. En SIMA usamos tecnología LED de última generación para resultados visibles en una sola sesión, con entrega en 24 horas.",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
    // Reemplazar con foto real: /images/panel-blanqueamiento.jpg
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Blanqueamiento dental LED",
  },
  {
    icon: Activity,
    title: "Endodoncia sin miedo",
    body: "La endodoncia (o tratamiento de conductos) salva un diente infectado eliminando el tejido dañado. Con anestesia moderna el procedimiento es indoloro, seguro y los resultados son duraderos.",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-100",
    // Reemplazar con foto real: /images/panel-endodoncia.jpg
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Tratamiento de endodoncia",
  },
];

const HORARIOS = [
  { dia: "Lunes",     horas: "15:00 – 19:30", open: true  },
  { dia: "Martes",    horas: "9:00 – 19:30",  open: true  },
  { dia: "Miércoles", horas: "16:00 – 19:30", open: true  },
  { dia: "Jueves",    horas: "9:00 – 19:30",  open: true  },
  { dia: "Viernes",   horas: "15:00 – 19:30", open: true  },
  { dia: "Sábado",    horas: "15:00 y 16:00", open: true, nota: "Turnos especiales" },
  { dia: "Domingo",   horas: "Cerrado",        open: false },
];

const TESTIMONIALS = [
  {
    name: "María G.",
    initials: "MG",
    color: "bg-sky-100 text-sky-600",
    text: "Me hice las carillas y quedé encantada. El trato es increíble y los resultados superaron mis expectativas.",
    stars: 5,
  },
  {
    name: "Roberto S.",
    initials: "RS",
    color: "bg-emerald-100 text-emerald-600",
    text: "Tenía miedo al dentista y acá me sentí cómodo desde el primer momento. El implante quedó perfecto.",
    stars: 5,
  },
  {
    name: "Laura P.",
    initials: "LP",
    color: "bg-violet-100 text-violet-600",
    text: "El blanqueamiento fue rápido e indoloro. En una sesión noté una diferencia enorme.",
    stars: 5,
  },
];

/* ─── Navbar ─────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-sm border-b border-sima-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-sima-accent flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-sm leading-none">S</span>
          </span>
          <span className="font-semibold text-sima-dark text-lg tracking-tight">
            SIMA<span className="text-sima-accent">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          <a href="#servicios" className="text-sm font-medium text-slate-500 hover:text-sima-dark transition-colors">
            Servicios
          </a>
          <a href="#horarios" className="text-sm font-medium text-slate-500 hover:text-sima-dark transition-colors">
            Horarios
          </a>
          <Link href="/turnos" className="text-sm font-medium text-slate-500 hover:text-sima-dark transition-colors">
            Turnos
          </Link>
        </nav>

        <Link
          href="/turnos"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sima-accent text-white text-sm font-semibold hover:bg-sima-accent-hover transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          Pedir turno
        </Link>

        <a
          href="tel:+5491100000000"
          aria-label="Llamar al consultorio"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-sima-gray hover:bg-sima-accent/20 transition-colors"
        >
          <Phone className="w-5 h-5 text-sima-dark" />
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sima-light via-white to-sky-50 pt-16">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-sima-accent/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-sima-nude/40 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-sima-accent/10 text-sima-accent text-sm font-semibold border border-sima-accent/20">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Primera consulta SIN CARGO
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sima-dark leading-tight tracking-tight">
            Te ayudamos a{" "}
            <span className="relative inline-block">
              <span className="text-sima-accent">transformar</span>
              <svg aria-hidden="true" viewBox="0 0 200 12" className="absolute -bottom-1 left-0 w-full" fill="none">
                <path d="M2 8 C50 2, 150 2, 198 8" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>{" "}
            tu sonrisa
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-lg">
            Estética dental, implantes, blanqueamiento y más con tecnología de vanguardia.
            Atención personalizada en un ambiente cálido y confiable.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/turnos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sima-accent text-white text-lg font-bold hover:bg-sima-accent-hover shadow-lg shadow-sima-accent/30 hover:shadow-xl hover:shadow-sima-accent/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sima-accent/40"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Reservar turno gratis
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Link>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-sima-dark text-lg font-semibold border-2 border-sima-gray hover:border-sima-accent hover:text-sima-accent transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sima-gray"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Ver servicios
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <div className="flex" aria-label="5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <span className="font-medium">+200 pacientes</span>
            </div>
            <div className="h-4 w-px bg-sima-gray" aria-hidden="true" />
            <span className="text-slate-500 text-sm font-medium">Sin listas de espera</span>
            <div className="h-4 w-px bg-sima-gray" aria-hidden="true" />
            <span className="text-slate-500 text-sm font-medium">Turnos online 24hs</span>
          </div>
        </div>

        {/* Ilustración */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sima-accent/20 to-sima-nude/30" />
            <div className="absolute inset-8 flex items-center justify-center">
              <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-xl" aria-hidden="true">
                <path d="M35 95 C30 120, 25 135, 30 138 C35 140, 40 130, 45 110" fill="#E6D5C3" stroke="#D4C0AB" strokeWidth="1.5" />
                <path d="M60 100 C60 125, 60 138, 60 138" stroke="#D4C0AB" strokeWidth="3" strokeLinecap="round" />
                <path d="M85 95 C90 120, 95 135, 90 138 C85 140, 80 130, 75 110" fill="#E6D5C3" stroke="#D4C0AB" strokeWidth="1.5" />
                <path d="M20 60 C18 30, 25 10, 38 8 C50 6, 55 20, 60 20 C65 20, 70 6, 82 8 C95 10, 102 30, 100 60 C98 80, 90 95, 80 98 C70 102, 50 102, 40 98 C30 95, 22 80, 20 60 Z"
                  fill="white" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M35 30 C37 22, 45 18, 50 22" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                <path d="M38 42 C40 36, 47 33, 51 36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 border border-sima-gray">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Próximo turno</p>
                <p className="text-sm font-bold text-sima-dark">Hoy disponible</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-sima-accent text-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-bold">SIN CARGO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Servicios ──────────────────────────────────────────────────── */

function ServicesSection() {
  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-sima-accent/10 text-sima-accent text-sm font-semibold mb-4">
            Nuestros servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sima-dark leading-tight mb-4">
            Todo lo que tu sonrisa necesita
          </h2>
          <p className="text-lg text-slate-500">
            Trabajamos con materiales de primera línea y tecnología de vanguardia
            para darte resultados duraderos y naturales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, badge, iconColor, imgBg, img }) => (
            <article
              key={title}
              className="group relative rounded-2xl overflow-hidden border border-sima-gray bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Imagen */}
              <div className={`relative h-44 bg-gradient-to-br ${imgBg} overflow-hidden`}>
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-sima-dark shadow-sm backdrop-blur-sm">
                    {badge}
                  </span>
                )}
              </div>
              {/* Contenido */}
              <div className="p-5">
                <div className={`w-10 h-10 rounded-xl bg-sima-light flex items-center justify-center mb-3 ${iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-sima-dark mb-1.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                <Link
                  href="/turnos"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-sima-accent hover:underline"
                >
                  Consultar turno
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Paneles informativos ───────────────────────────────────────── */

function InfoPanelsSection() {
  return (
    <section className="py-20 bg-sima-light border-t border-sima-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-sima-accent/10 text-sima-accent text-sm font-semibold mb-4">
            Te informamos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sima-dark leading-tight mb-3">
            Lo que necesitás saber
          </h2>
          <p className="text-slate-500 text-lg">
            Conocé más sobre los tratamientos más consultados en el consultorio.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {INFO_PANELS.map(({ icon: Icon, title, body, iconColor, iconBg, img, imgAlt }, i) => (
            <article
              key={title}
              className={`bg-white rounded-2xl border border-sima-gray overflow-hidden hover:shadow-md transition-shadow flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Imagen */}
              <div className="relative md:w-72 lg:w-80 h-52 md:h-auto flex-shrink-0">
                <Image
                  src={img}
                  alt={imgAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              {/* Texto */}
              <div className="p-6 lg:p-8 flex flex-col justify-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} self-start`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-sima-dark text-xl leading-snug">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{body}</p>
                <Link
                  href="/turnos"
                  className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-sima-accent hover:underline self-start"
                >
                  Pedir turno
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Horarios ───────────────────────────────────────────────────── */

function HorariosSection() {
  return (
    <section id="horarios" className="py-20 lg:py-28 bg-white border-t border-sima-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="flex flex-col gap-5">
            <span className="inline-block px-3 py-1 rounded-full bg-sima-accent/10 text-sima-accent text-sm font-semibold self-start">
              Horarios de atención
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sima-dark leading-tight">
              Encontrá el turno que mejor te queda
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Atendemos de lunes a sábado con amplia disponibilidad horaria.
              También podés reservar tu turno online en cualquier momento.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-9 h-9 rounded-full bg-sima-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-sima-accent" />
                </div>
                <span className="text-sm font-medium">Turnos online disponibles las 24 hs</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-9 h-9 rounded-full bg-sima-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-sima-accent" />
                </div>
                {/* Completar con la dirección real */}
                <span className="text-sm font-medium">Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-9 h-9 rounded-full bg-sima-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-sima-accent" />
                </div>
                <a href="tel:+5491100000000" className="text-sm font-medium hover:text-sima-accent transition-colors">
                  +54 9 11 0000-0000
                </a>
              </div>
            </div>

            <Link
              href="/turnos"
              className="self-start inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Reservar turno
            </Link>
          </div>

          {/* Tabla de horarios */}
          <div className="bg-sima-light rounded-2xl border border-sima-gray overflow-hidden">
            <div className="px-6 py-4 bg-sima-dark flex items-center gap-2">
              <Clock className="w-4 h-4 text-sima-accent" />
              <span className="text-white font-bold text-sm">Horarios de atención</span>
            </div>
            <div className="divide-y divide-sima-gray">
              {HORARIOS.map(({ dia, horas, open, nota }) => (
                <div key={dia} className={`flex items-center justify-between px-6 py-3.5 ${!open ? "opacity-40" : ""}`}>
                  <span className={`text-sm font-semibold ${open ? "text-sima-dark" : "text-slate-400"}`}>
                    {dia}
                  </span>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${open ? "text-slate-600" : "text-slate-400"}`}>
                      {horas}
                    </span>
                    {nota && (
                      <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-sima-accent/10 text-sima-accent font-semibold">
                        {nota}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-xs font-semibold text-emerald-700">Primera consulta sin cargo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonios ────────────────────────────────────────────────── */

function TestimonialsSection() {
  return (
    <section className="py-20 bg-sima-light border-t border-sima-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sima-dark mb-3">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-slate-500 text-lg">Más de 200 sonrisas transformadas</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, initials, color, text, stars }) => (
            <blockquote
              key={name}
              className="bg-white rounded-2xl p-6 border border-sima-gray shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex" aria-label={`${stars} estrellas`}>
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-slate-600 text-base leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <footer className="flex items-center gap-3">
                {/* Avatar — reemplazar con <Image> cuando lleguen fotos reales */}
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
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

/* ─── CTA Banner ─────────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <section className="py-20 bg-sima-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          Tu primera consulta es{" "}
          <span className="text-sima-accent">completamente gratis</span>
        </h2>
        <p className="text-slate-300 text-lg max-w-xl">
          Sin compromisos. Evaluamos tu caso, te explicamos opciones y definimos
          juntos el mejor camino para tu sonrisa.
        </p>
        <Link
          href="/turnos"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-sima-accent text-white text-xl font-bold hover:bg-sima-accent-hover shadow-xl shadow-sima-accent/30 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sima-accent/50"
        >
          <Calendar className="w-6 h-6" aria-hidden="true" />
          Reservar mi turno ahora
        </Link>
        <p className="text-slate-400 text-sm">
          También podés llamarnos al{" "}
          <a href="tel:+5491100000000" className="text-sima-accent hover:underline font-semibold">
            +54 9 11 0000-0000
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer className="bg-sima-dark border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-sima-accent flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </span>
          <span className="font-semibold text-white">SIMA Odontología</span>
        </div>
        <p className="text-slate-400 text-sm text-center">
          © {new Date().getFullYear()} SIMA Odontología. Todos los derechos reservados.
        </p>
        <nav className="flex items-center gap-4" aria-label="Links del pie">
          <a href="#servicios" className="text-slate-400 hover:text-white text-sm transition-colors">
            Servicios
          </a>
          <a href="#horarios" className="text-slate-400 hover:text-white text-sm transition-colors">
            Horarios
          </a>
          <Link href="/admin" className="text-slate-400 hover:text-white text-sm transition-colors">
            Admin
          </Link>
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
        <ServicesSection />
        <InfoPanelsSection />
        <HorariosSection />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
