# ⚡ INICIO RÁPIDO - CALO Landing Page

## 🎯 Para empezar EN 3 PASOS:

### 1️⃣ Instalar dependencias
```bash
cd calo-landing
npm install
```

### 2️⃣ Ejecutar en desarrollo
```bash
npm run dev
```

### 3️⃣ Abrir en navegador
Abre: http://localhost:3000

---

## 📝 Qué hacer ahora:

### ✅ Agregar tu video del hero
1. Coloca tu video en `/public/videos/hero-video.mp4`
2. Recarga la página y se verá automáticamente

### ✅ Agregar imágenes de productos
1. Coloca las imágenes en `/public/images/products/`
2. Edita `/components/Products.tsx` y actualiza las rutas de imágenes

### ✅ Actualizar información de contacto
1. Edita `/components/Contact.tsx`
2. Cambia email, teléfono, dirección

### ✅ Personalizar productos
1. Abre `/components/Products.tsx`
2. Modifica el array `categories` con tus productos reales

---

## 🚀 Para poner en producción:

```bash
# Opción más fácil - Vercel
npm i -g vercel
vercel login
vercel --prod
```

**Ver guía completa**: Lee `DEPLOYMENT.md`

---

## 📁 Archivos importantes:

- `/app/page.tsx` - Página principal
- `/components/` - Todos los componentes
- `/public/images/` - Logos e imágenes
- `/public/videos/` - Video del hero
- `tailwind.config.ts` - Colores de la marca

---

## 🎨 Colores de CALO:

```css
Marrón: #8B7355
Naranja: #FF5722
Gris Oscuro: #424242
Azul Marino: #1A237E
Beige: #D4C4A8
```

---

## 💡 Tips:

1. **Video del hero**: Usa un video de 10-30 segundos, formato MP4, peso < 5MB
2. **Imágenes**: Optimiza todas las imágenes antes de subirlas (usa TinyPNG)
3. **Productos**: Empieza con 4-6 productos por categoría, después agrega más
4. **Contacto**: El formulario está listo, solo falta conectar un servicio de email

---

## 🆘 ¿Problemas?

**No carga en localhost:3000**
```bash
# Cierra el servidor (Ctrl+C) y vuelve a ejecutar:
npm run dev
```

**Errores al instalar**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📧 Próximos pasos sugeridos:

1. ✅ Agregar video del hero
2. ✅ Subir fotos de productos
3. ✅ Actualizar teléfonos/emails
4. ✅ Testear en móvil (usa tu IP local)
5. ✅ Deploy en Vercel

---

¡Ya está casi todo listo! Solo necesitas personalizar el contenido. 🎉
