import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Seed = {
  id: string;
  usuario?: string;
  tipo: string;
  nombre: string;
  variedad: string;
  nombreCientifico: string;
  agnoRecoleccion: string;
  lugarRecoleccion: string;
  observaciones: string;
  estado: string;
  imageUrl?: string;
};

const fetchSeeds = async (): Promise<Seed[]> => {
  const seedsCollection = collection(db, "seeds");
  const seedsSnapshot = await getDocs(seedsCollection);
  return seedsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Seed[];
};

export function useSeeds() {
  return useQuery({
    queryKey: ["seeds"],
    queryFn: fetchSeeds,
    staleTime: 1000 * 60 * 5, // 🕒 Datos válidos por 5 minutos
    cacheTime: 1000 * 60 * 10, // 💾 Se mantienen en caché 10 minutos
    refetchOnWindowFocus: false, // 🚀 No recarga al cambiar de pestaña
  });
}
