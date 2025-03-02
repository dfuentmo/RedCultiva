"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List, Search, ChevronLeft, ChevronRight, X } from "lucide-react";

// Definir la interfaz para los datos de semillas
interface Seed {
  id: string;
  nombre: string;
  variedad: string;
  año: string;
  lugarRecoleccion: string;
  usuario: string;
  fechaRegistro: string;
}

export default function CatalogoPage() {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [filteredSeeds, setFilteredSeeds] = useState<Seed[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVariedad, setFilterVariedad] = useState<string>("todas");
  const [filterLugar, setFilterLugar] = useState<string>("todos");
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  
  // Modal de detalles
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Obtener listas únicas para los filtros
  const variedades = [...new Set(seeds.map(seed => seed.variedad))].filter(Boolean).sort();
  const lugares = [...new Set(seeds.map(seed => seed.lugarRecoleccion))].filter(Boolean).sort();

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const seedsCollection = collection(db, "seeds");
        const seedsSnapshot = await getDocs(seedsCollection);
        
        const seedsList = seedsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Seed[];
        
        setSeeds(seedsList);
        setFilteredSeeds(seedsList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las semillas:", error);
        setLoading(false);
      }
    };

    fetchSeeds();
  }, []);

  // Filtrar semillas cuando cambian los criterios de búsqueda
  useEffect(() => {
    let result = seeds;
    
    if (searchTerm) {
      result = result.filter(seed => 
        seed.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seed.variedad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seed.lugarRecoleccion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterVariedad && filterVariedad !== "todas") {
      result = result.filter(seed => seed.variedad === filterVariedad);
    }
    
    if (filterLugar && filterLugar !== "todos") {
      result = result.filter(seed => seed.lugarRecoleccion === filterLugar);
    }
    
    setFilteredSeeds(result);
  }, [seeds, searchTerm, filterVariedad, filterLugar]);

  // Resetear todos los filtros
  const resetFilters = () => {
    setSearchTerm("");
    setFilterVariedad("todas");
    setFilterLugar("todos");
    setCurrentPage(1); // Resetear también la página actual
  };
  
  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSeeds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSeeds.length / itemsPerPage);
  
  // Cambiar de página
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('resultados')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  // Abrir modal con detalles de la semilla
  const openSeedDetails = (seed: Seed) => {
    setSelectedSeed(seed);
    setShowModal(true);
    // Prevenir scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };
  
  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedSeed(null);
    // Restaurar scroll
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 to-olive-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
          <span className="relative z-10">Catálogo de Semillas</span>
          <span className="absolute w-24 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
        </h1>
        
        <p className="text-xl text-olive-700 text-center max-w-3xl mx-auto mb-12">
          Explora nuestra colección de semillas preservadas por guardianes de todo el mundo. 
          Descubre variedades únicas y conoce su origen e historia.
        </p>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-olive-100 bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg border border-olive-200/30 p-6 mb-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-600" size={18} />
              <Input
                type="text"
                placeholder="Buscar por nombre, variedad o lugar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white bg-opacity-70 border-olive-300 focus:border-olive-500 focus:ring-olive-500"
              />
            </div>
            
            <Select value={filterVariedad} onValueChange={setFilterVariedad}>
              <SelectTrigger className="w-full md:w-48 bg-white bg-opacity-70 border-olive-300">
                <SelectValue placeholder="Variedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las variedades</SelectItem>
                {variedades.map(variedad => (
                  <SelectItem key={variedad} value={variedad}>{variedad}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterLugar} onValueChange={setFilterLugar}>
              <SelectTrigger className="w-full md:w-48 bg-white bg-opacity-70 border-olive-300">
                <SelectValue placeholder="Lugar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los lugares</SelectItem>
                {lugares.map(lugar => (
                  <SelectItem key={lugar} value={lugar}>{lugar}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={resetFilters}
              className="text-olive-600 hover:text-olive-800 text-sm font-medium"
            >
              Limpiar filtros
            </button>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
              <ToggleGroupItem value="grid" aria-label="Ver en cuadrícula">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Ver en lista">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Resultados */}
        <div id="resultados">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700 mx-auto"></div>
              <p className="mt-4 text-olive-700">Cargando semillas...</p>
            </div>
          ) : filteredSeeds.length === 0 ? (
            <div className="text-center py-12 bg-white bg-opacity-50 rounded-2xl max-w-5xl mx-auto">
              <p className="text-xl text-olive-700">No se encontraron semillas con los criterios seleccionados.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-olive-700 text-olive-100 rounded-lg hover:bg-olive-800 transition-colors"
              >
                Mostrar todas las semillas
              </button>
            </div>
          ) : (
            <>
              <div className={`max-w-5xl mx-auto ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
                {currentItems.map((seed) => (
                  <div 
                    key={seed.id} 
                    className={`bg-olive-100 bg-opacity-60 backdrop-blur-sm rounded-xl shadow-md border border-olive-200/30 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
                      viewMode === "grid" ? "" : "flex items-center p-4"
                    }`}
                    onClick={() => openSeedDetails(seed)}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-olive-900 mb-2">{seed.nombre}</h3>
                          <p className="text-olive-700 mb-4">Variedad: {seed.variedad || "No especificada"}</p>
                          <div className="flex justify-between text-sm text-olive-600">
                            <span>Año: {seed.año || "Desconocido"}</span>
                            <span>Origen: {seed.lugarRecoleccion || "No especificado"}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-olive-900">{seed.nombre}</h3>
                          <p className="text-olive-700 text-sm">Variedad: {seed.variedad || "No especificada"}</p>
                        </div>
                        <div className="text-right text-sm text-olive-600">
                          <p>Año: {seed.año || "Desconocido"}</p>
                          <p>Origen: {seed.lugarRecoleccion || "No especificado"}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-2">
                  <button 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-olive-400 cursor-not-allowed' : 'text-olive-700 hover:bg-olive-200'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => goToPage(number)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === number 
                          ? 'bg-olive-700 text-olive-100' 
                          : 'text-olive-700 hover:bg-olive-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-olive-400 cursor-not-allowed' : 'text-olive-700 hover:bg-olive-200'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
              
              <div className="text-center mt-6 text-olive-600">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSeeds.length)} de {filteredSeeds.length} semillas
              </div>
            </>
          )}
        </div>
        
        {/* Modal de detalles de semilla */}
        {showModal && selectedSeed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative p-6">
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-olive-600 hover:text-olive-900"
                >
                  <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-olive-900 mb-6 pr-8">{selectedSeed.nombre}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-olive-600 mb-1">Variedad</h3>
                    <p className="text-olive-900">{selectedSeed.variedad || "No especificada"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-olive-600 mb-1">Año</h3>
                    <p className="text-olive-900">{selectedSeed.año || "Desconocido"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-olive-600 mb-1">Lugar de recolección</h3>
                    <p className="text-olive-900">{selectedSeed.lugarRecoleccion || "No especificado"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-olive-600 mb-1">Fecha de registro</h3>
                    <p className="text-olive-900">{selectedSeed.fechaRegistro || "No disponible"}</p>
                  </div>
                </div>
                
                <div className="bg-olive-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-olive-600 mb-2">Guardián de la semilla</h3>
                  <p className="text-olive-900">{selectedSeed.usuario || "Anónimo"}</p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2 bg-olive-700 text-olive-100 rounded-lg hover:bg-olive-800 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 