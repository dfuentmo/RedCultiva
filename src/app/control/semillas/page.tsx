"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// Definir la interfaz para los datos de semillas
type Seed = {
  id?: string;
  usuario?: string;
  tipo: string;
  nombre: string;
  variedad: string;
  nombreCientifico: string;
  agnoRecoleccion: string;
  lugarRecoleccion: string;
  observaciones: string;
  estado: string; // Asegúrate de tener este campo
  imageUrl?: string;
};

export default function AdminPage() {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const seedsCollection = collection(db, "seeds");
        const seedsSnapshot = await getDocs(seedsCollection);

        const seedsList = seedsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Seed[];

        // Filtrar las semillas que no tienen estado o están pendientes
        const seedsToShow = seedsList.filter(
          (seed) => !seed.estado || seed.estado === "Pendiente"
        );

        setSeeds(seedsToShow);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las semillas:", error);
        setLoading(false);
      }
    };

    fetchSeeds();
  }, []);

  // Función para aprobar la semilla
  const updateEstadoToAprobada = async (seedId: string) => {
    try {
      const seedRef = doc(db, "seeds", seedId);
      await updateDoc(seedRef, { estado: "aprobada" });
      // Actualizamos la semilla en el estado local
      setSeeds((prevSeeds) =>
        prevSeeds.map((seed) =>
          seed.id === seedId ? { ...seed, estado: "aprobada" } : seed
        )
      );
      console.log(`Estado de la semilla con ID: ${seedId} actualizado a 'aprobada'`);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // Función para rechazar la semilla (eliminarla)
  const deleteSeed = async (seedId: string) => {
    try {
      const seedRef = doc(db, "seeds", seedId);
      await deleteDoc(seedRef);
      // Eliminamos la semilla del estado local
      setSeeds((prevSeeds) => prevSeeds.filter((seed) => seed.id !== seedId));
      console.log(`Semilla con ID: ${seedId} eliminada`);
    } catch (error) {
      console.error("Error al eliminar la semilla:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 to-olive-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">Administración de Semillas</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700 mx-auto"></div>
            <p className="mt-4 text-olive-700">Cargando semillas...</p>
          </div>
        ) : seeds.length === 0 ? (
          <div className="text-center py-12 bg-white bg-opacity-50 rounded-2xl max-w-5xl mx-auto">
            <p className="text-xl text-olive-700">No hay semillas pendientes ni sin estado.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seeds.map((seed) => (
                <div
                  key={seed.id}
                  className="bg-olive-50/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-olive-300 cursor-pointer border border-olive-100"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-olive-900 mb-3">{seed.nombre}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-olive-700">
                        <span>Año: {seed.agnoRecoleccion || "Desconocido"}</span>
                      </div>
                      <div className="flex items-center text-sm text-olive-700">
                        <span>{seed.lugarRecoleccion || "Origen desconocido"}</span>
                      </div>
                      <div className="flex items-center text-sm text-olive-700">
                        <span>Estado: {seed.estado || "Sin estado asignado"}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => updateEstadoToAprobada(seed.id!)}
                      className="mt-4 px-6 py-2 bg-olive-500 text-white font-bold rounded-lg hover:bg-olive-600 transition duration-300"
                    >
                      Aprobar Semilla
                    </button>
                    <button
                      onClick={() => deleteSeed(seed.id!)}
                      className="mt-4 ml-4 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Rechazar Semilla
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
