import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Asegúrate de que la ruta sea correcta
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Seed } from "@/app/dashboard/page";

type SeedListProps = {
  seeds: Seed[];
  onEdit: (seed: Seed) => void;
  onDelete: (id: string) => void;
};

export function SeedList({ seeds, onEdit, onDelete }: SeedListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Variedad</TableHead>
          <TableHead>Año</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seeds.map((seed) => (
          <TableRow key={seed.id}>
            <TableCell className="font-medium">{seed.nombre}</TableCell>
            <TableCell>{seed.variedad}</TableCell>
            <TableCell>{seed.agnoRecoleccion}</TableCell>
            <TableCell>{seed.usuario}</TableCell>
            <TableCell className="text-right">
              <Button variant="default" size="sm" onClick={() => onEdit(seed)} className="bg-olive-800 text-olive-100 hover:bg-olive-900 mr-2">
                <Edit className="h-4 w-4 mr-1" /> Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(seed.id!)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
