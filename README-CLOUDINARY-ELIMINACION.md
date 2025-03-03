# Eliminación de Imágenes en Cloudinary

Este documento explica cómo se ha implementado la eliminación de imágenes en Cloudinary en la aplicación RedCultiva.

## Funcionalidades Implementadas

Se han implementado dos funcionalidades principales:

1. **Eliminación de imágenes al borrar una semilla**: Cuando un usuario elimina una semilla, la imagen asociada también se elimina de Cloudinary.
2. **Eliminación de imágenes al cambiar la imagen de una semilla**: Cuando un usuario cambia la imagen de una semilla, la imagen anterior se elimina de Cloudinary.

## Componentes Modificados

### 1. API para Eliminar Imágenes (`src/app/api/cloudinary/delete/route.ts`)

Se ha creado un endpoint de API que utiliza la API de Cloudinary para eliminar imágenes:

```typescript
import { NextResponse } from 'next/server';
import { cloudinary } from '@/app/api/cloudinary-config';

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();
    
    if (!publicId) {
      return NextResponse.json(
        { error: 'Se requiere el publicId de la imagen' },
        { status: 400 }
      );
    }

    // Eliminar la imagen de Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Error al eliminar la imagen', details: result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
```

### 2. Utilidades de Cloudinary (`src/lib/cloudinary.ts`)

Se han añadido funciones para extraer el publicId de una URL de Cloudinary y para eliminar imágenes:

```typescript
// Función para extraer el publicId de una URL de Cloudinary
export function getPublicIdFromUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    // Verificar si es una URL de Cloudinary
    if (!url.includes('cloudinary.com')) {
      return null;
    }
    
    // Formato típico: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    
    // Si hay una carpeta, incluirla en el publicId
    let folderPath = '';
    if (urlParts[urlParts.length - 2] !== 'upload') {
      // Encontrar el índice de 'upload' en la URL
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      if (uploadIndex !== -1 && uploadIndex < urlParts.length - 2) {
        // Extraer la ruta de la carpeta
        folderPath = urlParts.slice(uploadIndex + 1, urlParts.length - 1).join('/') + '/';
      }
    }
    
    return folderPath + fileName;
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
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
    return false;
  }
}
```

### 3. Componente SeedImageUploader (`src/components/SeedImageUploader.tsx`)

Se ha modificado el componente para eliminar la imagen anterior cuando se sube una nueva:

```typescript
const handleRemoveImage = async () => {
  if (!imageUrl) return;
  
  try {
    setIsDeleting(true);
    
    // Eliminar la imagen de Cloudinary
    await deleteImageFromCloudinary(imageUrl);
    
    // Actualizar el estado
    setImageUrl(null);
    onImageUploaded('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  } finally {
    setIsDeleting(false);
  }
};
```

### 4. Componente Dashboard (`src/app/dashboard/page.tsx`)

Se ha modificado la función `handleDeleteSeed` para eliminar la imagen asociada a una semilla cuando esta se elimina:

```typescript
const handleDeleteSeed = async (id: string) => {
  try {
    // Primero, obtener la semilla para acceder a su URL de imagen
    const seedToDelete = seeds.find(seed => seed.id === id);
    
    if (seedToDelete?.imageUrl) {
      // Eliminar la imagen de Cloudinary
      await deleteImageFromCloudinary(seedToDelete.imageUrl);
    }
    
    // Luego eliminar el documento de Firestore
    const seedDocRef = doc(db, "seeds", id);
    await deleteDoc(seedDocRef);

    // Actualizar el estado local
    setSeeds((prev) => prev.filter((seed) => seed.id !== id));
  } catch (error) {
    console.error("Error al eliminar la semilla desde Firestore", error);
  }
};
```

## Consideraciones Importantes

1. **Extracción del publicId**: La función `getPublicIdFromUrl` extrae el publicId de una URL de Cloudinary, que es necesario para eliminar la imagen.
2. **Manejo de errores**: Se han implementado bloques try-catch para manejar posibles errores durante la eliminación de imágenes.
3. **Feedback visual**: Se ha añadido un estado de carga (`isDeleting`) para proporcionar feedback visual al usuario durante la eliminación de imágenes.

## Pruebas

Para probar la funcionalidad de eliminación de imágenes:

1. Crea una nueva semilla con una imagen.
2. Elimina la semilla y verifica en el panel de control de Cloudinary que la imagen también se ha eliminado.
3. Edita una semilla existente, cambia su imagen y verifica que la imagen anterior se ha eliminado de Cloudinary.

## Solución de Problemas

Si las imágenes no se eliminan correctamente:

1. Verifica que el publicId extraído es correcto. Puedes añadir un `console.log(publicId)` en la función `deleteImageFromCloudinary`.
2. Asegúrate de que las credenciales de Cloudinary están correctamente configuradas.
3. Revisa la consola del navegador y los logs del servidor para identificar posibles errores. 