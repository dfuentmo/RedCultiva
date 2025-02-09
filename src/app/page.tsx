import { Menu } from "@/components/Menu";
import { HeroSection } from "@/components/HeroSection";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import SpreadsheetViewer from "@/components/SpreadsheetViewer";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-olive-100">
      <SessionProviderWrapper>
      <Menu />
      </SessionProviderWrapper>
      <main className="flex-grow">
        {/* Hero Section */}
          <HeroSection />
        {/* Features Section */}
        <FeaturesSection />
        {/* Spreadsheet Viewer Section */}
        <section className="bg-olive-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-olive-800 mb-12">Algunas de las semillas de la red:</h2>
            <SessionProviderWrapper>
              <SpreadsheetViewer />
            </SessionProviderWrapper>
          </div>
        </section>
      </main>
    </div>
  );
}
