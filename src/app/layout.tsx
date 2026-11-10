import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: {
    default: "Gestão Acadêmica",
    template: "%s | Gestão Acadêmica",
  },
  description:
    "Sistema para consultar e cadastrar alunos e matrículas e consultar as disciplinas de um curso.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <Header />
          <main className="container main">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
