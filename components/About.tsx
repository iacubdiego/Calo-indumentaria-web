'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: '🏭',
      title: 'Fabricación Nacional',
      description: 'Productos fabricados con estándares de calidad industrial'
    },
    {
      icon: '💪',
      title: 'Alta Durabilidad',
      description: 'Materiales resistentes que soportan las condiciones más exigentes'
    },
    {
      icon: '💰',
      title: 'Mejor Precio',
      description: 'Calidad profesional al mejor precio del mercado'
    }
  ];

  // Variantes para animaciones más dinámicas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      clipPath: "inset(0 100% 0 0)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6
      }
    }
  };

  return (
    <section 
      id="nosotros" 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-white fabric-pattern overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Título con animación de revelado */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-calo-orange">Quiénes</span> Somos
          </h2>
          <motion.p 
            className="section-subtitle max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            En CALO nos especializamos en la fabricación y comercialización de indumentaria 
            laboral y elementos de protección personal. Nos dirigimos a una amplia gama de 
            clientes, desde PYMEs y mayoristas hasta particulares.
          </motion.p>
        </motion.div>

        {/* Cards con animación stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Ícono con animación de bounce */}
              <motion.div 
                className="text-5xl mb-4"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-calo-darkgray mb-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-calo-lightgray"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cita con animación de entrada */}
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <motion.div 
            className="bg-calo-orange/10 border-l-4 border-calo-orange p-6 rounded-lg inline-block max-w-4xl"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 40px -10px rgba(255, 87, 34, 0.3)"
            }}
          >
            <motion.p 
              className="text-xl text-calo-darkgray font-semibold italic"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              &ldquo;Ofrecemos productos de alta calidad que combinan precio y durabilidad, 
              que permitan equipar a los trabajadores de cada sector donde se forja la Industria Nacional&rdquo;
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
