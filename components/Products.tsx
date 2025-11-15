'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Datos de productos (después se pueden cargar desde un JSON o CMS)
const categories = [
  {
    id: 'uniformes',
    name: 'Uniformes Industriales',
    description: 'Pantalones, camisas y mamelucos para trabajo pesado',
    products: [
      { 
        id: 1, 
        name: 'Pantalón Cargo Reforzado', 
        images: [
          '/images/products/pantalon_clasico_marino_frente.jpg',
          '/images/products/pantalon_3_colores.jpg',
          '/images/products/pantalon_beige.jpg'
        ],
        description: 'Con bolsillos de carga y rodilleras reforzadas',
        detailedDescription: 'Pantalón de trabajo confeccionado en tela grafa de alta resistencia. Incluye 6 bolsillos estratégicamente ubicados, rodilleras reforzadas con doble costura y pretina elástica para mayor comodidad durante toda la jornada laboral.',
        features: ['Tela Grafa 100% algodón', '6 bolsillos funcionales', 'Rodilleras reforzadas', 'Costuras triple pespunte']
      },
      { 
        id: 2, 
        name: 'Camisa Grafa Manga Larga', 
        images: [
          '/images/products/pantalon_beige.jpg',
          '/images/products/camisa_frente_marino.jpg',
          '/images/products/camisas_3_colores.jpg'
        ],
        description: 'Tela resistente con protección UV',
        detailedDescription: 'Camisa de trabajo ideal para uso industrial. Confeccionada en grafa premium con protección UV integrada. Diseño ergonómico que facilita el movimiento y ventilación en zonas estratégicas.',
        features: ['Protección UV 50+', 'Respirabilidad óptima', 'Bolsillo frontal reforzado', 'Ajuste ergonómico']
      },
      // { 
      //   id: 3, 
      //   name: 'Mameluco Industrial', 
      //   images: [
      //     '/images/products/mameluco-1-front.jpg',
      //     '/images/products/mameluco-1-back.jpg',
      //     '/images/products/mameluco-1-reflective.jpg'
      //   ],
      //   description: 'Una pieza con cintas reflectivas',
      //   detailedDescription: 'Mameluco completo para trabajo pesado. Incluye cintas reflectivas 3M para alta visibilidad, cremallera frontal robusta y múltiples bolsillos. Ideal para mecánicos, electricistas y mantenimiento.',
      //   features: ['Cintas reflectivas 3M', '8 bolsillos organizadores', 'Cremallera YKK industrial', 'Cómodo y resistente']
      // },
      // { 
      //   id: 4, 
      //   name: 'Pantalón Vial Reflectivo', 
      //   images: [
      //     '/images/products/pantalon-2-front.jpg',
      //     '/images/products/pantalon-2-night.jpg',
      //     '/images/products/pantalon-2-stripes.jpg'
      //   ],
      //   description: 'Alta visibilidad con franjas 3M',
      //   detailedDescription: 'Pantalón de alta visibilidad certificado para trabajos viales y de construcción. Franjas reflectivas 3M que cumplen con normativas de seguridad. Color naranja flúo de alta durabilidad.',
      //   features: ['Certificación IRAM', 'Franjas 3M clase 2', 'Color que no se decolora', 'Resistente al lavado industrial']
      // },
    ]
  },
  {
    id: 'calzado',
    name: 'Calzado de Seguridad',
    description: 'Botas y zapatos con protección certificada',
    products: [
      { 
        id: 5, 
        name: 'Bota con Puntera de Acero', 
        images: [
          '/images/products/botin_de_seguridad_fondo.jpg',
          '/images/products/botin_suela.jpg',
          '/images/products/botin_seguridad_cerca.jpg'
        ],
        description: 'Certificada para trabajo pesado',
        detailedDescription: 'Bota de seguridad industrial con puntera de acero que soporta impactos de hasta 200 joules. Suela antideslizante y resistente a hidrocarburos. Interior acolchado para máximo confort.',
        features: ['Puntera de acero 200J', 'Suela PU bidensidad', 'Plantilla anatómica', 'Certificación IRAM 3610']
      },
      // { 
      //   id: 6, 
      //   name: 'Zapato Dieléctrico', 
      //   images: [
      //     '/images/products/zapato-1-side.jpg',
      //     '/images/products/zapato-1-sole.jpg'
      //   ],
      //   description: 'Protección eléctrica hasta 18kV',
      //   detailedDescription: 'Calzado de seguridad especial para trabajos eléctricos. Aislante eléctrico certificado hasta 18.000 voltios. Suela de goma dieléctrica sin componentes metálicos.',
      //   features: ['Aislamiento 18kV', '100% libre de metal', 'Suela dieléctrica', 'Certificado por laboratorio']
      // },
      // { 
      //   id: 7, 
      //   name: 'Bota Caña Alta Soldador', 
      //   images: [
      //     '/images/products/bota-2-side.jpg',
      //     '/images/products/bota-2-top.jpg',
      //     '/images/products/bota-2-leather.jpg'
      //   ],
      //   description: 'Resistente a chispas y calor',
      //   detailedDescription: 'Bota especial para soldadores con caña alta de 30cm. Cuero descarne resistente a chispas y salpicaduras de metal fundido. Sin cordones (slip-on) para evacuación rápida.',
      //   features: ['Cuero descarne premium', 'Sin cordones (seguridad)', 'Caña alta 30cm', 'Resistente al calor']
      // },
      // { 
      //   id: 8, 
      //   name: 'Zapato Liviano con Composite', 
      //   images: [
      //     '/images/products/zapato-2-side.jpg',
      //     '/images/products/zapato-2-composite.jpg'
      //   ],
      //   description: 'Puntera no metálica ultraliviana',
      //   detailedDescription: 'Zapato de seguridad con puntera composite (no metálica) ultraliviana. 40% más liviano que los tradicionales. Ideal para jornadas largas donde el peso es factor determinante.',
      //   features: ['Puntera composite', '40% más liviano', 'Anti-fatiga', 'Pasa detector de metales']
      // },
    ]
  },
  {
    id: 'epp',
    name: 'Elementos de Protección',
    description: 'Cascos, guantes, protectores y más',
    products: [
      { 
        id: 9, 
        name: 'Casco Industrial con Barbuquejo', 
        images: [
          '/images/products/Elementosdeseguridad.jpg',
          '/images/products/casco-1-side.jpg',
          '/images/products/casco-1-inside.jpg'
        ],
        description: 'Certificación IRAM',
        detailedDescription: 'Casco de seguridad de última generación con sistema de absorción de impactos. Arnés de 6 puntos ajustable y barbuquejo de 4 puntos. Ranuras para accesorios (protector facial, auditivo).',
        features: ['Certificación IRAM 3620', 'Arnés 6 puntos', 'Dieléctrico clase E', 'Compatible con accesorios']
      },
      // { 
      //   id: 10, 
      //   name: 'Guantes de Nitrilo', 
      //   images: [
      //     '/images/products/guantes-1-palm.jpg',
      //     '/images/products/guantes-1-grip.jpg'
      //   ],
      //   description: 'Resistencia química y corte',
      //   detailedDescription: 'Guantes de trabajo con recubrimiento de nitrilo en palma y dedos. Resistencia química a aceites, grasas y solventes. Interior de algodón que absorbe la transpiración.',
      //   features: ['Nivel de corte 3', 'Resistente a químicos', 'Interior absorbente', 'Agarre superior']
      // },
      // { 
      //   id: 11, 
      //   name: 'Gafas de Seguridad', 
      //   images: [
      //     '/images/products/gafas-1-front.jpg',
      //     '/images/products/gafas-1-side.jpg',
      //     '/images/products/gafas-1-lens.jpg'
      //   ],
      //   description: 'Antiempañante y anti-rayones',
      //   detailedDescription: 'Anteojos de protección con lentes policarbonato de alta resistencia. Tratamiento antiempañante y anti-rayones. Protección lateral integrada y puente nasal ajustable.',
      //   features: ['Lentes policarbonato', 'Anti-fog coating', 'Protección UV 99.9%', 'ANSI Z87.1 certificado']
      // },
      // { 
      //   id: 12, 
      //   name: 'Protector Auditivo', 
      //   images: [
      //     '/images/products/protector-1-side.jpg',
      //     '/images/products/protector-1-detail.jpg'
      //   ],
      //   description: 'Reducción SNR 28dB',
      //   detailedDescription: 'Protector auditivo tipo copa con reducción de ruido SNR 28dB. Almohadillas de espuma suave reemplazables. Diadema ajustable acolchada. Ideal para uso prolongado en ambientes ruidosos.',
      //   features: ['SNR 28dB', 'Almohadillas reemplazables', 'Diadema acolchada', 'Certificación CE']
      // },
    ]
  }
];

interface Product {
  id: number;
  name: string;
  images: string[];
  description: string;
  detailedDescription: string;
  features: string[];
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <section 
      id="productos" 
      ref={ref}
      className="py-20 bg-white denim-texture"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>

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
                {/* Imagen del producto o placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-calo-beige to-calo-brown/20 flex items-center justify-center">
                  {product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Si la imagen falla, mostrar placeholder
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-6xl ${product.images[0] ? 'hidden' : ''}`}>📦</span>
                </div>
                {/* Badge de cantidad de imágenes */}
                {product.images.length > 1 && (
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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

      {/* Modal de Detalles del Producto con Slider */}
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
                        {selectedProduct.images[currentImageIndex] ? (
                          <img 
                            src={selectedProduct.images[currentImageIndex]} 
                            alt={`${selectedProduct.name} - Imagen ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain p-4"
                            onError={(e) => {
                              // Si la imagen falla, mostrar placeholder
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
