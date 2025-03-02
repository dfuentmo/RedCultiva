"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeedCard } from "@/components/seed-card";
import { SeedList } from "@/components/seed-list";
import { CreateEditSeedModal } from "@/components/create-edit-seed-modal";
import { SearchBar } from "@/components/search-bar";
import { db } from "@/lib/firebase"; // Conexión a Firebase Firestore
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
// Tipo para las semillas
type Seed = {
  id?: string; // Añadimos id para manejar edición y eliminación
  usuario: string;
  tipo: string;
  nombre: string;
  variedad: string;
  nombreCientifico: string;
  agnoRecoleccion: string;
  lugarRecoleccion: string;
  observaciones: string;
  imagenes: string;
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeed, setEditingSeed] = useState<Seed | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("0");
  const [sortBy, setSortBy] = useState("nombre");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const username = session?.user?.name;

  // Obtener las semillas desde Firestore
  useEffect(() => {
    const fetchSeeds = async () => {
      if (!username) return;
      setLoading(true);
      try {
        const q = query(collection(db, "seeds"), where("usuario", "==", username));
        const querySnapshot = await getDocs(q);
        
        const userSeeds: Seed[] = [];
        querySnapshot.forEach((doc) => {
          userSeeds.push({ ...doc.data(), id: doc.id } as Seed);
        });
        
        setSeeds(userSeeds);
      } catch (error) {
        console.error("Error al obtener las semillas desde Firestore", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeeds();
  }, [username]);

  // Guardar semilla en Firestore
  const handleSaveSeed = async (seed: Seed) => {
    try {
      if (!session?.user?.name) {
        console.error("Usuario no autenticado");
        return;
      }

      const docRef = await addDoc(collection(db, "seeds"), {
        usuario: session.user.name,
        tipo: seed.tipo || "",
        nombre: seed.nombre || "",
        variedad: seed.variedad || "",
        nombreCientifico: seed.nombreCientifico || "",
        agnoRecoleccion: seed.agnoRecoleccion || "",
        lugarRecoleccion: seed.lugarRecoleccion || "",
        observaciones: seed.observaciones || "",
        imagenes: seed.imagenes || "",
      });

      console.log("Documento escrito con ID: ", docRef.id);

      setSeeds((prev) => [
        ...prev,
        { ...seed, id: docRef.id },
      ]);
    } catch (error) {
      console.error("Error al crear la semilla en Firestore", error);
    } finally {
      setIsModalOpen(false);
      setEditingSeed(null);
    }
  };

  // Eliminar semilla desde Firestore
  const handleDeleteSeed = async (id: string) => {
    try {
      const seedDocRef = doc(db, "seeds", id);
      await deleteDoc(seedDocRef);

      setSeeds((prev) => prev.filter((seed) => seed.id !== id));
    } catch (error) {
      console.error("Error al eliminar la semilla desde Firestore", error);
    }
  };

  // Filtrar años disponibles
  const availableYears = useMemo(() => {
    const years = new Set(seeds.map((seed) => seed.agnoRecoleccion));
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [seeds]);

  // Filtrar y ordenar semillas
  const filteredAndSortedSeeds = useMemo(() => {
    return seeds
      .filter((seed) => {
        const matchesSearch =
          (seed.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (seed.variedad?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (seed.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesYear = selectedYear === "0" || seed.agnoRecoleccion === selectedYear;
        return matchesSearch && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === "nombre") {
          return a.nombre.localeCompare(b.nombre);
        } else if (sortBy === "agnoRecoleccion") {
          return b.agnoRecoleccion.localeCompare(a.agnoRecoleccion);
        }
        return 0;
      });
  }, [seeds, searchTerm, selectedYear, sortBy]);

  if (!session) {
    return <p className="text-center text-olive-200">Por favor, inicia sesión para ver tus semillas.</p>;
  }
  const handleImportSeeds = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-seeds");
      const data = await response.json();
      await importSeedsToFirestore(data);
      alert("Importación completada correctamente.");
    } catch (error) {
      console.error("Error al importar semillas:", error);
      alert("Error al importar datos.");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-olive-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-olive-900">Dashboard de Semillas</h1>
          <div className="p-6">
    </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-olive-800 hover:bg-olive-900 text-olive-100">
            <Plus className="mr-2 h-4 w-4" /> Crear nueva semilla
          </Button>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          availableYears={availableYears}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {loading ? (
          <p className="text-center text-olive-900">Cargando semillas...</p>
        ) : filteredAndSortedSeeds.length === 0 ? (
          <p className="text-center text-olive-900 mt-8">No se encontraron semillas que coincidan con tu búsqueda.</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSeeds.map((seed) => (
              <SeedCard
                key={seed.id}
                seed={seed}
                onEdit={() => {
                  setEditingSeed(seed);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteSeed(seed.id!)}
              />
            ))}
          </div>
        ) : (
          <SeedList
            seeds={filteredAndSortedSeeds}
            onEdit={(seed) => {
              setEditingSeed(seed);
              setIsModalOpen(true);
            }}
            onDelete={(id) => handleDeleteSeed(id)}
          />
        )}
      </div>

      <CreateEditSeedModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSeed(null);
        }}
        seedToEdit={editingSeed}
        onSave={handleSaveSeed}
      />
    </div>
  );
}
