'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-calo-darkgray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <div>
            <div className="mb-4 bg-white/10 p-4 rounded-lg inline-block">
              <Image
                src="/images/Calo_-_Logos.png"
                alt="CALO Logo"
                width={180}
                height={60}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-400">
              Indumentaria laboral y elementos de protección personal 
              para la Industria Nacional
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-calo-orange">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#inicio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#productos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Productos
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#nosotros"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Nosotros
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#contacto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-calo-orange">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:ventas@calo.com.ar" className="hover:text-white transition-colors">
                  ventas@calo.com.ar
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="https://wa.me/5491112345678" className="hover:text-white transition-colors">
                  +54 11 XXXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} CALO - Ropa de Trabajo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
