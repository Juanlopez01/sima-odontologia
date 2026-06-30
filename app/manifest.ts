import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIMA Odontología",
    short_name: "SIMA",
    description: "Primera consulta sin cargo. Estética dental, implantes y más en Congreso, CABA.",
    start_url: "/admin",
    display: "standalone",
    background_color: "#F2F5F7",
    theme_color: "#2E3235",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Turnos",
        url: "/admin/turnos/nuevo",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Pacientes",
        url: "/admin/pacientes",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
