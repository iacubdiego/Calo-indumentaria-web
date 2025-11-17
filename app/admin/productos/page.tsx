'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  images: string[];
  description: string;
  detailedDescription: string;
  features: string[];
  category: string;
}

export default function ProductsManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Cargar productos (esto después se conectará con el JSON)
  useEffect(() => {
    // Mock data - después esto se cargará desde el JSON
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Pantalón Cargo Reforzado',
        images: ['/images/products/pantalon_clasico_marino_frente.jpg'],
        description: 'Con bolsillos de carga y rodilleras reforzadas',
        detailedDescription: 'Pantalón de trabajo confeccionado en tela grafa...',
        features: ['Tela Grafa 100%', '6 bolsillos', 'Rodilleras reforzadas'],
        category: 'uniformes'
      },
      // Más productos...
    ];
    setProducts(mockProducts);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calo-orange"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleNewProduct = () => {
    setSelectedProduct({
      id: Date.now(),
      name: '',
      images: [],
      description: '',
      detailedDescription: '',
      features: [],
      category: 'uniformes'
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
      // Aquí se guardaría en el JSON
    }
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;

    if (products.find(p => p.id === selectedProduct.id)) {
      // Actualizar existente
      setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    } else {
      // Agregar nuevo
      setProducts([...products, selectedProduct]);
    }

    setShowModal(false);
    setSelectedProduct(null);
    setIsEditing(false);
    // Aquí se guardaría en el JSON
  };

  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-calo-orange hover:text-calo-orange/80 font-semibold"
              >
                ← Volver al Panel
              </button>
              <h1 className="text-2xl font-bold text-calo-darkgray">Gestión de Productos</h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewProduct}
              className="bg-calo-orange hover:bg-calo-orange/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              + Nuevo Producto
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-calo-darkgray mb-4">Filtrar por categoría:</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', name: 'Todos', emoji: '📦' },
              { id: 'uniformes', name: 'Uniformes', emoji: '👔' },
              { id: 'calzado', name: 'Calzado', emoji: '👞' },
              { id: 'epp', name: 'EPP', emoji: '🦺' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-calo-orange text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Imagen */}
                <div className="relative h-48 bg-gray-200">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📦
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-calo-darkgray mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-calo-beige text-calo-darkgray text-xs px-3 py-1 rounded-full font-semibold">
                      {product.category === 'uniformes' && '👔 Uniformes'}
                      {product.category === 'calzado' && '👞 Calzado'}
                      {product.category === 'epp' && '🦺 EPP'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500">
              Agrega un nuevo producto para comenzar
            </p>
          </div>
        )}
      </main>

      {/* Modal de Edición/Creación */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
            >
              <div className="sticky top-0 bg-calo-orange text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {isEditing && selectedProduct.name ? 'Editar Producto' : 'Nuevo Producto'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange"
                    placeholder="Ej: Pantalón Cargo Reforzado"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Categoría *
                  </label>
                  <select
                    value={selectedProduct.category}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange"
                  >
                    <option value="uniformes">👔 Uniformes Industriales</option>
                    <option value="calzado">👞 Calzado de Seguridad</option>
                    <option value="epp">🦺 Elementos de Protección</option>
                  </select>
                </div>

                {/* Descripción corta */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Descripción Corta *
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange"
                    placeholder="Breve descripción que aparecerá en la tarjeta"
                  />
                </div>

                {/* Descripción detallada */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Descripción Detallada *
                  </label>
                  <textarea
                    value={selectedProduct.detailedDescription}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      detailedDescription: e.target.value
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange resize-none"
                    placeholder="Descripción completa que aparecerá en el modal de detalles"
                  />
                </div>

                {/* Características */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Características (una por línea)
                  </label>
                  <textarea
                    value={selectedProduct.features.join('\n')}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      features: e.target.value.split('\n').filter(f => f.trim())
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange resize-none"
                    placeholder="Tela Grafa 100%&#10;6 bolsillos funcionales&#10;Rodilleras reforzadas"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Escribe una característica por línea
                  </p>
                </div>

                {/* Imágenes */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Rutas de Imágenes
                  </label>
                  <textarea
                    value={selectedProduct.images.join('\n')}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      images: e.target.value.split('\n').filter(img => img.trim())
                    })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange resize-none"
                    placeholder="/images/products/producto-1.jpg&#10;/images/products/producto-2.jpg"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Las imágenes deben estar en /public/images/products/
                  </p>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 bg-calo-orange hover:bg-calo-orange/90 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  >
                    💾 Guardar Producto
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
