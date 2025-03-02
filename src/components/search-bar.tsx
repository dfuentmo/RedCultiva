import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Grid, List } from "lucide-react"

type SearchBarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedYear: string
  onYearChange: (value: string) => void
  availableYears: number[]
  sortBy: string
  onSortChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (value: "grid" | "list") => void
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedYear,
  onYearChange,
  availableYears,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center bg-olive-100/80 backdrop-blur-lg p-4 rounded-lg shadow-lg">
      <Input
        type="text"
        placeholder="Buscar semillas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-grow bg-olive-200 border-olive-300 text-olive-900 placeholder:text-olive-600/70"
      />
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[180px] bg-olive-200 border-olive-300 text-olive-900">
          <SelectValue placeholder="Filtrar por año" />
        </SelectTrigger>
        <SelectContent className="bg-olive-200 border-olive-300">
          <SelectItem value="0">Todos los años</SelectItem>
          {availableYears.map((year) => (
            <SelectItem key={year} value={year?.toString() || "default-value"}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] bg-olive-200 border-olive-300 text-olive-900">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent className="bg-olive-200 border-olive-300">
          <SelectItem value="name">Nombre</SelectItem>
          <SelectItem value="year">Año</SelectItem>
        </SelectContent>
      </Select>
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => onViewModeChange(value as "grid" | "list")}
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
  )
}

