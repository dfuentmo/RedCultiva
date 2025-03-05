import React from 'react';
import Link from 'next/link';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-olive-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-olive-900 mb-16">Administración</h1>
        <div className="flex flex-col items-center space-y-4">
          <Link href="/admin/semillas" className="bg-olive-800 text-olive-100 hover:bg-olive-900 font-medium py-2 px-4 rounded-lg shadow-md transition-colors">
            Gestionar Semillas
          </Link>
          <Link href="/admin/usuarios" className="bg-olive-800 text-olive-100 hover:bg-olive-900 font-medium py-2 px-4 rounded-lg shadow-md transition-colors">
            Gestionar Usuarios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 