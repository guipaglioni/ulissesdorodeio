import { Bandeiras } from "@/app/components/bandeiras";
import { ChamadaFinal } from "@/app/components/chamada-final";
import { Hero } from "@/app/components/hero";
import { MolduraFoto } from "@/app/components/moldura-foto";
import { Parceria } from "@/app/components/parceria";
import { PorQue } from "@/app/components/por-que";
import { QuemE } from "@/app/components/quem-e";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Trajetoria } from "@/app/components/trajetoria";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <MolduraFoto />
        <QuemE />
        <Trajetoria />
        <Bandeiras />
        <Parceria />
        <PorQue />
        <ChamadaFinal />
      </main>
      <SiteFooter />
    </>
  );
}
