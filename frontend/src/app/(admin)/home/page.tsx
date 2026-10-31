import { HomeClient } from "./home-client";

// Opt-out explícito da validação de instant-navigation no Turbopack Next.js 16
export const instant = false;

export const metadata = {
  title: "Início & Boas-Vindas | Plataforma Imobiliária & RAG",
};

export default function HomePage() {
  return <HomeClient />;
}
