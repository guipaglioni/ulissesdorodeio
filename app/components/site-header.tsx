"use client";

import { useState } from "react";
import { BrandMark } from "@/app/components/brand-mark";
import { iconesRedes } from "@/app/components/icones-redes";
import { BotaoJingle } from "@/app/components/jingle-player";
import { acaoPrincipal, jingle, navegacao, redes } from "@/app/lib/content";

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-24 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#topo" className="shrink-0" aria-label="Início">
          <BrandMark className="h-13 w-auto sm:h-16" priority />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Seções do site">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-blue"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BotaoJingle />

          <div className="hidden items-center gap-3 lg:flex">
            {redes.map((rede) => {
              const Icone = iconesRedes[rede.nome];
              return (
                <a
                  key={rede.url}
                  href={rede.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${rede.nome} — ${rede.usuario}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue/15 text-brand-blue transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <Icone />
                </a>
              );
            })}
            <a
              href={acaoPrincipal.href}
              className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d95c14]"
            >
              {acaoPrincipal.rotulo}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-black/10 text-brand-blue lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          className="border-t border-black/5 bg-white px-6 pb-6 pt-2 lg:hidden"
          aria-label="Seções do site"
        >
          {[...navegacao, jingle.nav].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="block border-b border-black/5 py-4 text-base font-medium text-brand-ink"
            >
              {item.rotulo}
            </a>
          ))}

          <a
            href={acaoPrincipal.href}
            onClick={() => setAberto(false)}
            className="mt-5 block rounded-full bg-brand-orange px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {acaoPrincipal.rotulo}
          </a>

          <ul className="mt-5 flex gap-3">
            {redes.map((rede) => {
              const Icone = iconesRedes[rede.nome];
              return (
                <li key={rede.url}>
                  <a
                    href={rede.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/15 px-4 py-2.5 text-sm font-medium text-brand-blue"
                  >
                    <Icone className="h-4 w-4" />
                    {rede.nome}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
