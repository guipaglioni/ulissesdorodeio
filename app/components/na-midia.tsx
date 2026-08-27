import { SectionHeading } from "@/app/components/section-heading";
import { naMidia } from "@/app/lib/content";

export function NaMidia() {
  return (
    <section id="na-midia" className="bg-white py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Repercussão"
          titulo={naMidia.titulo}
          descricao={naMidia.subtitulo}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {naMidia.categorias.map((categoria) => (
            <div
              key={categoria.titulo}
              className="rounded-2xl border border-black/5 bg-brand-mist p-8"
            >
              <h3 className="font-serif text-xl font-bold text-brand-blue sm:text-2xl">
                {categoria.titulo}
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-muted">
                {categoria.descricao}
              </p>

              <ul className="mt-8 space-y-4">
                {categoria.itens.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-white p-5 transition-colors hover:bg-brand-peach"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                        {item.veiculo}
                      </span>
                      <span className="mt-2 block text-base font-semibold leading-6 text-brand-blue">
                        {item.titulo}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
