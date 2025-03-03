import { SeedResponse } from '../types';

// Función para obtener las semillas
export const fetchSeeds = async (): Promise<SeedResponse[]> => {
  try {
    // Aquí deberías hacer la llamada a tu API real
    const response = await fetch('/api/seeds');
    if (!response.ok) {
      throw new Error('Error al obtener las semillas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}; 