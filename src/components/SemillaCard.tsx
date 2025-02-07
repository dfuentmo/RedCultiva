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
    <div className="h-60 bg-dark_moss_green-700 dark:bg-olive-800 border border-green-300 dark:border-olive-700 shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-full">
        {/* Contenido de la semilla */}
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-semibold text-olive-100">{semilla.nombre}</h2>
          <p className="text-sm text-olive-100">{semilla.variedad}</p>
          <p className="text-sm text-olive-100"><strong>Nombre Científico:</strong> {semilla.nombreCientifico}</p>
          <p className="text-sm text-olive-100"><strong>Año de Recolección:</strong> {semilla.agnoRecoleccion}</p>
          <p className="text-sm text-olive-100"><strong>Lugar de Recolección:</strong> {semilla.lugarRecoleccion}</p>
          
          {/* Observaciones sin cambio de tamaño de fuente */}
          <p className="text-sm text-olive-100">
            <strong>Observaciones:</strong> {semilla.observaciones}
          </p>

          {/* Subtítulo con el nombre del usuario */}
          <p className="text-xs text-olive-100 italic"><strong>Subido por:</strong> {semilla.usuario}</p>
        </div>
      </div>
    </div>
  );
};

export default SemillaCard;
