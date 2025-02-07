import { Menu } from "@/components/Menu";
import { HeroSection } from "@/components/HeroSection";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import SpreadsheetViewer from "@/components/SpreadsheetViewer";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-olive-100">
      <Menu />
      <main className="flex-grow">
        {/* Hero Section */}
          <HeroSection />
        {/* Features Section */}
        <FeaturesSection />
        {/* Spreadsheet Viewer Section */}
        <section className="bg-olive-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-olive-800 mb-12">Últimas semillas añadidas a la red:</h2>
            <SessionProviderWrapper>
              <SpreadsheetViewer />
            </SessionProviderWrapper>
          </div>
        </section>
      </main>

      <footer className="bg-olive-100 bg-opacity-80 py-4 shadow-md backdrop-blur-lg py-8">
  <div className="container mx-auto text-center px-4 text-olive-800 font-bold">
    <p>
      &copy; 2025 RedCultiva. Un proyecto de{' '}
      <a href="https://www.ecohuertosalduie.com" className="text-olive-600 hover:underline">
        Ecohuertosalduie
      </a>
    </p>
  </div>
</footer>

    </div>
  );
}
