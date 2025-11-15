# 🏭 CALO - Landing Page

Landing page profesional para CALO - Indumentaria Laboral y Elementos de Protección Personal.

## 🚀 Características

- ✨ Animaciones fluidas con Framer Motion
- 📱 Diseño 100% responsive
- 🎨 Paleta de colores personalizada de la marca CALO
- 🎬 Hero con video de fondo
- 🧵 Texturas de tela integradas en el diseño
- 📦 3 categorías de productos fáciles de editar
- 📧 Formulario de contacto funcional
- ⚡ Next.js 14 con App Router
- 🎯 TypeScript para mayor seguridad

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🎨 Personalización

### Cambiar Productos

Edita el archivo `/components/Products.tsx` y modifica el array `categories`:

```typescript
const categories = [
  {
    id: 'uniformes',
    name: 'Uniformes Industriales',
    description: 'Tu descripción',
    products: [
      { 
        id: 1, 
        name: 'Nombre del Producto', 
        image: '/images/products/tu-imagen.jpg', 
        description: 'Descripción' 
      },
      // Agrega más productos...
    ]
  },
  // Agrega más categorías...
];
```

### Agregar Video Hero

1. Coloca tu video en `/public/videos/hero-video.mp4`
2. El componente Hero lo detectará automáticamente

### Agregar Imágenes de Productos

1. Coloca las imágenes en `/public/images/products/`
2. Actualiza las rutas en el archivo de productos

### Cambiar Información de Contacto

Edita `/components/Contact.tsx` para actualizar:
- Email
- Teléfonos
- Dirección
- Horarios

### Cambiar Colores

Los colores de la marca están en `/tailwind.config.ts`:

```typescript
colors: {
  calo: {
    brown: '#8B7355',
    orange: '#FF5722',
    darkgray: '#424242',
    navy: '#1A237E',
    beige: '#D4C4A8',
  }
}
```

## 🌐 Deployment en Vercel (Recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com)

2. Instala Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
vercel
```

4. Sigue las instrucciones y tu sitio estará online en minutos!

### Deploy Manual

También puedes conectar tu repositorio de GitHub directamente en Vercel:

1. Push tu código a GitHub
2. Importa el proyecto en Vercel
3. Deploy automático ✅

## 📦 Estructura del Proyecto

```
calo-landing/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página home
├── components/
│   ├── Navbar.tsx            # Barra de navegación
│   ├── Hero.tsx              # Sección hero con video
│   ├── About.tsx             # Sección nosotros
│   ├── Products.tsx          # Catálogo de productos
│   ├── Contact.tsx           # Formulario de contacto
│   └── Footer.tsx            # Pie de página
├── public/
│   ├── images/               # Logos y imágenes
│   ├── videos/               # Video hero
│   └── textures/             # Texturas de tela
└── package.json
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Ejecutar build de producción
npm run lint     # Linter de código
```

## 📝 Próximos Pasos

### Mejoras Sugeridas:

1. **Integrar CMS**: Agregar Sanity o Strapi para gestionar productos desde un panel
2. **Email Service**: Conectar el formulario con EmailJS o SendGrid
3. **Analytics**: Agregar Google Analytics o Vercel Analytics
4. **SEO**: Optimizar meta tags y agregar sitemap
5. **WhatsApp**: Botón flotante de WhatsApp
6. **Catálogo PDF**: Generar catálogo descargable

## 🎥 Agregar Video

Para el video del hero, recomiendo:
- Duración: 10-30 segundos en loop
- Formato: MP4 (H.264)
- Resolución: 1920x1080 (Full HD)
- Peso: < 5MB (comprimido)

Puedes usar videos de:
- Filmación propia de tu fábrica/productos
- Stock de [Pexels](https://www.pexels.com/es-es/videos/) o [Pixabay](https://pixabay.com/es/videos/)

## 💡 Tips

- Las animaciones se desactivan automáticamente en dispositivos con `prefers-reduced-motion`
- El formulario está preparado para integrar con servicios de email
- Todas las imágenes deben estar optimizadas (usa [TinyPNG](https://tinypng.com/))

## 🐛 Solución de Problemas

**Error al instalar dependencias:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build falla:**
```bash
npm run build
# Revisa los errores de TypeScript en la consola
```

## 📧 Soporte

Para consultas sobre el proyecto: [tu-email@ejemplo.com]

## 📄 Licencia

Este proyecto fue creado para CALO - Ropa de Trabajo.

---

Hecho con ❤️ para equipar la Industria Nacional 🏭
