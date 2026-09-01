"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { jingle } from "@/app/lib/content";

/** Prefixo do site quando publicado em subpasta (GitHub Pages). */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const jingleSrc = `${BASE}/${jingle.arquivo}`;

/** Marca que o jingle já tocou nesta aba: evita repetir a abertura automática. */
const CHAVE_SESSAO = "ulisses:jingle-tocado";

/** Volume da abertura automática: presente, sem assustar quem chega. */
const VOLUME = 0.8;

type JingleContexto = {
  tocando: boolean;
  /** Toca do começo quando parado; para e rebobina quando tocando. */
  alternar: () => void;
  /**
   * Cancela a reprodução automática armada para o primeiro gesto do visitante.
   * Os controles chamam antes do clique para não brigar com o próprio gesto.
   */
  desarmar: () => void;
};

const Contexto = createContext<JingleContexto | null>(null);

export function useJingle() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useJingle precisa estar dentro de <JingleProvider>.");
  }
  return contexto;
}

export function JingleProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  /** Enquanto true, o primeiro gesto do visitante inicia o jingle. */
  const armadoRef = useRef(false);
  const [tocando, setTocando] = useState(false);

  const desarmar = useCallback(() => {
    armadoRef.current = false;
  }, []);

  /*
   * Primeira visita da aba: tenta tocar sozinho. Navegadores bloqueiam áudio
   * com som antes de qualquer interação, então, quando o play é recusado, o
   * jingle fica armado para o primeiro gesto — que já vale como autorização.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;

    let jaTocou = false;
    try {
      jaTocou = sessionStorage.getItem(CHAVE_SESSAO) !== null;
    } catch {
      // Armazenamento bloqueado (modo privado): trata como primeira visita.
    }
    if (jaTocou) return;

    const eventos = ["pointerdown", "keydown", "touchstart"] as const;
    let cancelado = false;

    const tocarNoGesto = () => {
      if (!armadoRef.current) return;
      armadoRef.current = false;
      void audio.play().catch(() => {});
    };

    void audio.play().catch(() => {
      if (cancelado) return;
      armadoRef.current = true;
      // Sem `capture`: os controles do site desarmam antes deste ouvinte rodar.
      for (const evento of eventos) {
        document.addEventListener(evento, tocarNoGesto);
      }
    });

    return () => {
      cancelado = true;
      armadoRef.current = false;
      for (const evento of eventos) {
        document.removeEventListener(evento, tocarNoGesto);
      }
    };
  }, []);

  const alternar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    armadoRef.current = false;
    if (audio.paused) {
      void audio.play().catch(() => {});
      return;
    }
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const aoTocar = useCallback(() => {
    setTocando(true);
    try {
      sessionStorage.setItem(CHAVE_SESSAO, "1");
    } catch {
      // Sem armazenamento o jingle só volta a abrir sozinho no próximo acesso.
    }
  }, []);

  const valor = useMemo(
    () => ({ tocando, alternar, desarmar }),
    [tocando, alternar, desarmar],
  );

  return (
    <Contexto.Provider value={valor}>
      {children}
      <audio
        ref={audioRef}
        src={jingleSrc}
        preload="auto"
        onPlay={aoTocar}
        onPause={() => setTocando(false)}
        onEnded={() => setTocando(false)}
      />
    </Contexto.Provider>
  );
}

export function IconeSom({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="M16.2 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18.8 6.6a7.6 7.6 0 0 1 0 10.8" />
    </svg>
  );
}

export function IconeSomMudo({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="m16.5 9.5 4 5" />
      <path d="m20.5 9.5-4 5" />
    </svg>
  );
}

/** Controle de som do header: liga e desliga o jingle. */
export function BotaoJingle({ className = "" }: { className?: string }) {
  const { tocando, alternar, desarmar } = useJingle();
  const rotulo = tocando ? jingle.botaoParar : jingle.botaoTocar;

  return (
    <button
      type="button"
      onPointerDown={desarmar}
      onClick={alternar}
      aria-pressed={tocando}
      aria-label={rotulo}
      title={rotulo}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
        tocando
          ? "border-brand-orange bg-brand-orange text-white hover:bg-[#d95c14]"
          : "border-brand-blue/15 text-brand-blue hover:border-brand-orange hover:text-brand-orange"
      } ${className}`}
    >
      {tocando ? <IconeSom /> : <IconeSomMudo />}
    </button>
  );
}
