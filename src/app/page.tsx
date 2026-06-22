import { Suspense } from "react";
import { Catalog } from "@/components/Catalog/Catalog";
import { Header } from "@/components/Header/Header";
import { HeroTerminal } from "@/components/HeroTerminal/HeroTerminal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroTerminal />
        {/* Catalog pulls live GitHub vitality (#12); stream it so the hero
            never waits on the network. */}
        <Suspense>
          <Catalog />
        </Suspense>
      </main>
    </>
  );
}
