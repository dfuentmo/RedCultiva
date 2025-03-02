"use client";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Importa la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import { SproutIcon, UsersIcon, GlobeIcon } from "lucide-react";

// Token de acceso público de Mapbox (reemplazar con tu token)
const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVkY3VsdGl2YSIsImEiOiJjbHRxcnRtZGQwMGJqMmpxcXg2ZWNqNWNsIn0.Qs-QMYXxGrLnlnFPYZlvMQ';

// Tipo para los datos de semillas
type SeedLocation = {
  id: string;
  nombre: string;
  variedad: string;
  lugarRecoleccion: string;
  latitude: number;
  longitude: number;
  usuario: string;
};

export default function Home() {
  const [stats, setStats] = useState({
    usuariosRegistrados: 0,
    semillasAportadas: 0,
    paisesParticipantes: 0,
  });
  
  const [seedLocations, setSeedLocations] = useState<SeedLocation[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<SeedLocation | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const seedsCollection = collection(db, "seeds"); // Accede a la colección "seeds"
        const seedsSnapshot = await getDocs(seedsCollection);
        
        // Inicializa los contadores
        const usersSet = new Set();
        const countriesSet = new Set();
        const locations: SeedLocation[] = [];

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
        <section className="py-20 bg-gradient-to-b from-olive-50 to-olive-100 relative overflow-hidden">
          {/* Eliminamos los elementos decorativos de fondo */}
          {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-olive-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-olive-500 blur-3xl"></div>
            <div className="absolute -bottom-10 left-1/3 w-40 h-40 rounded-full bg-olive-400 blur-3xl"></div>
          </div> */}
          
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
              <span className="relative z-10">Estadísticas de la RedCultiva</span>
              <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
              <StatCard 
                title="Usuarios Registrados" 
                value={stats.usuariosRegistrados.toLocaleString()} 
                icon={<UsersIcon className="w-8 h-8" />}
                color="from-olive-400 to-olive-600"
              />
              <StatCard 
                title="Semillas Aportadas" 
                value={stats.semillasAportadas.toLocaleString()} 
                icon={<SproutIcon className="w-8 h-8" />}
                color="from-olive-500 to-olive-700"
              />
              <StatCard 
                title="Países Participantes" 
                value={stats.paisesParticipantes.toLocaleString()} 
                icon={<GlobeIcon className="w-8 h-8" />}
                color="from-olive-300 to-olive-500"
              />
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
  icon: React.ReactNode;
  color: string;
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-olive-50 bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-olive-200 relative overflow-hidden group">
      {/* Fondo con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Icono con círculo decorativo */}
      <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-olive-100 rounded-full opacity-50"></div>
        <div className="absolute inset-2 bg-olive-100 rounded-full border-2 border-olive-200"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-olive-700">
            {icon}
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-olive-800 mb-3">{title}</h2>
      <div className="w-12 h-1 bg-olive-300 mx-auto mb-4 rounded-full"></div>
      <p className="text-4xl font-bold text-olive-900">{value}</p>
      
      {/* Línea decorativa */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-olive-300 to-transparent mt-6 opacity-30"></div>
    </div>
  );
}
