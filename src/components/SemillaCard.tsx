import React, { useState } from "react";

interface SemillaCardProps {
  semilla: {
    asociacionBeneficiosa: string;
    asociacionPerjudicial: string;
    añoRecoleccion: string;
    cultivo: string;
    imagenes: string;
    lugarRecoleccion: string;
    nombreCientifico: string;
    observaciones: string;
    variedad: string;
  };
  currentUser?: string;
}

const SemillaCard: React.FC<SemillaCardProps> = ({ semilla }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="group relative h-full bg-dark_moss_green-700 dark:bg-olive-800 border border-green-300 dark:border-olive-700 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative w-full h-full">
          {/* Fondo difuminado en hover */}
          <div className="absolute inset-0 bg-olive-800 opacity-0 group-hover:opacity-70 group-hover:blur-sm transition-all duration-300 z-0"></div>

          {/* Imagen del cultivo */}
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            {semilla.imagenes ? (
              <img 
                src={semilla.imagenes} 
                alt={semilla.cultivo}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white">Imagen no disponible</span>
            )}
          </div>

          {/* Contenido de la semilla */}
          <div className="p-4 transition-all duration-300 group-hover:opacity-70 group-hover:blur-sm">
            <h2 className="text-lg font-semibold text-olive-100">{semilla.nombreCientifico}</h2>
            <p className="text-sm font-medium text-olive-100 mt-1">{semilla.cultivo}</p>
            <p className="text-sm text-olive-100 mt-1"><strong>Año de recolección:</strong> {semilla.añoRecoleccion}</p>
            <p className="text-sm text-olive-100 mt-1"><strong>Lugar de recolección:</strong> {semilla.lugarRecoleccion}</p>
          </div>

          {/* Botón */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={openModal}
              className="px-4 py-2 bg-olive-800 text-olive-100 rounded-lg shadow-md hover:bg-olive-900"
            >
              Más información
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-olive-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-olive-700">
              <h3 className="text-2xl font-semibold text-olive-800 dark:text-olive-100">
                {semilla.nombreCientifico}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-olive-300 dark:hover:text-olive-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Imagen */}
              <div className="mb-6">
                {semilla.imagenes ? (
                  <img
                    src={semilla.imagenes}
                    alt={semilla.cultivo}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 dark:bg-olive-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 dark:text-olive-300">Imagen no disponible</span>
                  </div>
                )}
              </div>

              {/* Detalles en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Cultivo</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.cultivo}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Variedad</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.variedad}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Año de recolección</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.añoRecoleccion}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Lugar de recolección</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.lugarRecoleccion}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Asociación beneficiosa</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.asociacionBeneficiosa}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Asociación perjudicial</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.asociacionPerjudicial}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="font-semibold text-olive-700 dark:text-olive-200">Observaciones</h4>
                  <p className="text-olive-600 dark:text-olive-300">{semilla.observaciones || "No hay observaciones disponibles"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SemillaCard;
