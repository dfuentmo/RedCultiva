"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Pencil, Check, X, AlertCircle, Eye, Filter, Search, RefreshCw, Database } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { toast } from 'sonner';

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
  estado: string; // Asegúrate de tener este campo
  imageUrl?: string;
  fechaEnvio: string;
  incompleto?: boolean;
  razonRechazo?: string;
};

// Datos dummy para semillas
// const initialDummySeeds = [...];
// const additionalDummySeeds = [...];

export default function AdminPanel() {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [currentSeed, setCurrentSeed] = useState<Seed | null>(null);
  const [editedSeed, setEditedSeed] = useState<Seed | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [activeTab, setActiveTab] = useState("pendientes");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos iniciales
  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Obtener datos de la colección "seeds" (la misma que usa la página de catálogo)
      const seedsSnapshot = await getDocs(collection(db, "seeds"));
      
      if (seedsSnapshot.empty) {
        console.log("No se encontraron semillas en la base de datos");
        setSeeds([]);
        toast('No hay semillas disponibles');
      } else {
        const seedsData = seedsSnapshot.docs.map((doc) => ({
          id: doc.id,
          usuario: doc.data().usuario || '',
          tipo: doc.data().tipo || '',
          nombre: doc.data().nombre || '',
          variedad: doc.data().variedad || '',
          nombreCientifico: doc.data().nombreCientifico || '',
          agnoRecoleccion: doc.data().agnoRecoleccion || '',
          lugarRecoleccion: doc.data().lugarRecoleccion || '',
          observaciones: doc.data().observaciones || '',
          estado: doc.data().estado || 'pendiente',
          imageUrl: doc.data().imageUrl || '/placeholder.svg?height=80&width=80',
          fechaEnvio: doc.data().fechaEnvio || new Date().toISOString(),
          incompleto: doc.data().incompleto || false,
          razonRechazo: doc.data().razonRechazo || '',
        }));
        
        console.log("Semillas cargadas desde Firebase:", seedsData);
        setSeeds(seedsData);
        toast('Datos cargados correctamente');
      }
    } catch (error) {
      console.error("Error al cargar datos de Firebase:", error);
      toast('Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  // Asegurarse de que useEffect llame a loadInitialData
  useEffect(() => {
    loadInitialData();
  }, []);



  // Filtrar semillas según la pestaña activa, búsqueda y tipo
  const filteredSeeds = seeds.filter((seed) => {
    const matchesTab =
      (activeTab === "pendientes" && seed.estado === "pendiente") ||
      (activeTab === "aprobadas" && seed.estado === "aprobada") ||
      (activeTab === "rechazadas" && seed.estado === "rechazada") ||
      activeTab === "todas";

    const matchesSearch =
      seed.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seed.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (seed.usuario && seed.usuario.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "todos" || seed.tipo.toLowerCase() === filterType.toLowerCase();

    return matchesTab && matchesSearch && matchesType;
  });

  // Función para abrir el modal de edición
  const openEditModal = (seed: Seed) => {
    setCurrentSeed(seed);
    setEditedSeed({ ...seed });
    setIsEditModalOpen(true);
  };

  // Función para abrir el modal de visualización
  const openViewModal = (seed: Seed) => {
    setCurrentSeed(seed);
    setIsViewModalOpen(true);
  };

  // Función para abrir el modal de rechazo
  const openRejectModal = (seed: Seed) => {
    setCurrentSeed(seed);
    setRejectReason("");
    setIsRejectModalOpen(true);
  };

  // Función para actualizar los campos de la semilla
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedSeed((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Función para manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setEditedSeed((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Función para guardar los cambios de la semilla
  const saveSeedChanges = async () => {
    if (!editedSeed || !editedSeed.id) return;

    setIsLoading(true);
    try {
      // Actualizar el documento en Firebase
      const seedRef = doc(db, "seeds", editedSeed.id);
      await updateDoc(seedRef, {
        tipo: editedSeed.tipo,
        nombre: editedSeed.nombre,
        variedad: editedSeed.variedad,
        nombreCientifico: editedSeed.nombreCientifico,
        agnoRecoleccion: editedSeed.agnoRecoleccion,
        lugarRecoleccion: editedSeed.lugarRecoleccion,
        observaciones: editedSeed.observaciones,
        estado: editedSeed.estado,
        incompleto: false,
        // No actualizamos campos como usuario, fechaEnvio, etc.
      });

      // Actualizar el estado local
      setSeeds((prevSeeds) =>
        prevSeeds.map((seed) => (seed.id === editedSeed.id ? { ...editedSeed, incompleto: false } : seed))
      );

      setIsEditModalOpen(false);
      toast('La información de la semilla ha sido actualizada en la base de datos');
    } catch (error) {
      console.error("Error al guardar cambios en Firebase:", error);
      toast('Error al guardar cambios');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para aprobar la semilla
  const approveSeed = async (seedId: string | undefined) => {
    if (!seedId) return;
    
    setIsLoading(true);
    try {
      // Actualizar el documento en Firebase
      const seedRef = doc(db, "seeds", seedId);
      await updateDoc(seedRef, {
        estado: 'aprobada'
      });

      // Actualizar el estado local
      setSeeds((prevSeeds) => prevSeeds.map((seed) => (seed.id === seedId ? { ...seed, estado: 'aprobada' } : seed)));
      
      toast('La semilla ha sido aprobada exitosamente en la base de datos');
    } catch (error) {
      console.error("Error al aprobar semilla en Firebase:", error);
      toast('Error al aprobar semilla');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para rechazar la semilla
  const rejectSeed = async () => {
    if (!currentSeed || !currentSeed.id) return;

    setIsLoading(true);
    try {
      // Actualizar el documento en Firebase
      const seedRef = doc(db, "seeds", currentSeed.id);
      await updateDoc(seedRef, {
        estado: 'rechazada',
        razonRechazo: rejectReason
      });

      // Actualizar el estado local
      setSeeds((prevSeeds) =>
        prevSeeds.map((seed) =>
          seed.id === currentSeed.id ? { ...seed, estado: 'rechazada', razonRechazo: rejectReason } : seed
        )
      );

      setIsRejectModalOpen(false);
      toast('La semilla ha sido rechazada con éxito en la base de datos');
    } catch (error) {
      console.error("Error al rechazar semilla en Firebase:", error);
      toast('Error al rechazar semilla');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setIsRejectModalOpen(false);
  };

  // Función para renderizar la lista de semillas
  const renderSeedsList = (seeds: Seed[]) => {
    if (seeds.length === 0) {
      return (
        <div className="text-center py-12 bg-white bg-opacity-50 rounded-2xl max-w-5xl mx-auto">
          <p className="text-xl text-olive-700">No hay semillas que mostrar en esta categoría.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed) => (
          <Card
            key={seed.id}
            className="bg-olive-50/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-olive-300 cursor-pointer border border-olive-100"
            onClick={() => openViewModal(seed)}
          >
            <CardHeader className="p-4 pb-2 flex flex-row items-start gap-4">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border border-olive-200">
                <img
                  src={seed.imageUrl || "/placeholder.svg?height=64&width=64"}
                  alt={seed.nombre}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      seed.estado === "Aprobada"
                        ? "bg-olive-500"
                        : seed.estado === "Rechazada"
                          ? "bg-red-500"
                          : "bg-olive-500"
                    }
                  >
                    {seed.estado}
                  </Badge>
                  <span className="text-xs text-olive-600">{(() => {
                    const date = new Date(seed.fechaEnvio);
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}</span>
                </div>
                <h3 className="text-lg font-bold text-olive-900 mt-1">{seed.nombre}</h3>
                <p className="text-sm text-olive-700">
                  {seed.tipo} - {seed.variedad}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-sm text-olive-700 space-y-1">
                <p>
                  <span className="font-medium">Nombre científico:</span> {seed.nombreCientifico}
                </p>
                <p>
                  <span className="font-medium">Recolección:</span> {seed.agnoRecoleccion}, {seed.lugarRecoleccion}
                </p>
                <p className="line-clamp-2 text-olive-600">
                  <span className="font-medium">Observaciones:</span> {seed.observaciones}
                </p>
              </div>

              {seed.incompleto && (
                <div className="flex items-center gap-2 mt-3 text-olive-700 bg-olive-50 p-2 rounded-md border border-olive-200">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs">Información incompleta o incorrecta</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openViewModal(seed)}
                className="border-olive-300 text-olive-700 hover:bg-olive-100"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalles
              </Button>

              {seed.estado === "pendiente" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(seed)}
                    className="border-olive-300 text-olive-700 hover:bg-olive-100"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => approveSeed(seed.id)}
                    className="border-olive-300 text-olive-700 hover:bg-olive-100"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openRejectModal(seed)}
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Rechazar
                  </Button>
                </>
              )}

              {seed.estado !== "pendiente" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(seed)}
                  className="border-olive-300 text-olive-700 hover:bg-olive-100"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar Info
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-olive-50 to-olive-100 py-16">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl font-bold text-center text-olive-900 mb-16 relative">
      <span className="relative z-10">Panel de Administración de Semillas</span>
      <span className="absolute w-32 h-1 bg-olive-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
    </h1>
    
    <p className="text-xl text-olive-700 text-center max-w-3xl mx-auto mb-12">
      Gestiona las semillas enviadas por los usuarios. Aprueba, rechaza o edita la información antes de su
      publicación.
    </p>

    {/* Barra de búsqueda y filtros */}
    <div className="flex flex-col items-center mb-6">
      <div className="flex flex-wrap gap-4 items-center bg-olive-100/80 text-olive-900 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-olive-300 max-w-5xl w-full">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-500 h-4 w-4" />
          <Input
            placeholder="Buscar semillas..."
            className="pl-10 border-olive-300 focus:border-olive-500 bg-olive-100 text-olive-900 placeholder:text-olive-900/70"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-olive-600 h-4 w-4" />
          <span className="text-olive-700 text-sm">Filtrar por:</span>
          <Select defaultValue="todos" onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] bg-olive-100 border-olive-300 text-olive-600">
              <SelectValue placeholder="Tipo de semilla" />
            </SelectTrigger>
            <SelectContent className="bg-olive-100 border-olive-300">
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="fruta">Frutas</SelectItem>
              <SelectItem value="verdura">Verduras</SelectItem>
              <SelectItem value="hierba">Hierbas</SelectItem>
              <SelectItem value="flor">Flores</SelectItem>
              <SelectItem value="otro">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    {/* Pestañas */}
    <div className="max-w-5xl mx-auto bg-olive-100 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-olive-300 mb-8">
      <Tabs defaultValue="pendientes" className="w-full">
        <TabsList className="w-full bg-olive-100 border-b border-olive-200 p-0 rounded-none text-text-olive-100" >
          <TabsTrigger
            value="pendientes"
            className="flex-1 py-3 data-[state=active]:bg-olive-800 data-[state=active]:text-olive-100 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-olive-500 rounded-none"
          >
            Pendientes
            <Badge className="ml-2 bg-olive-500 hover:bg-olive-600">{seeds.filter((s) => s.estado === "pendiente").length}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="aprobadas"
            className="flex-1 py-3 data-[state=active]:bg-olive-800 data-[state=active]:text-olive-100 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-olive-500 rounded-none"
          >
            Aprobadas
            <Badge className="ml-2 bg-olive-500 hover:bg-olive-600">{seeds.filter((s) => s.estado === "aprobada").length}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="rechazadas"
            className="flex-1 py-3 data-[state=active]:bg-olive-800 data-[state=active]:text-olive-100 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-olive-500 rounded-none"
          >
            Rechazadas
            <Badge className="ml-2 bg-olive-500 hover:bg-olive-600">{seeds.filter((s) => s.estado === "rechazada").length}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="todas"    
            className="flex-1 py-3 data-[state=active]:bg-olive-800 data-[state=active]:text-olive-100 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-olive-500 rounded-none"
          >
            Todas
            <Badge className="ml-2 bg-olive-500 hover:bg-olive-600">{seeds.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700 mx-auto"></div>
            <p className="mt-4 text-olive-700">Cargando semillas...</p>
          </div>
        ) : (
          <>
            <TabsContent value="pendientes" className="p-4 bg-olive-100">
              {renderSeedsList(seeds.filter((seed) => seed.estado === "pendiente"))}
            </TabsContent>
            <TabsContent value="aprobadas" className="p-4 bg-olive-100">
              {renderSeedsList(seeds.filter((seed) => seed.estado === "aprobada"))}
            </TabsContent>
            <TabsContent value="rechazadas" className="p-4 bg-olive-100">
              {renderSeedsList(seeds.filter((seed) => seed.estado === "rechazada"))}
            </TabsContent>
            <TabsContent value="todas" className="p-4 bg-olive-100">
              {renderSeedsList(seeds)}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>

    {/* Modales */}
    {/* Modal de edición */}
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-olive-50 border border-olive-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-olive-900">Editar Semilla</DialogTitle>
        </DialogHeader>
        {editedSeed && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-olive-800">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={editedSeed.nombre}
                  onChange={handleInputChange}
                  className="border-olive-300 focus:border-olive-500 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo" className="text-olive-800">
                  Tipo
                </Label>
                <Select value={editedSeed.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                  <SelectTrigger className="border-olive-200 focus:border-olive-500 bg-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fruta">Fruta</SelectItem>
                    <SelectItem value="verdura">Verdura</SelectItem>
                    <SelectItem value="hierba">Hierba</SelectItem>
                    <SelectItem value="flor">Flor</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variedad" className="text-olive-800">
                  Variedad
                </Label>
                <Input
                  id="variedad"
                  name="variedad"
                  value={editedSeed.variedad}
                  onChange={handleInputChange}
                  className="border-olive-300 focus:border-olive-500 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombreCientifico" className="text-olive-800">
                  Nombre Científico
                </Label>
                <Input
                  id="nombreCientifico"
                  name="nombreCientifico"
                  value={editedSeed.nombreCientifico}
                  onChange={handleInputChange}
                  className="border-olive-300 focus:border-olive-500 bg-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <DialogFooter>
                <Button onClick={closeModal} className="bg-olive-500 hover:bg-olive-600 text-white">
                  Guardar cambios
                </Button>
                <Button variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  </div>
</div>

  );
}
