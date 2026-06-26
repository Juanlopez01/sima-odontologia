"use client";

const WHATSAPP_NUMBER = "5491140600936";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola! Me gustaría consultar sobre la primera consulta sin cargo."
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-16 h-16 rounded-full
        bg-[#25D366] text-white shadow-2xl
        hover:scale-110 hover:shadow-[0_0_0_6px_rgba(37,211,102,0.25)]
        transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-[#25D366]/50
      "
    >
      {/* WhatsApp SVG oficial */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-9 h-9"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.88-1.8A13.28 13.28 0 0016.003 29.333c7.364 0 13.334-5.97 13.334-13.333S23.367 2.667 16.003 2.667zm0 24c-2.12 0-4.2-.587-6-1.693l-.427-.254-4.08 1.067 1.08-3.973-.28-.44A10.627 10.627 0 015.334 16c0-5.88 4.787-10.667 10.667-10.667S26.667 10.12 26.667 16 21.88 26.667 16.003 26.667zm5.853-7.987c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.187-.347.213-.667.053-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.267 3.453 5.493 4.84.76.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
      </svg>
    </a>
  );
}
