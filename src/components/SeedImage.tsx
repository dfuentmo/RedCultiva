"use client";

import { Sprout } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SeedImageProps {
  imageUrl?: string;
  alt: string;
  iconColor?: string;
  className?: string;
}

export function SeedImage({ imageUrl, alt, iconColor = "text-olive-600", className = "" }: SeedImageProps) {
  const [imageError, setImageError] = useState(false);

  // Mostrar un icono por defecto si no hay imagen o si hay un error al cargar la imagen
  if (!imageUrl || imageError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-olive-100 to-olive-200/70 backdrop-blur-sm ${className} rounded-lg transition-all duration-300`}>
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <Sprout className={`w-16 h-16 ${iconColor} mb-2`} />
          <span className="text-xs text-olive-700 font-medium">Sin imagen</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className} rounded-lg shadow-sm transition-all duration-300 hover:shadow-md group`}>
      <div className="absolute inset-0 bg-gradient-to-t from-olive-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setImageError(true)}
      />
    </div>
  );
} 