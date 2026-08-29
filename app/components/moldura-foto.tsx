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

type Arte = (typeof moldura.artes)[number];

const arteSrc = (arte: Arte) => `${BASE}/${arte.arquivo}.webp`;
/** Recorte da área vazada da arte: a foto só aparece dentro dela. */
const mascaraSrc = (arte: Arte) => `${BASE}/${arte.arquivo}-mascara.png`;

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

  const [arteId, setArteId] = useState<Arte["id"]>(moldura.artes[0].id);
  const [temFoto, setTemFoto] = useState(false);
  const [zoom, setZoom] = useState(1.1);
  const [deslocamento, setDeslocamento] = useState<Deslocamento>({ x: 0, y: 0 });
  /** Id da arte cujos arquivos já estão nos refs — nulo enquanto carrega. */
  const [arteCarregada, setArteCarregada] = useState<Arte["id"] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Compartilhamento nativo só existe no navegador: no servidor, sempre false.
  const podeCompartilhar = useSyncExternalStore(
    assinarNada,
    () => typeof navigator.canShare === "function",
    () => false,
  );

  const idZoom = useId();
  const idArquivo = useId();

  const arte = moldura.artes.find((item) => item.id === arteId) ?? moldura.artes[0];
  const abertura = arte.abertura;

  // Recarrega arte e máscara sempre que a moldura escolhida muda. Os refs só
  // trocam quando os dois arquivos chegam, para o canvas nunca misturar artes.
  useEffect(() => {
    let cancelado = false;
    let pendentes = 2;

    const concluir = () => {
      pendentes -= 1;
      if (pendentes > 0 || cancelado) return;
      molduraRef.current = desenho;
      mascaraRef.current = mascara;
      setArteCarregada(arte.id);
    };
    const falhar = () => {
      if (!cancelado) setErro("Não foi possível carregar a moldura.");
    };

    const desenho = new Image();
    desenho.onload = concluir;
    desenho.onerror = falhar;
    desenho.src = arteSrc(arte);

    const mascara = new Image();
    mascara.onload = concluir;
    mascara.onerror = falhar;
    mascara.src = mascaraSrc(arte);

    return () => {
      cancelado = true;
    };
  }, [arte]);

  /** Quanto a foto pode deslizar sem deixar buraco na abertura, para um dado zoom. */
  const limitesPara = useCallback(
    (z: number) => {
      const foto = fotoRef.current;
      if (!foto) return { x: 0, y: 0 };
      const lado = abertura.raio * 2;
      const escala = Math.max(lado / foto.width, lado / foto.height) * z;
      const folga = lado * FOLGA_ARRASTO;
      return {
        x: Math.max(0, (foto.width * escala - lado) / 2) + folga,
        y: Math.max(0, (foto.height * escala - lado) / 2) + folga,
      };
    },
    [abertura],
  );

  const limites = useCallback(() => limitesPara(zoom), [limitesPara, zoom]);

  const desenhar = useCallback(() => {
    const canvas = canvasRef.current;
    const contexto = canvas?.getContext("2d");
    if (!canvas || !contexto) return;

    // Fundo transparente: fora da arte e fora do vazado nada é pintado, então
    // o PNG final sai recortado.
    contexto.clearRect(0, 0, TAMANHO, TAMANHO);

    const foto = fotoRef.current;
    const mascara = mascaraRef.current;
    if (foto && mascara) {
      // A foto é montada à parte e recortada pela máscara da arte, para não
      // vazar como quadrado por fora da moldura.
      const recorte = (recorteRef.current ??= document.createElement("canvas"));
      recorte.width = TAMANHO;
      recorte.height = TAMANHO;
      const pincel = recorte.getContext("2d");
      if (pincel) {
        pincel.clearRect(0, 0, TAMANHO, TAMANHO);
        pincel.globalCompositeOperation = "source-over";

        const lado = abertura.raio * 2;
        const escala = Math.max(lado / foto.width, lado / foto.height) * zoom;
        const largura = foto.width * escala;
        const altura = foto.height * escala;
        pincel.drawImage(
          foto,
          abertura.cx - largura / 2 + deslocamento.x,
          abertura.cy - altura / 2 + deslocamento.y,
          largura,
          altura,
        );

        pincel.globalCompositeOperation = "destination-in";
        pincel.drawImage(mascara, 0, 0, TAMANHO, TAMANHO);
        pincel.globalCompositeOperation = "source-over";

        contexto.drawImage(recorte, 0, 0);
      }
    }

    const desenho = molduraRef.current;
    if (desenho) contexto.drawImage(desenho, 0, 0, TAMANHO, TAMANHO);
  }, [abertura, deslocamento, zoom]);

  useEffect(() => {
    if (arteCarregada === arte.id) desenhar();
  }, [arte.id, arteCarregada, desenhar]);

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

  /** Trocar de arte mantém a foto, mas o enquadramento recomeça do centro. */
  function trocarArte(id: Arte["id"]) {
    setArteId(id);
    setDeslocamento({ x: 0, y: 0 });
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

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div className="mx-auto w-full max-w-md">
            <canvas
              ref={canvasRef}
              width={TAMANHO}
              height={TAMANHO}
              onPointerDown={aoPressionar}
              onPointerMove={aoMover}
              onPointerUp={aoSoltar}
              onPointerCancel={aoSoltar}
              className={`w-full ${
                temFoto ? "cursor-grab touch-none active:cursor-grabbing" : ""
              }`}
              aria-label="Pré-visualização da sua foto com a moldura da campanha"
            />
            {temFoto && (
              <p className="mt-3 text-center text-sm text-brand-muted">
                Arraste a foto para enquadrar.
              </p>
            )}
          </div>

          {/* No celular os controles sobem para logo abaixo da moldura, e os
              passos descem — assim ninguém precisa rolar para escolher a foto.
              No desktop a ordem natural volta, com os passos acima do card. */}
          <div className="flex flex-col">
            <ol className="order-2 mt-10 space-y-4 lg:order-none lg:mt-0">
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

            <div className="order-1 rounded-2xl bg-white p-5 sm:p-8 lg:order-none lg:mt-10">
              <fieldset className="mb-6 sm:mb-8">
                <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  Moldura
                </legend>
                <div className="mt-3 flex gap-3 sm:gap-4">
                  {moldura.artes.map((item) => {
                    const ativa = item.id === arteId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => trocarArte(item.id)}
                        aria-pressed={ativa}
                        className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 p-2.5 transition-colors sm:p-3 ${
                          ativa
                            ? "border-brand-orange bg-brand-mist"
                            : "border-black/10 hover:border-brand-blue/40"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={arteSrc(item)}
                          alt=""
                          className="w-full max-w-24 sm:max-w-28"
                          loading="lazy"
                        />
                        <span
                          className={`text-balance text-center text-sm font-semibold leading-snug ${
                            ativa ? "text-brand-orange" : "text-brand-blue"
                          }`}
                        >
                          {item.rotulo}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
