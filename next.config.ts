import type { NextConfig } from "next";

/*
 * O site é publicado como HTML estático no GitHub Pages, em
 * guipaglioni.github.io/ulissesdorodeio. Por isso:
 * - output "export" gera a pasta out/ sem servidor Node;
 * - basePath vem do ambiente, então localmente (variável vazia) o site
 *   continua rodando na raiz de localhost:3000;
 * - o otimizador de imagens do Next depende de servidor, então no export
 *   as imagens são servidas como estão (já foram tratadas em public/).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
