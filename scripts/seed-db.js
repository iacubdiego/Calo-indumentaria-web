const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI no está definido en .env.local');
  process.exit(1);
}

const categories = [
  {
    id: 'uniformes',
    name: 'Uniformes Industriales',
    description: 'Pantalones, camisas y mamelucos para trabajo pesado'
  },
  {
    id: 'calzado',
    name: 'Calzado de Seguridad',
    description: 'Botas y zapatos con protección certificada'
  },
  {
    id: 'epp',
    name: 'Elementos de Protección',
    description: 'Cascos, guantes, protectores y más'
  }
];

const products = [
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
    features: ['Tela Grafa 100% algodón', '6 bolsillos funcionales', 'Rodilleras reforzadas', 'Costuras triple pespunte'],
    category: 'uniformes'
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
    features: ['Protección UV 50+', 'Respirabilidad óptima', 'Bolsillo frontal reforzado', 'Ajuste ergonómico'],
    category: 'uniformes'
  },
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
    features: ['Puntera de acero 200J', 'Suela PU bidensidad', 'Plantilla anatómica', 'Certificación IRAM 3610'],
    category: 'calzado'
  },
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
    features: ['Certificación IRAM 3620', 'Arnés 6 puntos', 'Dieléctrico clase E', 'Compatible con accesorios'],
    category: 'epp'
  }
];

async function seed() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Conectando a MongoDB...');
    await client.connect();
    console.log('✅ Conectado');
    
    const db = client.db('calo');
    
    console.log('🔄 Insertando categorías...');
    await db.collection('categories').deleteMany({});
    await db.collection('categories').insertMany(categories);
    console.log(`✅ ${categories.length} categorías insertadas`);
    
    console.log('🔄 Insertando productos...');
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(products);
    console.log(`✅ ${products.length} productos insertados`);
    
    console.log('\n🎉 Base de datos inicializada correctamente!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

seed();