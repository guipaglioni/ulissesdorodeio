import Image from "next/image";
import brasilia from "@/public/ulisses-brasilia.jpg";
import { BrandMark } from "@/app/components/brand-mark";
import { iconesRedes } from "@/app/components/icones-redes";
import { candidato, redes } from "@/app/lib/content";

// TODO (equipe da campanha): incluir WhatsApp e e-mail de contato quando houver.

export function ChamadaFinal() {
  return (
    <section id="compartilhe" className="bg-brand-peach py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl bg-white p-10 shadow-sm sm:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
                Some-se à campanha
              </p>
              <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-brand-blue sm:text-4xl">
                {candidato.slogan}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
                Acompanhe a campanha, compartilhe as bandeiras e ajude a levar a
                realidade do interior paulista para dentro da Câmara dos
                Deputados.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {redes.map((rede) => {
                  const Icone = iconesRedes[rede.nome];
                  return (
                    <a
                      key={rede.url}
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-blue px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                    >
                      <Icone />
                      {rede.nome}
                    </a>
                  );
                })}
                <a
                  href="#bandeiras"
                  className="inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-7 py-4 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-mist"
                >
                  Rever as bandeiras
                </a>
              </div>
            </div>

            {/* Lembrete do número na urna sobre o retrato de campanha. */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={brasilia}
                alt="Ulisses do Rodeio com a bandeira do Brasil e o Congresso Nacional ao fundo"
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 420px"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-8">
                <BrandMark surface="orange" className="h-20 w-auto sm:h-24" />
                <p className="text-sm text-white/85">
                  {candidato.partido} · {candidato.estado}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
