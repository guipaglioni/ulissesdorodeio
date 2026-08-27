import Image from "next/image";
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
            <li
              key={bloco.titulo}
              className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            >
              <span
                className="absolute -left-[2.3rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue font-mono text-xs font-bold text-white sm:-left-[3.55rem]"
                aria-hidden
              >
                {indice + 1}
              </span>
              <div>
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
              </div>
              <figure className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={bloco.imagem}
                  alt={bloco.imagemAlt}
                  width={640}
                  height={480}
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="h-full w-full object-cover object-top"
                />
              </figure>
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

        <div className="mt-16 grid gap-8 overflow-hidden rounded-2xl bg-white lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <blockquote className="flex items-center border-l-4 border-brand-orange px-6 py-10 sm:px-8">
            <p className="max-w-3xl font-serif text-2xl font-semibold leading-snug text-brand-blue sm:text-3xl">
              “{citacao.texto}”
            </p>
          </blockquote>
          <figure className="overflow-hidden">
            <Image
              src={citacao.imagem}
              alt={citacao.imagemAlt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 90vw, 480px"
              className="h-full max-h-96 w-full object-cover lg:max-h-none"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
