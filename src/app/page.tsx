"use client";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Importa la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import BenefitCard from "@/components/BenefitCard";
import StepCard from "@/components/StepCard";
import ImpactStat from "@/components/ImpactStat";
import { SproutIcon as SeedIcon, LeafIcon, UsersIcon } from "lucide-react"

export default function Home() {
  const [stats, setStats] = useState({
    usuariosRegistrados: 0,
    semillasAportadas: 0,
    paisesParticipantes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const seedsCollection = collection(db, "seeds"); // Accede a la colección "seeds"
        const seedsSnapshot = await getDocs(seedsCollection);
        
        // Inicializa los contadores
        const usersSet = new Set();
        const countriesSet = new Set();

        let totalSeeds = 0;

        // Itera sobre los documentos de las semillas para contar las estadísticas
        seedsSnapshot.forEach((doc) => {
          totalSeeds++;
          const seed = doc.data();

          // Cuenta usuarios únicos
          usersSet.add(seed.usuario);

          // Cuenta países únicos
          countriesSet.add(seed.lugarRecoleccion);
        });

        // Actualiza el estado con los resultados
        setStats({
          usuariosRegistrados: usersSet.size,
          semillasAportadas: totalSeeds,
          paisesParticipantes: countriesSet.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="min-h-screen flex flex-col bg-olive-100">
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-b from-olive-50 to-olive-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
              <span className="relative z-10">Estadísticas de la RedCultiva</span>
              <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <StatCard title="Usuarios Registrados" value={stats.usuariosRegistrados.toLocaleString()} icon="👥" />
              <StatCard title="Semillas Aportadas" value={stats.semillasAportadas.toLocaleString()} icon="🌱" />
              <StatCard title="Países Participantes" value={stats.paisesParticipantes.toLocaleString()} icon="🌍" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: string;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-olive-200/30">
      <div className="text-5xl text-olive-900 mb-3">{icon}</div>
      <h2 className="text-xl font-semibold text-olive-900 mt-4">{title}</h2>
      <p className="text-3xl font-bold text-olive-700 mt-2">{value}</p>
    </div>
  );
}
