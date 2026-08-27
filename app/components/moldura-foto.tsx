"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SectionHeading } from "@/app/components/section-heading";
import { iconesRedes } from "@/app/components/icones-redes";
import { moldura, redes } from "@/app/lib/content";

/** Lado do PNG final, em pixels. Mesmo tamanho do arquivo da moldura. */
const TAMANHO = 1080;
/** Prefixo do site quando publicado em subpasta (GitHub Pages). */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const MOLDURA_SRC = `${BASE}/moldura-7770.webp`;
/** Recorte da área vazada da arte: a foto só aparece dentro dela. */
const MASCARA_SRC = `${BASE}/moldura-7770-mascara.png`;
/** Laranja da campanha, usado onde a arte não cobre e a foto não entra. */
const LARANJA = "#F36C21";
/** Círculo interno da moldura, medido no arquivo da arte. */
const ABERTURA = { cx: 548, cy: 498, raio: 431 };
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
/** Folga extra de arrasto, fração do lado da abertura, além da área coberta pela foto. */
const FOLGA_ARRASTO = 0.35;

type Deslocamento = { x: number; y: number };

/** O suporte a compartilhamento nativo não muda durante a sessão. */
function assinarNada() {
  return () => {};
}

export function MolduraFoto() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fotoRef = useRef<HTMLImageElement | null>(null);
  const molduraRef = useRef<HTMLImageElement | null>(null);
  const mascaraRef = useRef<HTMLImageElement | null>(null);
  const recorteRef = useRef<HTMLCanvasElement | null>(null);
  const arrastandoRef = useRef<{ x: number; y: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Toques ativos no canvas, por pointerId — usado para detectar pinça. */
  const toquesRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pincaRef = useRef<{ distancia: number; centroX: number; centroY: number } | null>(null);

  const [temFoto, setTemFoto] = useState(false);
  const [zoom, setZoom] = useState(1.1);
  const [deslocamento, setDeslocamento] = useState<Deslocamento>({ x: 0, y: 0 });
  const [molduraPronta, setMolduraPronta] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Compartilhamento nativo só existe no navegador: no servidor, sempre false.
  const podeCompartilhar = useSyncExternalStore(
    assinarNada,
    () => typeof navigator.canShare === "function",
    () => false,
  );

  const idZoom = useId();
  const idArquivo = useId();

  // Carrega arte e máscara uma única vez.
  useEffect(() => {
    let pendentes = 2;
    const concluir = () => {
      pendentes -= 1;
      if (pendentes === 0) setMolduraPronta(true);
    };
    const falhar = () => setErro("Não foi possível carregar a moldura.");

    const arte = new Image();
    arte.src = MOLDURA_SRC;
    arte.onload = () => {
      molduraRef.current = arte;
      concluir();
    };
    arte.onerror = falhar;

    const mascara = new Image();
    mascara.src = MASCARA_SRC;
    mascara.onload = () => {
      mascaraRef.current = mascara;
      concluir();
    };
    mascara.onerror = falhar;
  }, []);

  /** Quanto a foto pode deslizar sem deixar buraco na abertura, para um dado zoom. */
  const limitesPara = useCallback((z: number) => {
    const foto = fotoRef.current;
    if (!foto) return { x: 0, y: 0 };
    const lado = ABERTURA.raio * 2;
    const escala = Math.max(lado / foto.width, lado / foto.height) * z;
    const folga = lado * FOLGA_ARRASTO;
    return {
      x: Math.max(0, (foto.width * escala - lado) / 2) + folga,
      y: Math.max(0, (foto.height * escala - lado) / 2) + folga,
    };
  }, []);

  const limites = useCallback(() => limitesPara(zoom), [limitesPara, zoom]);

  const desenhar = useCallback(() => {
    const canvas = canvasRef.current;
    const contexto = canvas?.getContext("2d");
    if (!canvas || !contexto) return;

    contexto.clearRect(0, 0, TAMANHO, TAMANHO);
    contexto.fillStyle = LARANJA;
    contexto.fillRect(0, 0, TAMANHO, TAMANHO);

    const foto = fotoRef.current;
    const mascara = mascaraRef.current;
    if (foto && mascara) {
      // A foto é montada à parte e recortada pela máscara da arte, para não
      // vazar como quadrado por cima do laranja.
      const recorte = (recorteRef.current ??= document.createElement("canvas"));
      recorte.width = TAMANHO;
      recorte.height = TAMANHO;
      const pincel = recorte.getContext("2d");
      if (pincel) {
        pincel.clearRect(0, 0, TAMANHO, TAMANHO);
        pincel.globalCompositeOperation = "source-over";

        const lado = ABERTURA.raio * 2;
        const escala = Math.max(lado / foto.width, lado / foto.height) * zoom;
        const largura = foto.width * escala;
        const altura = foto.height * escala;
        pincel.drawImage(
          foto,
          ABERTURA.cx - largura / 2 + deslocamento.x,
          ABERTURA.cy - altura / 2 + deslocamento.y,
          largura,
          altura,
        );

        pincel.globalCompositeOperation = "destination-in";
        pincel.drawImage(mascara, 0, 0, TAMANHO, TAMANHO);
        pincel.globalCompositeOperation = "source-over";

        contexto.drawImage(recorte, 0, 0);
      }
    }

    const arte = molduraRef.current;
    if (arte) contexto.drawImage(arte, 0, 0, TAMANHO, TAMANHO);
  }, [deslocamento, zoom]);

  useEffect(() => {
    desenhar();
  }, [desenhar, molduraPronta]);

  function aoEscolherArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;

    setErro(null);
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      fotoRef.current = img;
      setTemFoto(true);
      setZoom(1.1);
      setDeslocamento({ x: 0, y: 0 });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setErro("Não conseguimos abrir esse arquivo. Tente outra imagem.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  /** Distância e centro entre os dois primeiros toques ativos. */
  function medirPinca() {
    const [p1, p2] = [...toquesRef.current.values()];
    return {
      distancia: Math.hypot(p2.x - p1.x, p2.y - p1.y),
      centroX: (p1.x + p2.x) / 2,
      centroY: (p1.y + p2.y) / 2,
    };
  }

  function aoPressionar(evento: ReactPointerEvent<HTMLCanvasElement>) {
    if (!temFoto) return;
    evento.currentTarget.setPointerCapture(evento.pointerId);
    toquesRef.current.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });

    if (toquesRef.current.size === 2) {
      arrastandoRef.current = null;
      pincaRef.current = medirPinca();
    } else if (toquesRef.current.size === 1) {
      arrastandoRef.current = { x: evento.clientX, y: evento.clientY };
    }
  }

  function aoMover(evento: ReactPointerEvent<HTMLCanvasElement>) {
    if (toquesRef.current.has(evento.pointerId)) {
      toquesRef.current.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });
    }

    // Dois dedos na tela: pinça controla zoom, e o deslocamento do centro entre
    // eles arrasta a foto junto — assim dá para ajustar tudo num só gesto.
    if (toquesRef.current.size === 2 && pincaRef.current) {
      const anterior = pincaRef.current;
      const atual = medirPinca();
      const caixa = evento.currentTarget.getBoundingClientRect();
      const proporcao = TAMANHO / caixa.width;

      setZoom((zoomAtual) => {
        const fator = atual.distancia / anterior.distancia;
        const novoZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomAtual * fator));
        const maximo = limitesPara(novoZoom);
        setDeslocamento((deslocamentoAtual) => ({
          x: Math.min(
            maximo.x,
            Math.max(
              -maximo.x,
              deslocamentoAtual.x + (atual.centroX - anterior.centroX) * proporcao,
            ),
          ),
          y: Math.min(
            maximo.y,
            Math.max(
              -maximo.y,
              deslocamentoAtual.y + (atual.centroY - anterior.centroY) * proporcao,
            ),
          ),
        }));
        return novoZoom;
      });

      pincaRef.current = atual;
      return;
    }

    const inicio = arrastandoRef.current;
    if (!inicio) return;

    const caixa = evento.currentTarget.getBoundingClientRect();
    const proporcao = TAMANHO / caixa.width;
    const maximo = limites();

    setDeslocamento((atual) => ({
      x: Math.min(
        maximo.x,
        Math.max(-maximo.x, atual.x + (evento.clientX - inicio.x) * proporcao),
      ),
      y: Math.min(
        maximo.y,
        Math.max(-maximo.y, atual.y + (evento.clientY - inicio.y) * proporcao),
      ),
    }));
    arrastandoRef.current = { x: evento.clientX, y: evento.clientY };
  }

  function aoSoltar(evento: ReactPointerEvent<HTMLCanvasElement>) {
    toquesRef.current.delete(evento.pointerId);

    if (toquesRef.current.size < 2) {
      pincaRef.current = null;
    }
    if (toquesRef.current.size === 1) {
      const restante = [...toquesRef.current.values()][0];
      arrastandoRef.current = restante;
    } else {
      arrastandoRef.current = null;
    }
  }

  function aoMudarZoom(valor: number) {
    setZoom(valor);
    const maximo = limitesPara(valor);
    setDeslocamento((atual) => ({
      x: Math.min(maximo.x, Math.max(-maximo.x, atual.x)),
      y: Math.min(maximo.y, Math.max(-maximo.y, atual.y)),
    }));
  }

  function gerarArquivo(): Promise<File | null> {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);
      canvas.toBlob((blob) => {
        resolve(
          blob ? new File([blob], moldura.arquivo, { type: "image/png" }) : null,
        );
      }, "image/png");
    });
  }

  async function baixar() {
    const arquivo = await gerarArquivo();
    if (!arquivo) return;
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = moldura.arquivo;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function compartilhar() {
    const arquivo = await gerarArquivo();
    if (!arquivo) return;
    if (!navigator.canShare?.({ files: [arquivo] })) {
      await baixar();
      return;
    }
    try {
      await navigator.share({
        files: [arquivo],
        title: "Ulisses do Rodeio 7770",
        text: "Presença no interior. Voz em Brasília. #7770",
      });
    } catch {
      // Compartilhamento cancelado pela pessoa: nada a fazer.
    }
  }

  return (
    <section id="moldura" className="bg-brand-peach py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu={moldura.chapeu}
          titulo={moldura.titulo}
          descricao={moldura.descricao}
          align="center"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="mx-auto w-full max-w-md">
            <canvas
              ref={canvasRef}
              width={TAMANHO}
              height={TAMANHO}
              onPointerDown={aoPressionar}
              onPointerMove={aoMover}
              onPointerUp={aoSoltar}
              onPointerCancel={aoSoltar}
              className={`w-full rounded-2xl bg-brand-orange shadow-xl ${
                temFoto ? "cursor-grab touch-none active:cursor-grabbing" : ""
              }`}
              aria-label="Pré-visualização da sua foto com a moldura da campanha"
            />
            {temFoto && (
              <>
                <p className="mt-3 text-center text-sm text-brand-muted">
                  Arraste a foto para enquadrar.
                </p>
                {/* Atalho no mobile: baixar logo abaixo da moldura, sem precisar
                    rolar até o card de instruções. No desktop os botões do card
                    já ficam visíveis ao lado, então este atalho some. */}
                <div className="mt-6 flex flex-col gap-3 lg:hidden">
                  <button
                    type="button"
                    onClick={baixar}
                    className="inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                  >
                    Baixar imagem
                  </button>
                  {podeCompartilhar && (
                    <button
                      type="button"
                      onClick={compartilhar}
                      className="inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-7 py-3.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-mist"
                    >
                      Compartilhar
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <ol className="space-y-4">
              {moldura.passos.map((passo, indice) => (
                <li key={passo} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue font-mono text-xs font-bold text-white"
                    aria-hidden
                  >
                    {indice + 1}
                  </span>
                  <span className="text-base leading-7 text-brand-ink sm:text-lg">
                    {passo}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl bg-white p-6 sm:p-8">
              <label
                htmlFor={idArquivo}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#d95c14]"
              >
                {temFoto ? "Trocar foto" : "Escolher foto"}
              </label>
              <input
                ref={inputRef}
                id={idArquivo}
                type="file"
                accept="image/*"
                onChange={aoEscolherArquivo}
                className="sr-only"
              />

              <div className="mt-8">
                <label
                  htmlFor={idZoom}
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted"
                >
                  Zoom
                </label>
                <input
                  id={idZoom}
                  type="range"
                  min={ZOOM_MIN}
                  max={ZOOM_MAX}
                  step={0.01}
                  value={zoom}
                  disabled={!temFoto}
                  onChange={(evento) => aoMudarZoom(Number(evento.target.value))}
                  className="mt-3 w-full accent-brand-orange disabled:opacity-40"
                />
              </div>

              <div className="mt-8 hidden flex-col gap-3 lg:flex sm:flex-row">
                <button
                  type="button"
                  onClick={baixar}
                  disabled={!temFoto}
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Baixar imagem
                </button>
                {podeCompartilhar && (
                  <button
                    type="button"
                    onClick={compartilhar}
                    disabled={!temFoto}
                    className="inline-flex items-center justify-center rounded-full border border-brand-blue/20 px-7 py-3.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-mist disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Compartilhar
                  </button>
                )}
              </div>

              {erro && (
                <p role="alert" className="mt-5 text-sm font-medium text-brand-orange">
                  {erro}
                </p>
              )}

              <div className="mt-8 border-t border-black/5 pt-6">
                <p className="text-sm text-brand-muted">
                  Publicou? Marque a campanha:
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {redes.map((rede) => {
                    const Icone = iconesRedes[rede.nome];
                    return (
                      <li key={rede.url}>
                        <a
                          href={rede.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/15 px-4 py-2.5 text-sm font-medium text-brand-blue transition-colors hover:border-brand-orange hover:text-brand-orange"
                        >
                          <Icone className="h-4 w-4" />
                          {rede.usuario}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
