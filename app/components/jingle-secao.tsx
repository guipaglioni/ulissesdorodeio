"use client";

import { SectionHeading } from "@/app/components/section-heading";
import {
  IconeSom,
  jingleSrc,
  useJingle,
} from "@/app/components/jingle-player";
import { jingle } from "@/app/lib/content";

/** Alturas das barrinhas do equalizador, em ordem, para dar ritmo à animação. */
const BARRAS = ["h-3", "h-6", "h-4", "h-7", "h-5"];

function IconeDownload({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export function JingleSecao() {
  const { tocando, alternar, desarmar } = useJingle();

  return (
    <section id="jingle" className="bg-brand-peach py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <SectionHeading
            chapeu={jingle.chapeu}
            titulo={jingle.titulo}
            chamada={jingle.chamada}
            descricao={jingle.descricao}
          />

          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onPointerDown={desarmar}
                onClick={alternar}
                aria-pressed={tocando}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-[#d95c14]"
              >
                {tocando ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden
                  >
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7"
                    aria-hidden
                  >
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                )}
                <span className="sr-only">
                  {tocando ? jingle.botaoParar : jingle.botaoTocar}
                </span>
              </button>

              <div className="min-w-0">
                <p className="font-serif text-lg font-bold text-brand-blue">
                  {tocando ? "Tocando agora" : jingle.botaoTocar}
                </p>
                {/* Equalizador decorativo: só se mexe enquanto o jingle roda. */}
                <span
                  className="mt-3 flex h-7 items-end gap-1.5"
                  aria-hidden
                >
                  {BARRAS.map((altura, indice) => (
                    <span
                      key={altura + indice}
                      className={`w-1.5 rounded-full bg-brand-orange/70 transition-all ${
                        tocando ? `${altura} motion-safe:animate-pulse` : "h-1.5"
                      }`}
                      style={
                        tocando
                          ? { animationDelay: `${indice * 120}ms` }
                          : undefined
                      }
                    />
                  ))}
                </span>
              </div>
            </div>

            <a
              href={jingleSrc}
              download={jingle.nomeDownload}
              className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-blue px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              <IconeDownload />
              {jingle.botaoBaixar}
            </a>

            <p className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-brand-muted">
              <IconeSom className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              {jingle.aviso}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
