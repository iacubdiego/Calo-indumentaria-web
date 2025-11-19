'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Image
            src="/images/Calo_-_Logos.png"
            alt="CALO Logo"
            width={scrolled ? 120 : 150}
            height={scrolled ? 40 : 50}
            className="transition-all duration-300"
          />
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {['Inicio', 'Productos', 'Nosotros'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`font-semibold transition-colors ${
                scrolled ? 'text-calo-darkgray' : 'text-white'
              } hover:text-calo-orange`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contacto')}
          className="btn-primary"
        >
          Contactar
        </motion.button>
      </div>
    </motion.nav>
  );
}
