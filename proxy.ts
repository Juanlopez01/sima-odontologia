import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si no hay credenciales configuradas, dejar pasar sin autenticar
  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  try {
    let supabaseResponse = NextResponse.next({
      request: { headers: requestHeaders },
    });

    const supabase = createServerClient(supabaseUrl, supabaseAnon, {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (user && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return supabaseResponse;
  } catch {
    // Si algo falla (Supabase caído, credenciales inválidas, etc.), dejar pasar
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
