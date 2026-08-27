import Image from "next/image";
import retrato from "@/public/ulisses-retrato.jpg";
import { BrandMark } from "@/app/components/brand-mark";
import { candidato, hero } from "@/app/lib/content";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-brand-blue text-white"
    >
      {/* Malha decorativa discreta ao fundo. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/2 hidden h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-brand-blue-dark lg:block"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-brand-peach-strong sm:text-xs sm:tracking-[0.16em]">
            {hero.chapeu}
          </p>

          <h1 className="mt-8 font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Ulisses
            <span className="block text-brand-orange">do Rodeio</span>
          </h1>

          <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-brand-peach sm:text-3xl">
            {candidato.slogan}
          </p>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {hero.linhaDeApoio}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#moldura"
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#d95c14]"
            >
              Faça sua foto 7770
            </a>
            <a
              href="#quem-e"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conheça a trajetória
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/15">
            {hero.destaques.map((item) => (
              <div key={item.rotulo} className="min-w-0 bg-brand-blue px-3 py-4 sm:px-4">
                <dt className="text-[0.65rem] font-medium uppercase tracking-wider text-white/60">
                  {item.rotulo}
                </dt>
                <dd className="mt-1 break-words text-sm font-semibold text-white">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Retrato oficial com o número na urna em destaque. */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-brand-blue-dark shadow-2xl">
            <Image
              src={retrato}
              alt="Retrato oficial de Ulisses do Rodeio, candidato a deputado federal"
              placeholder="blur"
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-4 rounded-2xl bg-brand-orange px-5 py-4 shadow-xl sm:left-6 sm:px-6">
            <BrandMark className="h-16 w-auto sm:h-20" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
