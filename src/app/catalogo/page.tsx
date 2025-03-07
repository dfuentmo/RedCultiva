"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List, Search, ChevronLeft, ChevronRight, X, Calendar, MapPin, Leaf, User, Info, Sprout } from "lucide-react";
import { SeedImage } from "@/components/SeedImage";
import { SeedImageUploader } from "@/components/SeedImageUploader";

// Definir la interfaz para los datos de semillas
type Seed = {
  id?: string;
  usuario?: string;
  tipo: string;
  nombre: string;
  variedad: string;
  nombreCientifico: string;
  agnoRecoleccion: string;
  lugarRecoleccion: string;
  observaciones: string;
  imageUrl?: string;
  estado: string;
};

// Función para determinar el color de categoría basado en la variedad
const getCategoryColor = (variedad: string): string => {
  const hash = variedad.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'bg-olive-100 text-olive-800 border-olive-200',
    'bg-olive-200 text-olive-900 border-olive-300',
    'bg-olive-50 text-olive-700 border-olive-200',
    'bg-amber-50 text-amber-700 border-amber-100',
    'bg-emerald-50 text-emerald-700 border-emerald-100',
    'bg-green-50 text-green-700 border-green-100',
  ];
  return colors[hash % colors.length];
};

// Función para obtener un icono decorativo basado en el nombre de la semilla
const getSeedIconColor = (seedName: string): string => {
  const hash = seedName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'text-olive-600',
    'text-olive-700',
    'text-olive-500',
    'text-amber-600',
    'text-emerald-600',
    'text-green-600',
  ];
  return colors[hash % colors.length];
};

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
        
        // Filtrar las semillas aprobadas
        const approvedSeeds = seedsList.filter(seed => seed.estado === "aprobada");
        
        setSeeds(approvedSeeds);
        setFilteredSeeds(approvedSeeds);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    if (showModal) {
        window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

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
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-wrap gap-4 items-center bg-olive-100/80 text-olive-900 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-olive-300  max-w-5xl w-full">
            <Input
              type="text"
              placeholder="Buscar semillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-olive-200 border-olive-300 text-olive-900 placeholder:text-olive-900/70"
            />
            <Select value={filterVariedad} onValueChange={setFilterVariedad}>
              <SelectTrigger className="w-[180px] bg-olive-200 border-olive-300 text-olive-900">
                <SelectValue placeholder="Variedad" />
              </SelectTrigger>
              <SelectContent className="bg-olive-200 border-olive-300 text-olive-900">
                <SelectItem value="todas">Todas las variedades</SelectItem>
                {variedades.map(variedad => (
                  <SelectItem key={variedad} value={variedad}>{variedad}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterLugar} onValueChange={setFilterLugar}>
              <SelectTrigger className="w-[180px] bg-olive-200 border-olive-300 text-olive-900">
                <SelectValue placeholder="Lugar" />
              </SelectTrigger>
              <SelectContent className="bg-olive-200 border-olive-300 text-olive-900">
                <SelectItem value="todos">Todos los lugares</SelectItem>
                {lugares.map(lugar => (
                  <SelectItem key={lugar} value={lugar}>{lugar}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
              className="bg-olive-200 border-olive-300"
            >
              <ToggleGroupItem 
                value="grid" 
                aria-label="Vista de cuadrícula"
                className="text-olive-900 data-[state=on]:bg-olive-800 data-[state=on]:text-olive-100"
              >
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="list" 
                aria-label="Vista de lista"
                className="text-olive-900 data-[state=on]:bg-olive-800 data-[state=on]:text-olive-100"
              >
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
              <div className={`max-w-5xl mx-auto ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}`}>
                {currentItems.map((seed) => (
                  <div 
                    key={seed.id} 
                    className={`bg-olive-50/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-olive-300 cursor-pointer border border-olive-100 ${
                      viewMode === "grid" ? "" : "flex items-center"
                    }`}
                    onClick={() => openSeedDetails(seed)}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative">
                          <SeedImage 
                            imageUrl={seed.imageUrl}
                            alt={seed.nombre}
                            iconColor={getSeedIconColor(seed.nombre)}
                            className="h-32"
                          />
                          <div className={`absolute top-3 right-3 ${getCategoryColor(seed.variedad)} px-2 py-1 rounded-full text-xs font-medium border`}>
                            {seed.variedad || "Variedad"}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-olive-900 mb-3">{seed.nombre}</h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-olive-700">
                              <Calendar className="h-4 w-4 mr-2 text-olive-500" />
                              <span>Año: {seed.agnoRecoleccion || "Desconocido"}</span>
                            </div>
                            <div className="flex items-center text-sm text-olive-700">
                              <MapPin className="h-4 w-4 mr-2 text-olive-500" />
                              <span>{seed.lugarRecoleccion || "Origen desconocido"}</span>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-olive-200 flex justify-between items-center">
                            <div className="flex items-center text-sm text-olive-600">
                              <User className="h-4 w-4 mr-1" />
                              <span>{seed.usuario || "Anónimo"}</span>
                            </div>
                            <span className="text-olive-500 flex items-center text-sm font-medium hover:text-olive-700">
                              <Info className="h-4 w-4 mr-1" />
                              Detalles
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <SeedImage 
                          imageUrl={seed.imageUrl}
                          alt={seed.nombre}
                          iconColor={getSeedIconColor(seed.nombre)}
                          className="w-16 h-16 flex-shrink-0"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-olive-900">{seed.nombre}</h3>
                            <div className={`${getCategoryColor(seed.variedad)} px-2 py-1 rounded-full text-xs font-medium border`}>
                              {seed.variedad || "Variedad"}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-olive-700">
                            <MapPin className="h-4 w-4 mr-1 text-olive-500" />
                            <span>{seed.lugarRecoleccion || "Origen desconocido"}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-1 text-olive-500" />
                            <span>Año: {seed.agnoRecoleccion || "Desconocido"}</span>
                          </div>
                        </div>
                        <div className="pr-4">
                          <span className="text-olive-500 flex items-center text-sm font-medium hover:text-olive-700">
                            <Info className="h-4 w-4 mr-1" />
                            Detalles
                          </span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="bg-olive-100 rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-olive-200">
              <div className="relative">
                <SeedImage 
                  imageUrl={selectedSeed.imageUrl}
                  alt={selectedSeed.nombre}
                  iconColor={getSeedIconColor(selectedSeed.nombre)}
                  className="h-40"
                />
                <div className={`absolute top-4 right-4 ${getCategoryColor(selectedSeed.variedad)} px-3 py-1 rounded-full text-sm font-medium border shadow-md`}>
                  {selectedSeed.variedad || "Variedad"}
                </div>
                <button 
                  onClick={closeModal}
                  className="absolute top-4 left-4 bg-white p-2 rounded-full text-olive-600 hover:text-olive-900 shadow-md"
                  style={{ display: 'none' }}
                >
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-olive-900 mb-6">{selectedSeed.nombre}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-olive-100/70 p-5 rounded-lg border border-olive-200">
                    <div className="flex items-center mb-2">
                      <Leaf className="h-5 w-5 mr-2 text-olive-600" />
                      <h3 className="text-sm font-medium text-olive-700">Variedad</h3>
                    </div>
                    <p className="text-olive-900 font-medium">{selectedSeed.variedad || "No especificada"}</p>
                  </div>
                  
                  <div className="bg-olive-100/70 p-5 rounded-lg border border-olive-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-olive-600" />
                      <h3 className="text-sm font-medium text-olive-700">Año</h3>
                    </div>
                    <p className="text-olive-900 font-medium">{selectedSeed.agnoRecoleccion || "Desconocido"}</p>
                  </div>
                  
                  <div className="bg-olive-100/70 p-5 rounded-lg border border-olive-200">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-olive-600" />
                      <h3 className="text-sm font-medium text-olive-700">Lugar de recolección</h3>
                    </div>
                    <p className="text-olive-900 font-medium">{selectedSeed.lugarRecoleccion || "No especificado"}</p>
                  </div>

                  <div className="bg-olive-100/70 p-5 rounded-lg border border-olive-200">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 mr-2 text-olive-600" />
                      <h3 className="text-sm font-medium text-olive-700">Guardián de la semilla</h3>
                    </div>
                    <p className="text-olive-900 font-medium">{selectedSeed.usuario || "Anónimo"}</p>
                  </div>
                </div>
                
                <div className="bg-olive-100/70 p-5 rounded-lg border border-olive-200">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 mr-2 text-olive-600" />
                    <h3 className="text-sm font-medium text-olive-700">Observaciones</h3>
                  </div>
                  <p className="text-olive-900 font-medium">{selectedSeed.observaciones || "No disponible"}</p>
                </div>

                <div className="text-center mt-6">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-3 bg-olive-700 text-olive-100 rounded-lg hover:bg-olive-800 transition-colors shadow-md hover:shadow-lg"
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