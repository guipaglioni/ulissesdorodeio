import Image from "next/image";
import logoCampanha from "@/public/logo-ulisses-do-rodeio.png";
import { candidato } from "@/app/lib/content";

type BrandMarkProps = {
  /**
   * Cartão desenhado atrás da logo, para uso sobre fundos escuros ou fotos.
   * "none" aplica a logo direto sobre o fundo (usado no header, que é branco).
   */
  surface?: "none" | "white" | "orange";
  className?: string;
  priority?: boolean;
};

const superficies = {
  none: "",
  white: "inline-flex rounded-xl bg-white px-4 py-3",
  orange: "inline-flex rounded-xl bg-brand-orange px-4 py-3",
} as const;

export function BrandMark({
  surface = "none",
  className = "h-12 w-auto",
  priority = false,
}: BrandMarkProps) {
  const logo = (
    <Image
      src={logoCampanha}
      alt={`${candidato.nome} — ${candidato.cargo} ${candidato.numero}`}
      className={className}
      priority={priority}
      sizes="240px"
    />
  );

  if (surface === "none") {
    return logo;
  }

  return <span className={superficies[surface]}>{logo}</span>;
}
