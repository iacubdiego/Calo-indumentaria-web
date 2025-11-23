'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';

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
  _id?: string;
  id: string;
  name: string;
  description: string;
  emoji?: string;
}

export default function ProductsManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Cargar productos y categorías en paralelo
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        // Cargar productos y categorías al mismo tiempo
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData.products || []);
        setAvailableCategories(categoriesData.categories || []);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  if (status === 'loading' || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calo-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleNewProduct = () => {
    // Usar la primera categoría disponible como default
    const defaultCategory = availableCategories.length > 0 ? availableCategories[0].id : '';
    
    setSelectedProduct({
      id: Date.now(),
      name: '',
      images: [],
      description: '',
      detailedDescription: '',
      features: [],
      category: defaultCategory
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);

      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products: updatedProducts })
        });

        if (response.ok) {
          setProducts(updatedProducts);
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;

    // Validaciones
    if (!selectedProduct.name.trim()) {
      alert('El nombre del producto es obligatorio');
      return;
    }
    if (!selectedProduct.description.trim()) {
      alert('La descripción corta es obligatoria');
      return;
    }
    if (!selectedProduct.detailedDescription.trim()) {
      alert('La descripción detallada es obligatoria');
      return;
    }
    if (!selectedProduct.category) {
      alert('Debes seleccionar una categoría');
      return;
    }
    if (selectedProduct.images.length === 0) {
      alert('Agregá al menos una imagen del producto');
      return;
    }
  
    let updatedProducts;
    if (products.find(p => p.id === selectedProduct.id)) {
      updatedProducts = products.map(p => p.id === selectedProduct.id ? selectedProduct : p);
    } else {
      updatedProducts = [...products, selectedProduct];
    }
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
    
      if (response.ok) {
        setProducts(updatedProducts);
        setShowModal(false);
        setSelectedProduct(null);
        setIsEditing(false);
      } else {
        alert('Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el producto');
    }
  };

  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  // Función helper para obtener info de categoría
  const getCategoryInfo = (categoryId: string) => {
    return availableCategories.find(cat => cat.id === categoryId);
  };

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
        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex gap-4">
          <button
            onClick={() => router.push('/admin/categorias')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <span>🏷️</span>
            <span className="font-semibold text-calo-darkgray">Gestionar Categorías</span>
          </button>
        </div>

        {/* Filters - CORREGIDO: Usar categorías dinámicas */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-calo-darkgray mb-4">Filtrar por categoría:</h3>
          <div className="flex flex-wrap gap-3">
            {/* Botón "Todos" */}
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterCategory === 'all'
                  ? 'bg-calo-orange text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📦 Todos
            </button>
            
            {/* Categorías dinámicas desde la API */}
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-calo-orange text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.emoji || '📦'} {cat.name}
              </button>
            ))}
          </div>
          
          {/* Mostrar contador de productos */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            {filterCategory !== 'all' && ` en ${getCategoryInfo(filterCategory)?.name || 'esta categoría'}`}
          </div>
        </div>

        {/* Alert si no hay categorías */}
        {availableCategories.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-bold text-yellow-800">No hay categorías creadas</p>
                <p className="text-yellow-700">
                  Necesitas crear al menos una categoría antes de agregar productos.
                  <button
                    onClick={() => router.push('/admin/categorias')}
                    className="ml-2 underline font-semibold"
                  >
                    Ir a Gestionar Categorías →
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const categoryInfo = getCategoryInfo(product.category);
              
              return (
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
                    {product.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-calo-orange text-white text-xs px-2 py-1 rounded-full font-bold">
                        {product.images.length} fotos
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

                    {/* Category Badge - Mejorado */}
                    <div className="mb-4">
                      <span className="inline-block bg-calo-beige text-calo-darkgray text-xs px-3 py-1 rounded-full font-semibold">
                        {categoryInfo ? (
                          <>
                            {categoryInfo.emoji || '📦'} {categoryInfo.name}
                          </>
                        ) : (
                          <>❓ Categoría desconocida</>
                        )}
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
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500 mb-4">
              {filterCategory === 'all' 
                ? 'Agrega un nuevo producto para comenzar'
                : `No hay productos en ${getCategoryInfo(filterCategory)?.name || 'esta categoría'}`
              }
            </p>
            {availableCategories.length > 0 && (
              <button
                onClick={handleNewProduct}
                className="bg-calo-orange hover:bg-calo-orange/90 text-white px-6 py-3 rounded-lg font-semibold"
              >
                + Agregar Primer Producto
              </button>
            )}
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
              <div className="sticky top-0 bg-calo-orange text-white p-6 rounded-t-2xl z-10">
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

                {/* Categoría - MEJORADO */}
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
                    <option value="">Selecciona una categoría...</option>
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji || '📦'} {cat.name}
                      </option>
                    ))}
                  </select>
                  {availableCategories.length === 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      ⚠️ No hay categorías disponibles. Crea una categoría primero.
                    </p>
                  )}
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

                {/* Imágenes con Upload */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Imágenes del Producto *
                  </label>
                  <ImageUploader
                    images={selectedProduct.images}
                    onImagesChange={(images) => setSelectedProduct({
                      ...selectedProduct,
                      images
                    })}
                    maxImages={5}
                  />
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
                    disabled={availableCategories.length === 0}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors shadow-lg ${
                      availableCategories.length === 0
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-calo-orange hover:bg-calo-orange/90 text-white'
                    }`}
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
