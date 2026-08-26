import { SectionHeading } from "@/app/components/section-heading";
import { bandeiras } from "@/app/lib/content";

export function Bandeiras() {
  return (
    <section id="bandeiras" className="bg-white py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Compromissos"
          titulo={bandeiras.titulo}
          descricao={bandeiras.subtitulo}
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bandeiras.itens.map((item, indice) => (
            <li
              key={item.titulo}
              className="group flex flex-col rounded-2xl border border-black/5 bg-brand-mist p-8 transition-colors hover:border-brand-orange/40 hover:bg-brand-peach"
            >
              <span
                className="font-mono text-sm font-bold text-brand-orange"
                aria-hidden
              >
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-brand-blue sm:text-2xl">
                {item.titulo}
              </h3>
              <p className="mt-4 text-base leading-7 text-brand-muted group-hover:text-brand-ink">
                {item.descricao}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-6 text-brand-muted">
          Projetos legislativos específicos serão divulgados após definição e
          validação pela equipe da campanha.
        </p>
      </div>
    </section>
  );
}
