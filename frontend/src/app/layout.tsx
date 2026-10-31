import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plataforma Imobiliária & RAG | Painel Administrativo",
  description:
    "Ecossistema de gestão imobiliária de alto padrão integrado à inteligência artificial RAG, WhatsApp e showcase de componentes operacionais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && supportDarkMode)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-bs-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-bs-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="h-full font-sans antialiased bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
