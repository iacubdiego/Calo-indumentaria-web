'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductCount(data.products?.length || 0);
        setCategoryCount(data.categories?.length || 0);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };
    fetchProductCount();
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

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/Calo_-_Logos.png"
                alt="CALO Logo"
                width={120}
                height={40}
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-calo-darkgray">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Gestión de productos</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-calo-darkgray">{session.user?.name}</p>
                <p className="text-xs text-gray-600">Administrador</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Cerrar Sesión
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-calo-orange to-calo-navy text-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {session.user?.name}! 👋
            </h2>
            <p className="text-white/90">
              Gestiona los productos de CALO desde este panel de control
            </p>
          </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Total Productos</p>
              <p className="text-3xl font-bold text-calo-darkgray">{productCount}</p>
            </div>
            <div className="text-5xl">📦</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Categorías</p>
              <p className="text-3xl font-bold text-calo-darkgray">{categoryCount}</p>
            </div>
            <div className="text-5xl">🏷️</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Última Actualización</p>
              <p className="text-lg font-bold text-calo-darkgray">Hoy</p>
            </div>
            <div className="text-5xl">📅</div>
          </div>
        </motion.div>
      </div>

          {/* Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/admin/productos')}
              className="bg-white rounded-xl shadow-md p-8 text-left hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-2xl font-bold text-calo-darkgray mb-2">
                Gestionar Productos
              </h3>
              <p className="text-gray-600">
                Agregar, editar o eliminar productos del catálogo
              </p>
              <div className="mt-4 text-calo-orange font-semibold">
                Ir al catálogo →
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="bg-white rounded-xl shadow-md p-8 text-left hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold text-calo-darkgray mb-2">
                Ver Sitio Web
              </h3>
              <p className="text-gray-600">
                Visualizar cómo se ve el sitio para los visitantes
              </p>
              <div className="mt-4 text-calo-orange font-semibold">
                Abrir sitio →
              </div>
            </motion.button>
          </div>

          {/* Tips Card */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">💡 Tips de uso:</h4>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Los productos se guardan en un archivo JSON local</li>
              <li>Las imágenes deben estar en /public/images/products/</li>
              <li>Recuerda hacer backup del archivo products.json regularmente</li>
              <li>Para cambiar tu contraseña, usa el script generate-password-hash.js</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
