'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import { Sprout, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string; // Agregar el ID de Discord aquí
}

export function Menu() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  // Estado para almacenar si el usuario es admin
  const user = session?.user as User || null; // Asegurarse de que el tipo de usuario incluya el ID

  // Comprobar si el ID de Discord está disponible y es el esperado
  useEffect(() => {
    if (user) {
      if (user.id) {
        console.log("ID de Discord:", user.id);
      }
    }
  }, [user]);

  // Comprobar si el usuario es admin cuando se abre el menú
  useEffect(() => {
    if (menuOpen && user) {
      const adminIds = process.env.NEXT_PUBLIC_ADMIN_DISCORD_IDS || ''; // Asegurarse de que no sea undefined
      const isAdmin = user?.id ? adminIds.split(',').includes(user.id) : false;
      setIsAdmin(isAdmin);
      console.log(isAdmin);
    }
  }, [menuOpen, user]); // Solo se ejecuta cuando se abre el modal y el ID cambia

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`w-full py-4 shadow-lg transition-all duration-200 ${isScrolled ? 'bg-olive-100/80 backdrop-blur-lg' : 'bg-olive-100/40 backdrop-blur-sm'}`}>
      <div className="container mx-auto flex justify-between items-center px-8">
        <Link href="/" className="flex items-center space-x-2 text-olive-900 text-xl font-bold hover:text-olive-600 transition-colors">
          <Sprout size={24} />
          <span>RedCultiva</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/catalogo" className="text-olive-900 hover:text-olive-600 font-medium transition-colors">
            Catálogo de Semillas
          </Link>
          <Link href="/como-funciona" className="text-olive-900 hover:text-olive-600 font-medium transition-colors">
            Cómo Funciona
          </Link>
          {!session ? (
            <LoginButton />
          ) : (
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-olive-800 text-olive-100 py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-olive-900"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img src={session?.user?.image || "/default-avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm">Mi cuenta</span>
                <ChevronDown size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-olive-800 text-olive-100 rounded-lg overflow-hidden shadow-lg">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 hover:bg-olive-900 transition-colors"
                    onClick={closeMenu} // Cierra el menú cuando se hace clic
                  >
                    Gestionar mis semillas
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin"
                      className="block px-4 py-2 hover:bg-olive-900 transition-colors"
                      onClick={closeMenu} // Cierra el menú al hacer clic
                    >
                      Administración
                    </Link>
                  )}
                  <button 
                    className="w-full text-left block px-4 py-2 hover:bg-olive-900 transition-colors"
                    onClick={() => {
                      closeMenu();  // Cierra el menú al hacer clic
                      signOut();    // Cierra sesión
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
