import { ApiResponse, AuthResponseData, AuthUser, LoginCredentials } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export class AuthService {
  /**
   * Recupera o token JWT do localStorage
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Salva o token JWT no localStorage
   */
  static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
    // Também grava em cookie acessível para eventuais SSR guards
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
  }

  /**
   * Recupera o usuário salvo no localStorage
   */
  static getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthUser;
    } catch {
      return null;
    }
  }

  /**
   * Salva o usuário no localStorage
   */
  static setUser(user: AuthUser): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Limpa token e dados de usuário locais
   */
  static clearStorage(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }

  /**
   * Executa login na API
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponseData> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result: ApiResponse<AuthResponseData> = await response.json();

    if (!response.ok || !result.success || !result.data) {
      const errorMessage = result.message || result.error || "Falha ao realizar login";
      throw new Error(errorMessage);
    }

    this.setToken(result.data.token);
    this.setUser(result.data.user);

    return result.data;
  }

  /**
   * Obtém os dados atualizados do usuário autenticado (/me)
   */
  static async getMe(providedToken?: string): Promise<AuthUser> {
    const token = providedToken || this.getToken();
    if (!token) {
      throw new Error("Nenhum token encontrado");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result: ApiResponse<{ user: AuthUser }> = await response.json();

    if (!response.ok || !result.success || !result.data?.user) {
      // Se o token for inválido ou estiver bloqueado, limpa o armazenamento local
      this.clearStorage();
      const errorMessage = result.message || "Sessão expirada ou inválida";
      throw new Error(errorMessage);
    }

    this.setUser(result.data.user);
    return result.data.user;
  }

  /**
   * Executa logout remoto (invalidando na TokenBlocklist do banco) e local
   */
  static async logout(): Promise<void> {
    const token = this.getToken();

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn("Aviso: falha na invalidação remota do token", err);
      }
    }

    this.clearStorage();
  }
}
