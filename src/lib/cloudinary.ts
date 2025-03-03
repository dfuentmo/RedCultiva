// Configuración de Cloudinary para el cliente

// Función para subir imágenes a Cloudinary desde el cliente
export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
}

// Función para extraer el publicId de una URL de Cloudinary
export function getPublicIdFromUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    // Verificar si es una URL de Cloudinary
    if (!url.includes('cloudinary.com')) {
      return null;
    }
    
    // Formato típico: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/public_id
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    
    if (!matches || !matches[1]) {
      console.error('No se pudo extraer el publicId de la URL:', url);
      return null;
    }
    
    // Eliminar cualquier parámetro de transformación que pueda estar presente
    const publicId = matches[1].split('?')[0];
    
    console.log('PublicId extraído:', publicId); // Para debugging
    return publicId;
  } catch (error) {
    console.error('Error al extraer el publicId:', error);
    return null;
  }
}

// Función para eliminar una imagen de Cloudinary
export async function deleteImageFromCloudinary(url: string): Promise<boolean> {
  const publicId = getPublicIdFromUrl(url);
  
  if (!publicId) {
    console.error('No se pudo extraer el publicId de la URL:', url);
    return false;
  }
  
  try {
    console.log('Intentando eliminar imagen con publicId:', publicId); // Para debugging
    
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en la respuesta del servidor:', errorData);
      return false;
    }
    
    const data = await response.json();
    console.log('Respuesta del servidor:', data); // Para debugging
    return data.success === true;
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
    return false;
  }
} 