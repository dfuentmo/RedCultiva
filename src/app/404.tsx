import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-olive-100">
      <main className="flex-grow flex items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-olive-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-olive-700 mb-8">¡Página no encontrada!</h2>
        <p className="text-lg text-olive-600 mb-4">Lo sentimos, la página que buscas no existe.</p>
        <Link href="/" className="text-olive-500 hover:underline">Regresar a la página principal</Link>
      </main>
    </div>
  );
};

export default NotFoundPage; 