'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí puedes integrar con un servicio de email (EmailJS, Formspree, etc.)
    // Por ahora, solo mostramos confirmación
    console.log('Form data:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contacto" 
      ref={ref}
      className="py-20 bg-gradient-to-br from-calo-darkgray to-calo-navy fabric-pattern"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="text-calo-orange">Contactanos</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Estamos para ayudarte a equipar tu empresa con la mejor indumentaria laboral
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-3xl">📧</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">ventas@calo.com.ar</p>
                    <p className="text-gray-300">info@calo.com.ar</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-3xl">📱</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Teléfono / WhatsApp</h4>
                    <p className="text-gray-300">+54 11 XXXX-XXXX</p>
                    <p className="text-gray-300">+54 11 XXXX-XXXX</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-3xl">📍</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Ubicación</h4>
                    <p className="text-gray-300">Buenos Aires, Argentina</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-3xl">⏰</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Horarios</h4>
                    <p className="text-gray-300">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-gray-300">Sábados: 9:00 - 13:00</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-calo-darkgray font-semibold mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-calo-darkgray font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-calo-darkgray font-semibold mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange transition-all"
                  placeholder="+54 11 XXXX-XXXX"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-calo-darkgray font-semibold mb-2">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange transition-all"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-calo-darkgray font-semibold mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calo-orange transition-all resize-none"
                  placeholder="Contanos qué productos necesitás o cualquier consulta..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  submitted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-calo-orange hover:bg-calo-orange/90 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {submitted ? '✓ Mensaje Enviado!' : 'Enviar Consulta'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
