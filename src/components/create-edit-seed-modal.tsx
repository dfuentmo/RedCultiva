import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Seed = {
  tipo: string
  nombre: string
  variedad: string
  nombreCientifico: string
  agnoRecoleccion: string
  lugarRecoleccion: string
  observaciones: string
  imagenes: string
}

type CreateEditSeedModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (seed: Seed) => void
  seedToEdit?: Seed | null
}

export function CreateEditSeedModal({ isOpen, onClose, onSave, seedToEdit }: CreateEditSeedModalProps) {
  const { data: session } = useSession()
  const usuarioDiscord = session?.user?.name || ""

  // Asegúrate de que seed.tipo se inicialice como "Semilla"
  const [seed, setSeed] = useState<Omit<Seed, "id"> | Seed>({
    tipo: "Semilla", // Semilla estará marcada por defecto
    nombre: "",
    variedad: "",
    nombreCientifico: "",
    agnoRecoleccion: "",
    lugarRecoleccion: "",
    observaciones: "",
    imagenes: "",
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
        imagenes: "",
      })
    }
  }, [seedToEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSeed((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/sheets/crud/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...seed, usuario: usuarioDiscord }), // Se añade el usuario automáticamente
      })

      if (!response.ok) {
        throw new Error("Error al crear la semilla")
      }

      const data = await response.json()
      onSave({ ...seed }) // No incluimos el ID porque lo genera la API
      onClose()
    } catch (error) {
      console.error("Error al crear la semilla:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{seedToEdit ? "Editar Semilla" : "Crear Nueva Semilla"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <div className="flex items-center space-x-4">
              <div>
                <input
                  id="tipo-semilla"
                  type="radio"
                  name="tipo"
                  value="Semilla"
                  checked={seed.tipo === "Semilla"} // Semilla estará marcado por defecto
                  onChange={handleChange}
                  className="mr-2"
                />
                <Label htmlFor="tipo-semilla">Semilla</Label>
              </div>
              <div>
                <input
                  id="tipo-esqueje"
                  type="radio"
                  name="tipo"
                  value="Esqueje"
                  checked={seed.tipo === "Esqueje"}  // Se marcará solo si tipo es "Esqueje"
                  onChange={handleChange}
                  className="mr-2"
                />
                <Label htmlFor="tipo-esqueje">Esqueje</Label>
              </div>
            </div>
          </div>

          {/* Campos adicionales */}
          <fieldset className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" name="nombre" value={seed.nombre} onChange={handleChange} required />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="variedad">Variedad</Label>
            <Input id="variedad" name="variedad" value={seed.variedad} onChange={handleChange} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="nombreCientifico">Nombre Científico</Label>
            <Input id="nombreCientifico" name="nombreCientifico" value={seed.nombreCientifico} onChange={handleChange} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="agnoRecoleccion">Año de Recolección</Label>
            <Input id="agnoRecoleccion" name="agnoRecoleccion" type="number" value={seed.agnoRecoleccion} onChange={handleChange} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="lugarRecoleccion">Lugar de Recolección</Label>
            <Input id="lugarRecoleccion" name="lugarRecoleccion" value={seed.lugarRecoleccion} onChange={handleChange} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea id="observaciones" name="observaciones" value={seed.observaciones} onChange={handleChange} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label htmlFor="imagenes">Imágenes (URL separadas por comas)</Label>
            <Input id="imagenes" name="imagenes" value={seed.imagenes} onChange={handleChange} />
          </fieldset>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-olive-800 hover:bg-olive-900 text-olive-100">
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
