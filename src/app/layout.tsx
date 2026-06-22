import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "@/styles/theme.css";
import "@/styles/base.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "panlabs — catálogo",
  description:
    "Laboratório vivo de soluções de software criadas com AI. Experimentos que viraram SaaS reais, versionados e em produção.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
