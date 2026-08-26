import Image from "next/image";
import juntosPeloAgro from "@/public/parceria-juntos-pelo-agro.jpg";
import campanha from "@/public/ulisses-campanha.jpg";
import { SectionHeading } from "@/app/components/section-heading";
import { parceria } from "@/app/lib/content";

export function Parceria() {
  return (
    <section id="parceria" className="bg-brand-mist py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Estadual e federal"
          titulo={parceria.titulo}
          align="center"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          {/* Peça oficial da parceria. A coluna acompanha a altura do texto,
              e a peça aparece inteira: o fundo do container usa o mesmo laranja
              das bordas do arquivo, então a sobra some na arte. */}
          <figure
            className="overflow-hidden rounded-2xl"
            style={{ backgroundColor: "#E95803" }}
          >
            <Image
              src={juntosPeloAgro}
              alt="Peça da campanha com Ulisses do Rodeio e Waldir Filé e o texto: Juntos pelo nosso agro"
              placeholder="blur"
              sizes="(max-width: 1024px) 90vw, 520px"
              className="h-full w-full object-contain"
            />
          </figure>

          <div>
            <div className="space-y-5">
              {parceria.paragrafos.map((paragrafo) => (
                <p
                  key={paragrafo}
                  className="text-base leading-8 text-brand-ink sm:text-lg sm:leading-9"
                >
                  {paragrafo}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {parceria.duplas.map((pessoa) => (
                <li
                  key={pessoa.numero}
                  className="rounded-2xl border border-black/5 bg-white p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                    {pessoa.cargo}
                  </p>
                  <p className="mt-3 font-serif text-xl font-bold text-brand-blue">
                    {pessoa.nome}
                  </p>
                  <p className="mt-3 font-mono text-3xl font-bold leading-none tracking-tight text-brand-blue">
                    {pessoa.numero}
                  </p>
                </li>
              ))}
            </ul>

            <figure className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={campanha}
                alt="Ulisses do Rodeio, de chapéu, cumprimenta Waldir Filé"
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 620px"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
