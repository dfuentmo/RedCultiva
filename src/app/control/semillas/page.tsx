"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Conexión a Firestore
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminSemillas() {
  const [semillas, setSemillas] = useState<any[]>([]);

  useEffect(() => {
    const fetchSemillas = async () => {
      const querySnapshot = await getDocs(collection(db, "semillas"));
      setSemillas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchSemillas();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "semillas", id));
    setSemillas(prev => prev.filter(semilla => semilla.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Gestión de Semillas</h2>
      <ul className="mt-4 space-y-2">
        {semillas.map((semilla) => (
          <li key={semilla.id} className="p-2 bg-gray-800 rounded flex justify-between">
            <span>{semilla.nombre}</span>
            <button
              className="px-2 py-1 bg-red-600 rounded"
              onClick={() => handleDelete(semilla.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
