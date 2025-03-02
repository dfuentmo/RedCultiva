"use client";

import { Edit, Trash2, Sprout } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SeedImage } from "@/components/SeedImage"

type SeedCardProps = {
  seed: {
    id?: string;
    usuario: string;
    tipo: string;
    nombre: string;
    variedad: string;
    nombreCientifico: string;
    agnoRecoleccion: string;
    lugarRecoleccion: string;
    observaciones: string;
    imageUrl?: string;
  }
  onEdit: () => void
  onDelete: () => void
}

export function SeedCard({ seed, onEdit, onDelete }: SeedCardProps) {
  // Función para determinar el color del icono basado en el nombre de la semilla
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

  return (
    <Card className="bg-olive-100/80 backdrop-blur-lg text-olive-900 shadow-lg hover:shadow-xl transition-all overflow-hidden">
      {/* Imagen de la semilla */}
      <div className="w-full h-40 relative">
        <SeedImage 
          imageUrl={seed.imageUrl}
          alt={seed.nombre}
          iconColor={getSeedIconColor(seed.nombre)}
          className="h-40 w-full"
        />
        <div className="absolute top-2 right-2 bg-olive-200/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-olive-900">
          {seed.tipo}
        </div>
      </div>
      
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

