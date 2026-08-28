type SectionHeadingProps = {
  chapeu?: string;
  titulo: string;
  /** Linha de reforço entre o título e a descrição. */
  chamada?: string;
  descricao?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export function SectionHeading({
  chapeu,
  titulo,
  chamada,
  descricao,
  tone = "dark",
  align = "left",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {chapeu && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            isLight ? "text-brand-peach-strong" : "text-brand-orange"
          }`}
        >
          {chapeu}
        </p>
      )}
      <h2
        className={`mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
          isLight ? "text-white" : "text-brand-blue"
        }`}
      >
        {titulo}
      </h2>
      {chamada && (
        <p
          className={`mt-5 text-lg font-semibold leading-7 sm:text-xl ${
            isLight ? "text-white" : "text-brand-blue"
          }`}
        >
          {chamada}
        </p>
      )}
      {descricao && (
        <p
          className={`${chamada ? "mt-3" : "mt-5"} text-base leading-7 sm:text-lg sm:leading-8 ${
            isLight ? "text-white/80" : "text-brand-muted"
          }`}
        >
          {descricao}
        </p>
      )}
      <span
        className={`mt-8 block h-1 w-16 rounded-full bg-brand-orange ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
    </div>
  );
}
