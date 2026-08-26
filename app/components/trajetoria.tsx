import { SectionHeading } from "@/app/components/section-heading";
import { cadeiaEconomica, citacao, trajetoria } from "@/app/lib/content";

export function Trajetoria() {
  return (
    <section id="trajetoria" className="bg-brand-mist py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Do interior a Brasília"
          titulo={trajetoria.titulo}
          descricao="Uma vida profissional construída no meio das cidades, dos eventos e das pessoas que fazem a economia do interior acontecer."
        />

        <ol className="mt-16 space-y-12 border-l border-brand-blue/15 pl-8 sm:pl-12">
          {trajetoria.blocos.map((bloco, indice) => (
            <li key={bloco.titulo} className="relative">
              <span
                className="absolute -left-[2.3rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue font-mono text-xs font-bold text-white sm:-left-[3.55rem]"
                aria-hidden
              >
                {indice + 1}
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-blue sm:text-3xl">
                {bloco.titulo}
              </h3>
              <div className="mt-5 space-y-4">
                {bloco.paragrafos.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    className="max-w-3xl text-base leading-8 text-brand-ink sm:text-lg sm:leading-9"
                  >
                    {paragrafo}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        {/* Cadeia econômica movimentada por um grande evento. */}
        <div className="mt-20 rounded-2xl border border-black/5 bg-white p-8 sm:p-12">
          <p className="font-serif text-xl font-semibold text-brand-blue sm:text-2xl">
            {cadeiaEconomica.chamada}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {cadeiaEconomica.itens.map((item) => (
              <li
                key={item}
                className="rounded-full bg-brand-peach px-5 py-2.5 text-sm font-semibold text-brand-blue"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-7 text-brand-muted">
            {cadeiaEconomica.fecho}
          </p>
        </div>

        <blockquote className="mt-16 border-l-4 border-brand-orange pl-6 sm:pl-8">
          <p className="max-w-3xl font-serif text-2xl font-semibold leading-snug text-brand-blue sm:text-3xl">
            “{citacao.texto}”
          </p>
        </blockquote>
      </div>
    </section>
  );
}
