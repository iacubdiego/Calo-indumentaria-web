'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Category {
  _id?: string;
  id: string;
  name: string;
  description: string;
  emoji?: string;
}

export default function CategoriesManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error cargando categorías:', error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calo-orange"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleNewCategory = () => {
    setSelectedCategory({
      id: '',
      name: '',
      description: '',
      emoji: '📦'
    });
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleDeleteCategory = async (category: Category) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/categories?id=${category._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setCategories(categories.filter(c => c._id !== category._id));
    } catch (error) {
      console.error('Error:', error);
      setError('Error al eliminar la categoría');
    }
  };

  const handleSaveCategory = async () => {
    if (!selectedCategory) return;

    // Validaciones
    if (!selectedCategory.name.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    if (!selectedCategory.id.trim()) {
      setError('El ID de la categoría es obligatorio');
      return;
    }

    // Validar formato del ID (solo letras minúsculas y guiones)
    if (!/^[a-z]+(-[a-z]+)*$/.test(selectedCategory.id)) {
      setError('El ID debe contener solo letras minúsculas y guiones (ej: uniformes-industriales)');
      return;
    }

    if (!selectedCategory.description.trim()) {
      setError('La descripción es obligatoria');
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCategory)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      // Recargar categorías
      const categoriesResponse = await fetch('/api/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.categories || []);

      setShowModal(false);
      setSelectedCategory(null);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Error al guardar la categoría');
    }
  };

  const getEmojiForCategory = (id: string) => {
    const emojiMap: { [key: string]: string } = {
      'uniformes': '👔',
      'calzado': '👞',
      'epp': '🦺',
      'herramientas': '🔧',
      'accesorios': '🎒',
    };
    return emojiMap[id] || '📦';
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
              <h1 className="text-2xl font-bold text-calo-darkgray">Gestión de Categorías</h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewCategory}
              className="bg-calo-orange hover:bg-calo-orange/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              + Nueva Categoría
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex gap-4">
          <button
            onClick={() => router.push('/admin/productos')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <span>📦</span>
            <span className="font-semibold text-calo-darkgray">Ver Productos</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-700 hover:text-red-900"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header con emoji */}
                <div className="bg-gradient-to-r from-calo-orange to-calo-navy p-6 text-white">
                  <div className="text-5xl mb-2">
                    {category.emoji || getEmojiForCategory(category.id)}
                  </div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-xs text-white/80 mt-1">ID: {category.id}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 min-h-[48px]">
                    {category.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
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
        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No hay categorías creadas
            </h3>
            <p className="text-gray-500 mb-4">
              Crea tu primera categoría para organizar los productos
            </p>
            <button
              onClick={handleNewCategory}
              className="bg-calo-orange hover:bg-calo-orange/90 text-white px-6 py-3 rounded-lg font-semibold"
            >
              + Crear Primera Categoría
            </button>
          </div>
        )}
      </main>

      {/* Modal de Edición/Creación */}
      <AnimatePresence>
        {showModal && selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl"
            >
              <div className="sticky top-0 bg-calo-orange text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory._id ? 'Editar Categoría' : 'Nueva Categoría'}
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
                {/* Emoji */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Emoji (opcional)
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.emoji || ''}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      emoji: e.target.value
                    })}
                    maxLength={2}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange text-4xl text-center"
                    placeholder="📦"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Emoji para identificar visualmente la categoría
                  </p>
                </div>

                {/* ID */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    ID de la Categoría *
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.id}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      id: e.target.value.toLowerCase().replace(/[^a-z-]/g, '')
                    })}
                    disabled={!!selectedCategory._id}
                    className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange ${
                      selectedCategory._id ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="uniformes-industriales"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCategory._id 
                      ? 'El ID no se puede cambiar una vez creada la categoría' 
                      : 'Solo letras minúsculas y guiones (ej: uniformes-industriales)'}
                  </p>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Nombre de la Categoría *
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.name}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange"
                    placeholder="Uniformes Industriales"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-calo-darkgray font-semibold mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={selectedCategory.description}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      description: e.target.value
                    })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange resize-none"
                    placeholder="Pantalones, camisas y mamelucos para trabajo pesado"
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
                    onClick={handleSaveCategory}
                    className="flex-1 bg-calo-orange hover:bg-calo-orange/90 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  >
                    💾 Guardar Categoría
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