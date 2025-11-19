'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (filesToUpload.length === 0) {
      alert(`Ya tenés el máximo de ${maxImages} imágenes`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const newImages: string[] = [];
    
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        continue;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} es muy grande. Máximo 5MB`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir imagen');
        }

        const data = await response.json();
        newImages.push(data.url);
        
        setUploadProgress(((i + 1) / filesToUpload.length) * 100);
      } catch (error) {
        console.error('Error uploading:', error);
        alert(`Error al subir ${file.name}`);
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= images.length) return;
    
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300
          ${isDragging 
            ? 'border-calo-orange bg-calo-orange/10' 
            : 'border-gray-300 hover:border-calo-orange/50 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-calo-orange mx-auto"></div>
            <p className="text-calo-darkgray font-semibold">Subiendo imágenes...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-calo-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-5xl mb-3">📸</div>
            <p className="text-calo-darkgray font-semibold mb-1">
              Arrastrá las imágenes aquí
            </p>
            <p className="text-gray-500 text-sm">
              o hacé click para seleccionar
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Máximo {maxImages} imágenes, 5MB cada una
            </p>
          </>
        )}
      </div>

      {/* Preview de Imágenes */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-calo-darkgray">
            Imágenes cargadas ({images.length}/{maxImages}):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Badge de orden */}
                  <div className="absolute top-1 left-1 bg-calo-orange text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  {/* Controles */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                    {/* Mover arriba */}
                    {index > 0 && (
                      <button
                        onClick={() => handleMoveImage(index, 'up')}
                        className="bg-white text-calo-darkgray p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        title="Mover antes"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Eliminar */}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    {/* Mover abajo */}
                    {index < images.length - 1 && (
                      <button
                        onClick={() => handleMoveImage(index, 'down')}
                        className="bg-white text-calo-darkgray p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        title="Mover después"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-xs text-gray-500">
            💡 La primera imagen será la principal del producto
          </p>
        </div>
      )}
    </div>
  );
}
