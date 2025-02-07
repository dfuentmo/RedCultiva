'use client';

import { useState, useEffect } from 'react';
import SemillaCard from './SemillaCard';

const SpreadsheetViewer = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheets');
        const result = await response.json();
        console.log('Entradas de la hoja:', result);
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Los datos no están en el formato esperado.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la hoja:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const randomSeeds = Array.isArray(data)
    ? data.sort(() => Math.random() - 0.5).slice(0, 6)
    : [];
  const skeletonCard = (
    <div className="h-60 bg-dark_moss_green-700 dark:bg-olive-800 border border-green-300 dark:border-olive-700 shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-full p-4">
        <div className="h-6 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-olive-600 rounded mb-2"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>{skeletonCard}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {randomSeeds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {randomSeeds.map((semilla, index) => (
            <SemillaCard key={index} semilla={semilla} />
          ))}
        </div>
      ) : (
        <p>No hay semillas disponibles.</p>
      )}
    </div>
  );
};

export default SpreadsheetViewer;
