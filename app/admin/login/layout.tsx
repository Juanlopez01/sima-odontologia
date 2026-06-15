// Layout vacío que anula el admin layout para la página de login
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
