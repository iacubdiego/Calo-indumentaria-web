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
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('uniformes');
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
        if (categoriesWithProducts.length > 0) {
          setActiveCategory(categoriesWithProducts[0].id);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const activeProducts = categories.find(cat => cat.id === activeCategory)?.products || [];
  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  if (isLoading) {
    return (
      <section id="productos" className="py-20 bg-white denim-texture">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calo-orange"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="productos" 
      ref={ref}
      className="py-20 bg-white denim-texture"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            Nuestros <span className="text-calo-orange">Productos</span>
          </h2>
          <p className="section-subtitle">
            Alta calidad y durabilidad para cada sector de la industria
          </p>
        </motion.div>

        {/* Category Tabs - Always visible */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-calo-orange text-white shadow-lg'
                  : 'bg-gray-200 text-calo-darkgray hover:bg-gray-300'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-xl text-calo-lightgray">
              {activeCategoryData?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              },
              exit: { opacity: 0 }
            }}
          >
          {activeProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-calo-beige to-calo-brown/20 flex items-center justify-center">
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-6xl ${product.images && product.images[0] ? 'hidden' : ''}`}>📦</span>
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-calo-orange text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    {product.images.length} fotos
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-calo-darkgray mb-2">
                  {product.name}
                </h3>
                <p className="text-calo-lightgray mb-4">
                  {product.description}
                </p>
                <p className="text-calo-orange font-semibold text-sm">
                  Click para ver detalles →
                </p>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {activeProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-calo-lightgray">No hay productos en esta categoría</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-calo-darkgray mb-6">
            ¿No encontrás lo que buscás? Consultanos por productos personalizados
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Solicitar Catálogo Completo
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-calo-orange to-calo-navy p-6 text-white z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                    <p className="text-white/90">{selectedProduct.description}</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
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
                        {selectedProduct.images && selectedProduct.images[currentImageIndex] ? (
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
                        <span className={`text-8xl ${selectedProduct.images && selectedProduct.images[currentImageIndex] ? 'hidden' : ''}`}>📦</span>
                      </motion.div>
                    </AnimatePresence>

                    {/* Controles del Slider */}
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-calo-darkgray rounded-full p-3 shadow-lg transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-calo-darkgray rounded-full p-3 shadow-lg transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

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

                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {currentImageIndex + 1} / {selectedProduct.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
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
                {selectedProduct.features && selectedProduct.features.length > 0 && (
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
                )}

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
