import { SectionHeading } from "@/app/components/section-heading";
import { quemE } from "@/app/lib/content";

export function QuemE() {
  return (
    <section id="quem-e" className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
        <div>
          <SectionHeading chapeu="Biografia" titulo={quemE.titulo} />

          <div className="mt-10 space-y-6">
            {quemE.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo}
                className="text-base leading-8 text-brand-ink sm:text-lg sm:leading-9"
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        <aside className="lg:pt-24">
          <div className="rounded-2xl border border-black/5 bg-brand-mist p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Ficha do candidato
            </h3>
            <dl className="mt-6 space-y-5">
              {quemE.ficha.map((linha) => (
                <div key={linha.rotulo} className="border-b border-black/5 pb-5 last:border-0 last:pb-0">
                  <dt className="text-xs font-medium uppercase tracking-wider text-brand-muted">
                    {linha.rotulo}
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-brand-ink">
                    {linha.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
