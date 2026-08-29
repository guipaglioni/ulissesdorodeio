import Image from "next/image";
import { SectionHeading } from "@/app/components/section-heading";
import { naMidia } from "@/app/lib/content";

type IconeProps = {
  className?: string;
};

function IconeJornal({ className = "h-6 w-6" }: IconeProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 5h13v14H5.5A1.5 1.5 0 0 1 4 17.5V5Z" />
      <path d="M17 8h2.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5H17" />
      <path d="M7 8h7M7 11.5h7M7 15h4" />
    </svg>
  );
}

function IconeCalendario({ className = "h-4 w-4" }: IconeProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

function IconeSetaExterna({ className = "h-3.5 w-3.5" }: IconeProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

type Materia = (typeof naMidia.itens)[number];

/** Matérias de veículos grandes abrem a grade ocupando as duas colunas. */
function ehDestaque(item: Materia) {
  return "destaque" in item && item.destaque;
}

function Cartao({ item }: { item: Materia }) {
  const destaque = ehDestaque(item);

  return (
    <li className={destaque ? "lg:col-span-2" : undefined}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex h-full flex-col gap-5 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-stretch sm:gap-6 ${
          destaque
            ? "border-brand-orange/30 bg-brand-peach hover:border-brand-orange/60"
            : "border-black/5 bg-brand-mist hover:border-brand-orange/30 hover:bg-brand-peach"
        }`}
      >
        {/* No celular a capa ocupa a largura do card. As matérias chegam em
            proporções muito diferentes (há capas em retrato), então a caixa é
            4:3 e o recorte parte do topo, onde costuma estar o rosto. */}
        <div
          className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl ${
            destaque ? "sm:w-72" : "sm:aspect-square sm:w-40"
          }`}
        >
          <Image
            src={item.imagem}
            alt={`Imagem da matéria: ${item.titulo}`}
            fill
            sizes={
              destaque
                ? "(max-width: 640px) 90vw, 288px"
                : "(max-width: 640px) 90vw, 160px"
            }
            className="object-cover object-top transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
            {item.veiculo}
            {destaque && (
              <span className="rounded-full bg-brand-orange px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-white">
                Destaque
              </span>
            )}
          </span>
          <span
            className={`mt-2 block font-serif font-bold text-brand-blue ${
              destaque
                ? "text-lg leading-7 sm:text-2xl sm:leading-9"
                : "text-base leading-6 sm:text-lg sm:leading-7"
            }`}
          >
            {item.titulo}
          </span>
          <span
            className={`mt-3 block leading-6 text-brand-muted ${
              destaque ? "text-sm sm:text-base sm:leading-7" : "text-sm"
            }`}
          >
            {item.resumo}
          </span>

          <span className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4 sm:mt-auto">
            <time
              dateTime={item.data}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-muted"
            >
              <IconeCalendario />
              {item.dataLegivel}
            </time>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-orange">
              Ler matéria
              <IconeSetaExterna className="h-3.5 w-3.5 text-brand-orange" />
            </span>
          </span>
        </div>
      </a>
    </li>
  );
}

export function NaMidia() {
  const itens = [
    ...naMidia.itens.filter(ehDestaque),
    ...naMidia.itens.filter((item) => !ehDestaque(item)),
  ];

  return (
    <section id="na-midia" className="bg-white py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Repercussão"
          titulo={naMidia.titulo}
          chamada={naMidia.chamada}
          descricao={naMidia.subtitulo}
        />

        <div className="mt-14 max-w-2xl">
          <h3 className="flex items-center gap-3 font-serif text-2xl font-bold text-brand-blue">
            <IconeJornal className="h-7 w-7 shrink-0 text-brand-orange" />
            {naMidia.destaques.titulo}
          </h3>
          <p className="mt-3 text-base leading-7 text-brand-muted">
            {naMidia.destaques.descricao}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {itens.map((item) => (
            <Cartao key={item.url} item={item} />
          ))}
        </ul>

        <p className="mt-14 text-center font-serif text-xl font-bold leading-8 text-brand-blue sm:text-2xl">
          {naMidia.fecho.linha1}
          <span className="mt-1 block text-brand-orange">
            {naMidia.fecho.linha2}
          </span>
        </p>
      </div>
    </section>
  );
}
