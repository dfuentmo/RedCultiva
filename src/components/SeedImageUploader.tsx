"use client";

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import { uploadToCloudinary, deleteImageFromCloudinary } from '@/lib/cloudinary';
import { CldUploadWidget } from 'next-cloudinary';

interface SeedImageUploaderProps {
  initialImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
}

export function SeedImageUploader({ 
  initialImageUrl, 
  onImageUploaded 
}: SeedImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Si ya hay una imagen, eliminarla primero
    if (imageUrl) {
      await handleRemoveImage();
    }
    
    await handleUploadToCloudinary(file);
  };

  const handleUploadToCloudinary = async (file: File) => {
    try {
      setIsUploading(true);
      
      // Comprimir la imagen antes de subirla
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      
      // Subir a Cloudinary
      const downloadURL = await uploadToCloudinary(compressedFile);
      setImageUrl(downloadURL);
      onImageUploaded(downloadURL);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloudinaryUpload = async (result: any) => {
    if (result.event !== "success") return;
    
    // Si ya hay una imagen, eliminarla primero
    if (imageUrl) {
      try {
        const deleted = await deleteImageFromCloudinary(imageUrl);
        if (!deleted) {
          console.error("No se pudo eliminar la imagen anterior");
        }
      } catch (err) {
        console.error("Error al eliminar la imagen anterior:", err);
      }
    }
    
    const url = result.info.secure_url;
    setImageUrl(url);
    onImageUploaded(url);
  };

  const handleRemoveImage = async () => {
    if (!imageUrl) return;
    
    try {
      setIsDeleting(true);
      
      // Eliminar la imagen de Cloudinary
      const deleted = await deleteImageFromCloudinary(imageUrl);
      
      if (!deleted) {
        console.error("No se pudo eliminar la imagen");
        return;
      }
      
      // Actualizar el estado solo si la eliminación fue exitosa
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="image-upload" className="text-sm font-medium text-olive-800 flex items-center">
          <Camera className="h-4 w-4 mr-1.5 text-olive-600" /> 
          Imagen de la semilla
        </label>
        {imageUrl && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveImage}
            disabled={isDeleting}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <X className="h-4 w-4 mr-1" />
            )}
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        )}
      </div>
      
      {imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-olive-300 shadow-sm">
          <img 
            src={imageUrl} 
            alt="Imagen de semilla" 
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-olive-900/70 to-transparent p-2 text-xs text-white">
            Haz clic en "Eliminar" para cambiar la imagen
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 w-full rounded-lg border-2 border-dashed border-olive-300 bg-olive-50/50 p-4 transition-all hover:bg-olive-50 hover:border-olive-400">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="h-10 w-10 text-olive-600 animate-spin" />
              <div className="text-sm text-olive-700 font-medium">
                Subiendo imagen...
              </div>
            </div>
          ) : (
            <>
              <ImageIcon className="h-12 w-12 text-olive-400 mb-3" />
              <p className="text-sm text-olive-700 text-center font-medium">
                Arrastra una imagen o haz clic para seleccionar
              </p>
              <p className="text-xs text-olive-500 mt-2 text-center">
                PNG, JPG o WEBP (máx. 5MB)
              </p>
              <p className="text-xs text-olive-500/80 mt-1 text-center max-w-xs">
                Las imágenes se comprimirán automáticamente para optimizar el almacenamiento
              </p>
            </>
          )}
        </div>
      )}
      
      {!imageUrl && !isUploading && (
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border-olive-300 text-olive-700 hover:bg-olive-100 hover:border-olive-400 transition-all"
            disabled={isUploading || isDeleting}
          >
            <Upload className="h-4 w-4 mr-2" /> Seleccionar
          </Button>
          
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''}
            onSuccess={handleCloudinaryUpload}
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
              maxFileSize: 5000000, // 5MB
              sources: ["local", "camera"],
              styles: {
                palette: {
                  window: "#F8FAF5",
                  windowBorder: "#90A959",
                  tabIcon: "#90A959",
                  menuIcons: "#5A6F38",
                  textDark: "#5A6F38",
                  textLight: "#FFFFFF",
                  link: "#90A959",
                  action: "#90A959",
                  inactiveTabIcon: "#6D8C54",
                  error: "#E24C4B",
                  inProgress: "#90A959",
                  complete: "#90A959",
                  sourceBg: "#F4F7F0"
                }
              }
            }}
          >
            {({ open }) => (
              <Button 
                type="button" 
                variant="default" 
                size="sm" 
                onClick={() => open()}
                className="flex-1 bg-olive-600 hover:bg-olive-700 transition-all"
                disabled={isUploading || isDeleting}
              >
                <Camera className="h-4 w-4 mr-2" /> Cloudinary
              </Button>
            )}
          </CldUploadWidget>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading || isDeleting}
        className="hidden"
      />
    </div>
  );
} 