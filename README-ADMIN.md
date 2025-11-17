# 🏭 CALO - Landing Page con Panel de Administración

Landing page profesional para CALO - Indumentria Laboral y Elementos de Protección Personal, con sistema completo de administración de productos.

## 🆕 Nuevo: Panel de Administración

✨ **Sistema de autenticación seguro** con NextAuth.js
🔐 **Login protegido** con contraseñas hasheadas
📦 **CRUD completo** de productos
🎨 **Interfaz moderna** con el branding de CALO
💾 **Sin base de datos** - Sistema basado en JWT

### Acceso rápido:
- **Panel Admin**: `/admin/login`
- **Dashboard**: `/admin`
- **Gestión de productos**: `/admin/productos`

📚 **[Ver guía completa de configuración →](./ADMIN-SETUP.md)**

---

## 🚀 Características del Sitio

### Frontend
- ✨ Animaciones fluidas con Framer Motion
- 📱 Diseño 100% responsive
- 🎨 Paleta de colores personalizada de la marca CALO
- 🎬 Hero con video de fondo
- 🧵 Texturas de tela integradas en el diseño
- 📦 3 categorías de productos con modal de detalles
- 🖼️ Carrusel de imágenes en modales
- 📧 Formulario de contacto funcional
- 💬 Integración con WhatsApp

### Backend / Admin
- 🔐 Sistema de autenticación con NextAuth.js
- 👤 Panel de administración profesional
- ➕ Crear, editar y eliminar productos
- 🏷️ Gestión de categorías
- 🖼️ Manejo de múltiples imágenes por producto
- 📊 Dashboard con estadísticas
- 🔒 Rutas protegidas con middleware

---

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn

---

## 🛠️ Instalación Completa

### 1. Clonar e instalar dependencias

```bash
# Instalar todas las dependencias
npm install

# Instalar dependencias adicionales para el admin
npm install next-auth bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Configurar el sistema de autenticación

```bash
# Generar hash de contraseña
node scripts/generate-password-hash.js

# Crear archivo de variables de entorno
cp .env.local.example .env.local

# Editar .env.local con tus credenciales
# (Ver ADMIN-SETUP.md para detalles)
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre:
- **Sitio web**: [http://localhost:3000](http://localhost:3000)
- **Admin login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🎨 Personalización

### Cambiar Productos

**Opción A: Desde el panel admin (Recomendado)**
1. Accede a `/admin/login`
2. Ve a "Gestionar Productos"
3. Usa la interfaz para agregar/editar productos

**Opción B: Editar directamente el código**
Edita el archivo `/components/Products.tsx` y modifica el array `categories`

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

### Agregar Video Hero

1. Coloca tu video en `/public/videos/hero-video.mp4`
2. El componente Hero lo detectará automáticamente

### Cambiar Información de Contacto

Edita `/components/Contact.tsx` para actualizar:
- Email
- Teléfonos
- Dirección
- Horarios

---

## 🌐 Deployment en Vercel (Recomendado)

### Con CLI:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login y deploy
vercel login
vercel --prod
```

### Con GitHub:

1. Push tu código a GitHub
2. Importa el proyecto en Vercel
3. **⚠️ IMPORTANTE**: Configura las variables de entorno:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`

📖 **[Ver guía detallada de deployment →](./DEPLOYMENT.md)**

---

## 📦 Estructura del Proyecto

```
calo-landing/
├── app/
│   ├── admin/                  # 🆕 Sistema de administración
│   │   ├── login/             # Página de login
│   │   ├── productos/         # Gestión de productos
│   │   ├── layout.tsx         # Layout con AuthProvider
│   │   └── page.tsx           # Dashboard admin
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/ # 🆕 API de NextAuth
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página home
├── components/
│   ├── AuthProvider.tsx       # 🆕 Provider de NextAuth
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Products.tsx           # Catálogo de productos
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── scripts/
│   └── generate-password-hash.js  # 🆕 Generar hash de password
├── types/
│   └── next-auth.d.ts         # 🆕 Tipos de TypeScript
├── public/
│   ├── images/                # Logos e imágenes de productos
│   └── videos/                # Video hero
├── middleware.ts              # 🆕 Protección de rutas
├── .env.local.example         # 🆕 Ejemplo de variables de entorno
├── ADMIN-SETUP.md             # 🆕 Guía de configuración admin
└── package.json

🆕 = Archivos nuevos del sistema de administración
```

---

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Ejecutar build de producción
npm run lint     # Linter de código

# Scripts adicionales para admin:
node scripts/generate-password-hash.js  # Generar hash de contraseña
```

---

## 📝 Próximos Pasos Sugeridos

### Para el sitio web:
1. ✅ Agregar video del hero
2. ✅ Subir fotos de productos reales
3. ✅ Actualizar teléfonos/emails de contacto
4. ✅ Testear en dispositivos móviles
5. ✅ Deploy en Vercel

### Para el sistema admin:
1. 🔄 Conectar CRUD con API para persistencia real
2. 📸 Implementar upload de imágenes
3. 📊 Agregar más estadísticas al dashboard
4. 👥 Sistema de múltiples usuarios (opcional)
5. 📱 Versión mobile del admin (ya responsive)

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT tokens para sesiones
- ✅ Middleware de protección de rutas
- ✅ Variables de entorno para credenciales
- ✅ .gitignore configurado correctamente

**⚠️ IMPORTANTE**: 
- Nunca subas `.env.local` a git
- Usa contraseñas fuertes
- En producción, configura todas las variables de entorno

---

## 🐛 Troubleshooting

### Error al iniciar sesión
- Verifica que `.env.local` esté configurado correctamente
- Confirma que el hash de contraseña sea válido
- Reinicia el servidor de desarrollo

### Productos no se guardan
- **Fase actual**: Los cambios son temporales (en memoria)
- **Solución**: Implementa persistencia con API + JSON o base de datos

### Build falla
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

---

## 📧 Soporte

Para consultas sobre:
- **Sitio web**: Revisar documentación en archivos .md
- **Sistema admin**: Ver [ADMIN-SETUP.md](./ADMIN-SETUP.md)
- **Deployment**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📄 Licencia

Este proyecto fue creado para CALO - Ropa de Trabajo.

---

## 🎯 Roadmap

### v1.0 - ✅ Completado
- [x] Landing page responsive
- [x] Sistema de productos con modal
- [x] Formulario de contacto
- [x] WhatsApp integration
- [x] Sistema de autenticación
- [x] Panel de administración básico
- [x] CRUD de productos

### v1.1 - 🔄 En desarrollo
- [ ] API de productos con persistencia
- [ ] Upload de imágenes
- [ ] Backup automático de datos

### v2.0 - 📅 Planificado
- [ ] Base de datos (Supabase/Firebase)
- [ ] Sistema de múltiples administradores
- [ ] Analytics y estadísticas avanzadas
- [ ] Generación automática de catálogo PDF
- [ ] Email notifications

---

Hecho con ❤️ para equipar la Industria Nacional 🏭

**Default login credentials** (recuerda cambiarlos):
- Usuario: `admin`
- Contraseña: La que configures en `.env.local`
