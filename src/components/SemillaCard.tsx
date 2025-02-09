import React from 'react';

interface SemillaCardProps {
  semilla: {
    usuario: string;
    tipo: string;
    nombre: string;
    variedad: string;
    nombreCientifico: string;
    agnoRecoleccion: string;
    lugarRecoleccion: string;
    observaciones: string;
    imagenes: string;
  };
}

const SemillaCard: React.FC<SemillaCardProps> = ({ semilla }) => {
  return (
    <div className="h-64 bg-dark_moss_green-700 dark:bg-olive-800 border border-green-300 dark:border-olive-700 shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 bg-dark_moss_green-600 border-b border-olive-700">
          <h2 className="text-lg font-semibold text-olive-100">{semilla.nombre}</h2>
          <p className="text-sm text-olive-300">{semilla.variedad}</p>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 space-y-2">
          <p className="text-sm text-olive-100">
            <strong>Nombre Científico:</strong> {semilla.nombreCientifico}
          </p>
          <p className="text-sm text-olive-100">
            <strong>Año de Recolección:</strong> {semilla.agnoRecoleccion}
          </p>
          <p className="text-sm text-olive-100">
            <strong>Lugar de Recolección:</strong> {semilla.lugarRecoleccion}
          </p>
          <p className="text-sm text-olive-100">
            <strong>Observaciones:</strong> {semilla.observaciones || 'Sin información'}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-dark_moss_green-600">
          <p className="text-xs text-olive-300 italic">
            <strong>Subido por:</strong> {semilla.usuario}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SemillaCard;
