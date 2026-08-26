type SectionHeadingProps = {
  chapeu?: string;
  titulo: string;
  descricao?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export function SectionHeading({
  chapeu,
  titulo,
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
      {descricao && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg sm:leading-8 ${
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
