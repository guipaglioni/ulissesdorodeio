import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Definir NEXT_PUBLIC_SITE_URL com o domínio oficial antes de publicar:
  // é a base que o Next usa para resolver a imagem de compartilhamento.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Ulisses do Rodeio 7770 | Deputado Federal — Solidariedade",
  description:
    "Ulisses do Rodeio, candidato a deputado federal por São Paulo pelo Solidariedade. Presença no interior. Voz em Brasília.",
  keywords: [
    "Ulisses do Rodeio",
    "7770",
    "deputado federal",
    "Solidariedade",
    "São Paulo",
    "interior paulista",
    "agronegócio",
  ],
  openGraph: {
    title: "Ulisses do Rodeio 7770 | Deputado Federal",
    description: "Presença no interior. Voz em Brasília.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        // TODO (equipe da campanha): trocar pela arte oficial de
        // compartilhamento quando houver uma peça 1200x630.
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/ulisses-campanha.jpg`,
        width: 1600,
        height: 900,
        alt: "Ulisses do Rodeio — Deputado Federal 7770",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
