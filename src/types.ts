// types.ts
export interface Semilla {
  id: string;
  usuario?: string;
  cultivo: string;
  variedad: string;
  nombreCientifico: string;
  añoRecoleccion: string;
  lugarRecoleccion: string;
  observaciones: string;
  asociacionBeneficiosa: string;
  asociacionPerjudicial: string;
  imagenes: string;
}

// Tipo para la respuesta de la API de semillas
export interface SeedResponse {
  id: string;
  name: string;
  variety: string;
  year: string;
  user?: string;
  images?: string;
  location: string;
  beneficialAssociation: string;
  harmfulAssociation: string;
  scientificName: string;
  observations: string;
} 