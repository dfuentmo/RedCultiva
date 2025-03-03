// Este archivo solo se ejecuta en el servidor
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary con las credenciales
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary }; 