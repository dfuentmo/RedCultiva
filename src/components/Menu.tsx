'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import { Sprout } from "lucide-react";
import { useState, useEffect } from "react";

export function Menu() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full py-4 shadow-lg transition-all duration-200 ${
      isScrolled ? 'bg-olive-100/80 backdrop-blur-lg' : 'bg-olive-100/40 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-8">
        <Link href="/" className="flex items-center space-x-2 text-olive-900 text-xl font-bold hover:text-olive-600 transition-colors">
          <Sprout size={24} />
          <span>RedCultiva</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href="/catalogo" 
            className="text-olive-900 hover:text-olive-600 font-medium transition-colors"
          >
            Catálogo de Semillas
          </Link>
          {!session ? (
            <LoginButton />
          ) : (
            <div className="flex items-center space-x-2">
              <Link 
                href="/dashboard" 
                className="bg-olive-800 text-olive-100 hover:bg-olive-900 font-medium py-2 px-4 rounded-lg shadow-md transition-colors flex items-center space-x-2"
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
              <button
                className="bg-olive-800 text-olive-100 hover:bg-olive-900 font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
                onClick={() => signOut()}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
