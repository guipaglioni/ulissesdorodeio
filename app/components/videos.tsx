import Image from "next/image";
import { SectionHeading } from "@/app/components/section-heading";
import { IconeInstagram } from "@/app/components/icones-redes";
import { videos } from "@/app/lib/content";

export function Videos() {
  return (
    <section id="videos" className="bg-brand-blue py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          chapeu="Bastidores"
          titulo={videos.titulo}
          descricao={videos.subtitulo}
          tone="light"
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.itens.map((video) => (
            <li key={video.url}>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-brand-blue-dark transition-colors hover:bg-black/30"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={`Miniatura do vídeo: ${video.titulo}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                    <IconeInstagram className="h-10 w-10 text-white drop-shadow" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="font-serif text-lg font-bold text-white">
                    {video.titulo}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-peach-strong transition-colors group-hover:text-brand-orange">
                    <IconeInstagram className="h-4 w-4" />
                    Assista no Instagram
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
