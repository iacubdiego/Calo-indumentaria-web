'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  images: string[];
  description: string;
  detailedDescription: string;
  features: string[];
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  products?: Product[];
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState('uniformes');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Organizar productos por categoría
        const categoriesWithProducts = data.categories.map((cat: Category) => ({
          ...cat,
          products: data.products.filter((p: Product) => p.category === cat.id)
        }));
        
        setCategories(categoriesWithProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const activeProducts = categories.find(c => c.id === activeCategory)?.products || [];

  if (isLoading) {
    return (
      <section id="productos" className="section-padding bg-white">
        <div className="container-custom flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calo-orange"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="productos" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-calo-darkgray mb-4">
            Nuestros <span className="text-calo-orange">Productos</span>
          </h2>
          <p className="text-xl text-calo-lightgray max-w-2xl mx-auto">
            Equipamiento completo para la seguridad y comodidad de tu equipo de trabajo
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-calo-orange text-white shadow-lg scale-105'
                  : 'bg-calo-beige text-calo-darkgray hover:bg-calo-brown/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center text-calo-lightgray mb-8"
          >
            {categories.find(c => c.id === activeCategory)?.description}
          </motion.p>
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {activeProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleOpenModal(product)}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-calo-beige to-calo-brown/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-calo-orange/0 to-calo-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="h-48 flex items-center justify-center mb-4 rounded-xl overflow-hidden bg-white/50">
                      {product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          📦
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-calo-darkgray mb-2 group-hover:text-calo-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-calo-lightgray text-sm">
                      {product.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-calo-orange font-semibold text-sm">
                      <span>Ver detalles</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {activeProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-calo-lightgray">No hay productos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de Producto */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-calo-orange text-white p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold pr-8">{selectedProduct.name}</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Slider de Imágenes */}
                <div className="mb-6 relative">
                  <div className="rounded-xl overflow-hidden bg-gradient-to-br from-calo-beige to-calo-brown/20 h-80 flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {selectedProduct.images[currentImageIndex] ? (
                          <img 
                            src={selectedProduct.images[currentImageIndex]} 
                            alt={`${selectedProduct.name} - Imagen ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain p-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <span className={`text-8xl ${selectedProduct.images[currentImageIndex] ? 'hidden' : ''}`}>📦</span>
                      </motion.div>
                    </AnimatePresence>

                    {/* Controles del Slider */}
                    {selectedProduct.images.length > 1 && (
                      <>
                        {/* Botón Anterior */}
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-calo-darkgray rounded-full p-3 shadow-lg transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {/* Botón Siguiente */}
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-calo-darkgray rounded-full p-3 shadow-lg transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Indicadores de Imagen */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProduct.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex 
                                  ? 'bg-calo-orange w-8' 
                                  : 'bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Contador de Imágenes */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {currentImageIndex + 1} / {selectedProduct.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {selectedProduct.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex 
                              ? 'border-calo-orange scale-105' 
                              : 'border-gray-300 hover:border-calo-orange/50'
                          }`}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-calo-beige to-calo-brown/20 flex items-center justify-center">
                            {image ? (
                              <img 
                                src={image} 
                                alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <span className={`text-2xl ${image ? 'hidden' : ''}`}>📦</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Descripción Detallada */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-calo-darkgray mb-3">Descripción</h3>
                  <p className="text-calo-lightgray leading-relaxed">
                    {selectedProduct.detailedDescription}
                  </p>
                </div>

                {/* Características */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-calo-darkgray mb-3">Características</h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <span className="text-calo-orange text-xl">✓</span>
                        <span className="text-calo-lightgray">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary flex-1"
                  >
                    Solicitar Cotización
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="btn-secondary flex-1"
                  >
                    Seguir Viendo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}