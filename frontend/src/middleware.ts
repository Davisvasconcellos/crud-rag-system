import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas que exigem autenticação
const PROTECTED_PREFIXES = [
  "/home",
  "/dashboard",
  "/properties",
  "/leads",
  "/rag",
  "/plugins",
  "/ui-elements",
  "/components-showcase",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // 1. Raiz (/): Redireciona com base no status do token
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Rota de Login (/login): Se já estiver logado, manda para /home
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // 3. Rotas protegidas: Se não tiver token, manda para /login
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    // Salva a rota de origem para redirecionar após login se desejar
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas, exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico, assets públicos (.svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
