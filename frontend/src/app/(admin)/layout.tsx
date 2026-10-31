import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-zinc-50/60 dark:bg-zinc-950 relative">
        {/* Sidebar (Mobile Drawer + Desktop Persistent) */}
        <React.Suspense
          fallback={
            <aside className="hidden lg:flex w-68 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shrink-0" />
          }
        >
          <Sidebar />
        </React.Suspense>

        {/* Área de Conteúdo Principal */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0 w-full">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-8 min-w-0">
            <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6 min-w-0">
              {children}
            </div>
          </main>
        </div>

        {/* Notificações Toaster Global */}
        <Toaster position="bottom-right" richColors />
      </div>
    </SidebarProvider>
  );
}
