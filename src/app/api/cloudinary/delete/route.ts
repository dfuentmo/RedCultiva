import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();
    
    console.log('Recibida solicitud para eliminar imagen con publicId:', publicId);
    
    if (!publicId) {
      console.error('No se proporcionó publicId');
      return NextResponse.json(
        { error: 'Se requiere el publicId de la imagen' },
        { status: 400 }
      );
    }

    // Eliminar la imagen de Cloudinary
    console.log('Intentando eliminar imagen en Cloudinary...');
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Resultado de la eliminación:', result);

    if (result.result === 'ok') {
      console.log('Imagen eliminada exitosamente');
      return NextResponse.json({ success: true });
    } else {
      console.error('Error al eliminar la imagen:', result);
      return NextResponse.json(
        { error: 'Error al eliminar la imagen', details: result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 