"use client";

import { useState, useEffect, useRef } from 'react';
import { Upload, X, Loader2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase';
import imageCompression from 'browser-image-compression';

interface SeedImageUploaderProps {
  seedId?: string;
  initialImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
}

export function SeedImageUploader({ 
  seedId, 
  initialImageUrl, 
  onImageUploaded 
}: SeedImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [waitingForSeedId, setWaitingForSeedId] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efecto para manejar el caso cuando el seedId llega después de seleccionar una imagen
  useEffect(() => {
    if (waitingForSeedId && seedId && selectedFile) {
      handleUploadToFirebase(selectedFile);
      setWaitingForSeedId(false);
    }
  }, [seedId, waitingForSeedId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    if (!seedId) {
      setWaitingForSeedId(true);
      return;
    }
    
    await handleUploadToFirebase(file);
  };

  const handleUploadToFirebase = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Comprimir la imagen antes de subirla
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      
      // Subir a Firebase Storage
      const storage = getStorage(app);
      const storageRef = ref(storage, `seeds/${seedId}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error al subir la imagen:", error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          onImageUploaded(downloadURL);
          setIsUploading(false);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      );
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" /> Eliminar
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
                {waitingForSeedId ? 'Esperando ID de semilla...' : 'Subiendo imagen...'}
              </div>
              {!waitingForSeedId && (
                <div className="w-full max-w-xs bg-olive-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-olive-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
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
      
      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="hidden"
      />
      
      {!imageUrl && !isUploading && (
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          className="w-full mt-2 border-olive-300 text-olive-700 hover:bg-olive-100 hover:border-olive-400 transition-all"
          disabled={isUploading}
        >
          <Upload className="h-4 w-4 mr-2" /> Seleccionar imagen
        </Button>
      )}
    </div>
  );
} 