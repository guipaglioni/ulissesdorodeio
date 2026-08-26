import { SectionHeading } from "@/app/components/section-heading";
import { porQue } from "@/app/lib/content";

export function PorQue() {
  return (
    <section id="por-que" className="bg-brand-blue py-24 text-white sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Representação"
          titulo={porQue.titulo}
          descricao={porQue.abertura}
          tone="light"
          align="center"
        />

        <p className="mx-auto mt-14 max-w-3xl text-center font-serif text-2xl font-semibold leading-snug text-brand-peach sm:text-3xl">
          {porQue.destaque}
        </p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {porQue.itens.map((item, indice) => (
            <li
              key={item}
              // A lista tem 5 itens: o último ocupa a linha inteira para não
              // sobrar célula vazia no grid de duas colunas.
              className={`flex items-start gap-4 bg-brand-blue px-6 py-6 ${
                indice === porQue.itens.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange"
                aria-hidden
              />
              <span className="text-base leading-7 text-white/90 sm:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-lg font-semibold text-white">
          {porQue.fecho}
        </p>
      </div>
    </section>
  );
}
