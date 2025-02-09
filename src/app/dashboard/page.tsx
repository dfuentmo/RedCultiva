'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Asegúrate de importar el wrapper

export default function Dashboard() {
  const { data: session } = useSession(); // Obtiene la sesión del usuario
  const router = useRouter();

  // Si el usuario no está logueado, redirigimos a la página principal o login
  if (!session) {
    router.push('/'); // O puedes redirigir a la página de login
    return null; // No renderiza nada mientras redirige
  }

  return (
    <SessionProviderWrapper>  {/* Envuelves la página del dashboard solo en el wrapper */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-olive-800">Bienvenido a tu Dashboard, {session.user?.name}!</h1>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Información del Usuario</h2>
          <p><strong>Email:</strong> {session.user?.email}</p>
          <p><strong>Avatar:</strong></p>
          <img 
            src={session.user?.image || "/default-avatar.png"} 
            alt="User Avatar" 
            className="w-20 h-20 rounded-full object-cover" 
          />
        </div>

        {/* Aquí puedes agregar más información o funcionalidades del dashboard */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Mis semillas</h2>
          {/* Aquí puedes mostrar las semillas asociadas al usuario */}
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
