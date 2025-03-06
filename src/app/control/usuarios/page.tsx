"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      setUsuarios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
      <ul className="mt-4 space-y-2">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="p-2 bg-gray-800 rounded">
            {usuario.nombre} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
