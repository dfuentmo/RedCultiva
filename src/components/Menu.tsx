'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import { Sprout } from "lucide-react";

export function Menu() {
  const { data: session } = useSession();  // Obtiene los datos de sesión del usuario

  return (
    <header className="bg-olive-100 bg-opacity-80 py-4 shadow-md backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-olive-800 text-xl font-bold hover:text-olive-600">
          <Sprout size={24} />
          <span>RedCultiva</span>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Si el usuario no está logueado, muestra el LoginButton */}
          {!session ? (
            <LoginButton />
          ) : (
            <div className="flex items-center space-x-2">
              {/* Avatar y enlace a "Mi cuenta" */}
              <Link 
                href="/dashboard" 
                className="bg-olivine-100 text-dark_moss_green-600 hover:bg-olivine-200 font-bold py-2 px-4 rounded flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={session?.user?.image || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-sm">Mi cuenta</span>
              </Link>
              {/* Botón de Cerrar sesión */}
              <button
                className="bg-olivine-100 text-dark_moss_green-600 hover:bg-olivine-200 font-bold py-2 px-4 rounded"
                onClick={() => signOut()}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
