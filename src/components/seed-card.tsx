import { Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type SeedCardProps = {
  seed: {
    usuario: string;
    tipo: string;
    nombre: string;
    variedad: string;
    nombreCientifico: string;
    agnoRecoleccion: string;
    lugarRecoleccion: string;
    observaciones: string;
    imagenes: string;
  }
  onEdit: () => void
  onDelete: () => void
}

export function SeedCard({ seed, onEdit, onDelete }: SeedCardProps) {
  return (
    <Card className="bg-olive-100/80 backdrop-blur-lg text-olive-900 shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          {seed.nombre}
          <span className="text-sm font-normal text-olive-600">{seed.agnoRecoleccion}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-olive-900/90 mb-1">
          <span className="font-semibold">Variedad:</span> {seed.variedad}
        </p>
        <p className="text-olive-900/90">
          <span className="font-semibold">Usuario:</span> {seed.usuario}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button 
          variant="default" 
          size="sm" 
          onClick={onEdit} 
          className="bg-olive-800 text-olive-100 hover:bg-olive-900"
        >
          <Edit className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDelete} 
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}

