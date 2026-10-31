"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, LoginCredentials } from "@/types/auth";
import { AuthService } from "@/services/auth.service";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Inicialização e revalidação do token ao carregar a página
  const initAuth = useCallback(async () => {
    try {
      const storedToken = AuthService.getToken();
      const storedUser = AuthService.getUser();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      if (storedUser) {
        setUser(storedUser);
      }

      // Revalida remotamente com a API para garantir que o token não está revogado ou expirado
      try {
        const freshUser = await AuthService.getMe(storedToken);
        setUser(freshUser);
      } catch (err) {
        console.warn("Token salvo não é mais válido:", err);
        setUser(null);
        setToken(null);
        AuthService.clearStorage();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Função de login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const data = await AuthService.login(credentials);
      setUser(data.user);
      setToken(data.token);
      router.push("/home");
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout (invalida local e remotamente na TokenBlocklist)
  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      setToken(null);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  // Recarrega dados do usuário
  const refreshUser = async () => {
    if (!token) return;
    try {
      const freshUser = await AuthService.getMe(token);
      setUser(freshUser);
    } catch {
      await logout();
    }
  };

  const isAuthenticated = !isLoading && !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um <AuthProvider />");
  }
  return context;
}
