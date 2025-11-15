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

  return (
    <section 
      id="nosotros" 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-white fabric-pattern"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-calo-orange">Quiénes</span> Somos
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            En CALO nos especializamos en la fabricación y comercialización de indumentaria 
            laboral y elementos de protección personal. Nos dirigimos a una amplia gama de 
            clientes, desde PYMEs y mayoristas hasta particulares.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-calo-darkgray mb-3">
                {feature.title}
              </h3>
              <p className="text-calo-lightgray">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-calo-orange/10 border-l-4 border-calo-orange p-6 rounded-lg inline-block">
            <p className="text-xl text-calo-darkgray font-semibold">
              "Ofrecemos productos de alta calidad que combinan precio y durabilidad, 
              que permitan equipar a los trabajadores de cada sector donde se forja la Industria Nacional"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
