"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchSeeds } from "../../services/api";
import SemillaCard from "../../components/SemillaCard";
import { Semilla } from "../../types";

const SeedsPage: React.FC = () => {
  const { data: session } = useSession();
  const [seeds, setSeeds] = useState<Semilla[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeeds();
        // Convertir la respuesta de la API al formato de Semilla
        const convertedData: Semilla[] = data.map(seed => ({
          id: seed.id,
          usuario: seed.user,
          cultivo: seed.name,
          variedad: seed.variety,
          nombreCientifico: seed.scientificName,
          añoRecoleccion: seed.year,
          lugarRecoleccion: seed.location,
          observaciones: seed.observations,
          asociacionBeneficiosa: seed.beneficialAssociation,
          asociacionPerjudicial: seed.harmfulAssociation,
          imagenes: seed.images || ''
        }));
        setSeeds(convertedData);
      } catch (error) {
        console.error("Error fetching seeds:", error);
      }
    };

    fetchData();
  }, []);

  const filteredSeeds = seeds.filter((seed) => {
    const matchesSearch =
      seed.cultivo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.variedad.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(seed.añoRecoleccion);

    return matchesSearch && matchesYear;
  });

  const totalPages = Math.ceil(filteredSeeds.length / pageSize);
  const paginatedSeeds = filteredSeeds.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleYearToggle = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((item) => item !== year) : [...prev, year]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYears([]);
    setCurrentPage(1);
  };

  const showResetButton = searchQuery || selectedYears.length > 0;

  return (
    <div className="container mx-auto pt-8 pb-8 flex flex-col items-center justify-center min-h-screen">
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold text-olive-800 mb-6">Semillas</h2>
        <p className="text-lg text-olive-800 mb-8">
          Aquí puedes explorar las semillas disponibles en nuestro banco.
        </p>
      </section>

      {/* Caja de filtros */}
      <div className="border-2 border-olive-800 rounded-lg p-6 w-full max-w-2xl bg-olive-800/20 backdrop-blur-sm">
        {/* Input de búsqueda */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar semilla"
            className="w-full p-3 rounded-lg border border-olive-300 bg-asparagus-500 text-dark_green placeholder-dark_green focus:outline-none focus:ring-2 focus:ring-olive-500 transition-all duration-300"
          />
        </div>

        {/* Años de producción */}
        <div className="flex flex-wrap justify-center space-x-4 mb-4">
          {[2020, 2021, 2022].map((year) => (
            <button
              key={year}
              onClick={() => handleYearToggle(String(year))}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedYears.includes(String(year))
                  ? "bg-olive-800 text-olive-200"
                  : "bg-asparagus-500 text-dark_green hover:bg-asparagus-600"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Resetear filtros */}
        {showResetButton && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-asparagus-500 text-dark_green font-medium rounded hover:bg-asparagus-600 transition-all"
            >
              Resetear filtros
            </button>
          </div>
        )}
      </div>

      {/* Semillas paginadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mt-8">
        {paginatedSeeds.map((semilla) => (
          <SemillaCard 
            key={semilla.id} 
            semilla={semilla} 
            currentUser={session?.user?.name || undefined}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-olive-600 text-olive-100 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-olive-100">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-olive-600 text-olive-100 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SeedsPage; 