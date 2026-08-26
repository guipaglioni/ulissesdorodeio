import { BrandMark } from "@/app/components/brand-mark";
import { iconesRedes } from "@/app/components/icones-redes";
import {
  acaoPrincipal,
  candidato,
  fontes,
  navegacao,
  redes,
} from "@/app/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <BrandMark surface="white" className="h-16 w-auto" />
            <p className="mt-6 max-w-sm font-serif text-lg text-brand-peach">
              {candidato.slogan}
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {redes.map((rede) => {
                const Icone = iconesRedes[rede.nome];
                return (
                  <li key={rede.url}>
                    <a
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-brand-orange hover:text-brand-orange"
                    >
                      <Icone className="h-4 w-4" />
                      {rede.usuario}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {[acaoPrincipal, ...navegacao].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-brand-orange"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Fontes de referência
            </h2>
            <ul className="mt-5 space-y-4">
              {fontes.map((fonte) => (
                <li key={fonte.url}>
                  <a
                    href={fonte.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-6 text-white/80 transition-colors hover:text-brand-orange"
                  >
                    {fonte.titulo}
                    <span className="block text-xs text-white/45">
                      {fonte.veiculo}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs leading-6 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {candidato.nome} · {candidato.cargo} · {candidato.numero} ·{" "}
            {candidato.partido}
          </p>
          {/* TODO (equipe da campanha): incluir CNPJ da campanha e demais
              informações exigidas pela legislação eleitoral. */}
          <p>Material de campanha eleitoral.</p>
        </div>
      </div>
    </footer>
  );
}
