import { Catalog } from "@/components/Catalog/Catalog";
import { Header } from "@/components/Header/Header";
import { HeroTerminal } from "@/components/HeroTerminal/HeroTerminal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroTerminal />
        <Catalog />
      </main>
    </>
  );
}
