"use client";

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { SeedImageUploader } from "@/components/SeedImageUploader"
import { SeedImage } from "@/components/SeedImage"
import { Sprout, Leaf, Calendar, MapPin, BookOpen, FileText } from "lucide-react"
import { Seed } from "@/app/dashboard/page"

type CreateEditSeedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (seed: Seed) => void;
  seedToEdit?: Seed | null;
}

export function CreateEditSeedModal({ isOpen, onClose, onSave, seedToEdit }: CreateEditSeedModalProps) {
  const { data: session } = useSession()
  const usuarioDiscord = session?.user?.name || ""
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Asegúrate de que seed.estado se inicialice como "Pendiente"
  const [seed, setSeed] = useState<Seed>({
    tipo: "Semilla", // Semilla estará marcada por defecto
    nombre: "",
    variedad: "",
    nombreCientifico: "",
    agnoRecoleccion: "",
    lugarRecoleccion: "",
    observaciones: "",
    imageUrl: "",
    estado: "pendiente", // Estado por defecto "Pendiente"
  });

  useEffect(() => {
    if (seedToEdit) {
      setSeed(seedToEdit)
    } else {
      setSeed({
        tipo: "Semilla", // Asegúrate de que se mantenga como "Semilla" por defecto
        nombre: "",
        variedad: "",
        nombreCientifico: "",
        agnoRecoleccion: "",
        lugarRecoleccion: "",
        observaciones: "",
        imageUrl: "",
        estado: "pendiente", // Estado por defecto "Pendiente"
      })
    }
  }, [seedToEdit, isOpen]) // Añadido isOpen para resetear cuando se abre el modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeed((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (imageUrl: string) => {
    setSeed((prev) => ({ ...prev, imageUrl }));
    
    // Si estamos editando una semilla existente, actualizar la URL de la imagen en Firestore
    if (seedToEdit?.id) {
      updateDoc(doc(db, "seeds", seedToEdit.id), { imageUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
      if (seedToEdit?.id) {
        // Si estamos editando, actualizar el documento existente
        await updateDoc(doc(db, "seeds", seedToEdit.id), { ...seed });
        onSave({ ...seed, id: seedToEdit.id });
      } else {
        // Si estamos creando, añadir un nuevo documento
        const seedData = { ...seed, usuario: usuarioDiscord };
        const docRef = await addDoc(collection(db, "seeds"), seedData);
        
        if (!docRef.id) {
          throw new Error("Error al crear la semilla");
        }
        
        onSave({ ...seedData, id: docRef.id });
      }
      
      // Cerramos el modal después de guardar
      onClose();
    } catch (error) {
      console.error("Error al guardar la semilla:", error)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isSubmitting) onClose();
    }}>
      <DialogContent className="sm:max-w-[550px] bg-olive-50 border-olive-200 shadow-lg">
        <DialogHeader className="border-b border-olive-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-olive-900">
            {seedToEdit ? "Editar Semilla" : "Crear Nueva Semilla"}
          </DialogTitle>
          <DialogDescription className="text-olive-700">
            {seedToEdit 
              ? "Actualiza la información de tu semilla" 
              : "Comparte una nueva semilla con la comunidad"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Imagen de la semilla - Colocada al principio para mayor visibilidad */}
          <div className="bg-olive-100/50 p-4 rounded-lg border border-olive-200">
            <SeedImageUploader 
              initialImageUrl={seed.imageUrl}
              onImageUploaded={handleImageUploaded}
            />
          </div>
          
          {/* Tipo de semilla */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-olive-800 font-medium">Tipo</Label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  id="tipo-semilla"
                  type="radio"
                  name="tipo"
                  value="Semilla"
                  checked={seed.tipo === "Semilla"}
                  onChange={handleChange}
                  className="text-olive-600 focus:ring-olive-500"
                />
                <Label htmlFor="tipo-semilla" className="flex items-center text-olive-800">
                  <Sprout className="h-4 w-4 mr-1 text-olive-600" /> Semilla
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="tipo-esqueje"
                  type="radio"
                  name="tipo"
                  value="Esqueje"
                  checked={seed.tipo === "Esqueje"}
                  onChange={handleChange}
                  className="text-olive-600 focus:ring-olive-500"
                />
                <Label htmlFor="tipo-esqueje" className="flex items-center text-olive-800">
                  <Leaf className="h-4 w-4 mr-1 text-olive-600" /> Esqueje
                </Label>
              </div>
            </div>
          </div>

          {/* Campos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <fieldset className="space-y-2">
              <Label htmlFor="nombre" className="text-olive-800 font-medium flex items-center">
                <Sprout className="h-4 w-4 mr-1 text-olive-600" /> Nombre
              </Label>
              <Input 
                id="nombre" 
                name="nombre" 
                value={seed.nombre} 
                onChange={handleChange} 
                required 
                className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
                placeholder="Ej: Tomate"
              />
            </fieldset>
            
            <fieldset className="space-y-2">
              <Label htmlFor="variedad" className="text-olive-800 font-medium flex items-center">
                <Leaf className="h-4 w-4 mr-1 text-olive-600" /> Variedad
              </Label>
              <Input 
                id="variedad" 
                name="variedad" 
                value={seed.variedad} 
                onChange={handleChange} 
                className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
                placeholder="Ej: Cherry"
              />
            </fieldset>
            
            <fieldset className="space-y-2">
              <Label htmlFor="nombreCientifico" className="text-olive-800 font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-olive-600" /> Nombre Científico
              </Label>
              <Input 
                id="nombreCientifico" 
                name="nombreCientifico" 
                value={seed.nombreCientifico} 
                onChange={handleChange} 
                className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
                placeholder="Ej: Solanum lycopersicum"
              />
            </fieldset>
            
            <fieldset className="space-y-2">
              <Label htmlFor="agnoRecoleccion" className="text-olive-800 font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-olive-600" /> Año de Recolección
              </Label>
              <Input 
                id="agnoRecoleccion" 
                name="agnoRecoleccion" 
                type="number" 
                value={seed.agnoRecoleccion} 
                onChange={handleChange} 
                className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
                placeholder="Ej: 2023"
              />
            </fieldset>
          </div>
          
          <fieldset className="space-y-2">
            <Label htmlFor="lugarRecoleccion" className="text-olive-800 font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-olive-600" /> Lugar de Recolección
            </Label>
            <Input 
              id="lugarRecoleccion" 
              name="lugarRecoleccion" 
              value={seed.lugarRecoleccion} 
              onChange={handleChange} 
              className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
              placeholder="Ej: Huerto comunitario de Madrid"
            />
          </fieldset>
          
          <fieldset className="space-y-2">
            <Label htmlFor="observaciones" className="text-olive-800 font-medium flex items-center">
              <FileText className="h-4 w-4 mr-1 text-olive-600" /> Observaciones
            </Label>
            <Textarea 
              id="observaciones" 
              name="observaciones" 
              value={seed.observaciones} 
              onChange={handleChange} 
              className="border-olive-300 focus:border-olive-500 focus:ring-olive-500 bg-white"
              placeholder="Escribe cualquier detalle extra"
            />
          </fieldset>

          <div className="flex justify-between mt-4">
            <Button 
              type="button" 
              onClick={onClose} 
              variant="outline" 
              disabled={isSubmitting}
              className="text-olive-700 border-olive-300 hover:bg-olive-100">
              Cancelar
            </Button>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="text-white bg-olive-600 hover:bg-olive-700">
              {isSubmitting ? "Guardando..." : "Guardar Semilla"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
