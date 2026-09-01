import { Bandeiras } from "@/app/components/bandeiras";
import { ChamadaFinal } from "@/app/components/chamada-final";
import { Hero } from "@/app/components/hero";
import { JingleProvider } from "@/app/components/jingle-player";
import { JingleSecao } from "@/app/components/jingle-secao";
import { MolduraFoto } from "@/app/components/moldura-foto";
import { NaMidia } from "@/app/components/na-midia";
import { Parceria } from "@/app/components/parceria";
import { PorQue } from "@/app/components/por-que";
import { QuemE } from "@/app/components/quem-e";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Trajetoria } from "@/app/components/trajetoria";
import { Videos } from "@/app/components/videos";

export default function Home() {
  return (
    <JingleProvider>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <MolduraFoto />
        <QuemE />
        <Trajetoria />
        <Bandeiras />
        <Parceria />
        <NaMidia />
        <Videos />
        <JingleSecao />
        <PorQue />
        <ChamadaFinal />
      </main>
      <SiteFooter />
    </JingleProvider>
  );
}
