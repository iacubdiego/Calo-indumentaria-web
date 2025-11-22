# 🏭 CALO - Sistema Completo de Gestión

Landing page profesional con **panel de administración completo** para CALO - Indumentaria Laboral y Elementos de Protección Personal.

## 🆕 Nuevo: Sistema de Gestión de Categorías

El panel de administración ahora incluye gestión completa de categorías de productos:

- ✅ Crear, editar y eliminar categorías
- ✅ Validación de integridad (no se pueden eliminar categorías con productos)
- ✅ Interfaz visual con emojis
- ✅ Integración automática con productos
- ✅ Todo almacenado en MongoDB

---

## 🚀 Características Completas

### Frontend (Sitio Web)
- ✨ Animaciones fluidas con Framer Motion
- 📱 Diseño 100% responsive
- 🎨 Paleta de colores personalizada de la marca CALO
- 🎬 Hero con video de fondo
- 🧵 Texturas de tela integradas en el diseño
- 📦 Categorías dinámicas de productos con modal de detalles
- 🖼️ Carrusel de imágenes en modales
- 📧 Formulario de contacto funcional
- 💬 Integración con WhatsApp

### Backend / Sistema de Administración
- 🔐 Sistema de autenticación seguro con NextAuth.js
- 👤 Panel de administración profesional
- 🏷️ **NUEVO: CRUD completo de categorías**
- ➕ CRUD completo de productos
- 🖼️ Upload de imágenes con Cloudinary
- 📊 Dashboard con estadísticas
- 🔒 Rutas protegidas con middleware
- 💾 Base de datos MongoDB Atlas

---

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Cuenta de MongoDB Atlas (gratuita)
- Cuenta de Cloudinary (gratuita, opcional)

---

## 🛠️ Instalación Completa

### 1. Clonar e instalar dependencias

```bash
# Instalar todas las dependencias
npm install
```

### 2. Configurar MongoDB

```bash
# Crear archivo .env.local
cp .env.local.example .env.local
```

Editar `.env.local` y agregar tu URI de MongoDB:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/calo?retryWrites=true&w=majority
```

### 3. Inicializar la base de datos

```bash
# Cargar datos iniciales (categorías y productos de ejemplo)
npm run seed
```

### 4. Configurar autenticación

```bash
# Generar hash de contraseña
node scripts/generate-password-hash.js
```

Agregar las variables al `.env.local`:
```env
NEXTAUTH_SECRET=tu-secret-generado-con-openssl
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=el-hash-generado
```

### 5. (Opcional) Configurar Cloudinary

Para subir imágenes desde el admin:
```env
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=tu-api-secret
```

Ver `CLOUDINARY-SETUP.md` para más detalles.

### 6. Ejecutar en desarrollo

```bash
npm run dev
```

Accede a:
- **Sitio web**: http://localhost:3000
- **Admin login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **Categorías**: http://localhost:3000/admin/categorias
- **Productos**: http://localhost:3000/admin/productos

---

## 🎯 Guías de Uso

### Para Administradores

1. **Gestión de Categorías**: Ver `CATEGORIAS-SETUP.md`
   - Crear y organizar categorías
   - Editar nombres y descripciones
   - Eliminar categorías vacías

2. **Gestión de Productos**: Ver `README-ADMIN.md`
   - Agregar productos con imágenes
   - Asignar a categorías
   - Editar y eliminar

3. **Configuración Inicial**: Ver `ADMIN-SETUP.md`
   - Cambiar contraseñas
   - Configurar autenticación

### Para Desarrolladores

1. **Integración de Categorías**: Ver `INTEGRACION-CATEGORIAS.md`
   - Snippets de código
   - Cambios necesarios
   - Testing

2. **Upload de Imágenes**: Ver `CLOUDINARY-SETUP.md`
   - Configurar Cloudinary
   - API de upload

3. **Deployment**: Ver `DEPLOYMENT.md`
   - Deploy en Vercel
   - Variables de entorno

---

## 📦 Estructura del Proyecto (Actualizada)

```
calo-landing/
├── app/
│   ├── admin/
│   │   ├── categorias/        # 🆕 Gestión de categorías
│   │   │   └── page.tsx
│   │   ├── productos/          # Gestión de productos
│   │   │   └── page.tsx
│   │   ├── login/             # Login admin
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Layout con AuthProvider
│   │   └── page.tsx           # Dashboard admin
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/ # API de NextAuth
│   │   │       └── route.ts
│   │   ├── categories/        # 🆕 API de categorías
│   │   │   └── route.ts
│   │   ├── products/          # API de productos
│   │   │   └── route.ts
│   │   └── upload/            # API de upload imágenes
│   │       └── route.ts
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página home
├── components/
│   ├── AuthProvider.tsx       # Provider de NextAuth
│   ├── ImageUploader.tsx      # Componente de carga imágenes
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Products.tsx           # Catálogo (usa categorías dinámicas)
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── auth.ts                # Configuración de NextAuth
│   └── mongodb.ts             # Cliente de MongoDB
├── scripts/
│   ├── generate-password-hash.js
│   ├── seed-db.js             # 🆕 Seed con categorías
│   └── verify-categories.js   # 🆕 Verificar instalación
├── types/
│   └── next-auth.d.ts
├── public/
│   ├── images/
│   └── videos/
├── middleware.ts              # Protección de rutas
├── .env.local.example
├── CATEGORIAS-SETUP.md        # 🆕 Guía de categorías
├── INTEGRACION-CATEGORIAS.md  # 🆕 Guía de integración
├── SNIPPETS-CATEGORIAS.tsx    # 🆕 Snippets de código
├── CLOUDINARY-SETUP.md
├── ADMIN-SETUP.md
├── DEPLOYMENT.md
└── package.json

🆕 = Archivos nuevos del sistema de categorías
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build de producción
npm run start

# Linter
npm run lint

# Inicializar base de datos
npm run seed

# Verificar sistema de categorías
node scripts/verify-categories.js
```

---

## 🌐 Deployment en Vercel

### Con CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Variables de Entorno en Vercel:

Configurar en el dashboard de Vercel:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (tu dominio de producción)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `CLOUDINARY_CLOUD_NAME` (opcional)
- `CLOUDINARY_API_KEY` (opcional)
- `CLOUDINARY_API_SECRET` (opcional)

📖 **Ver guía completa**: `DEPLOYMENT.md`

---

## 🔍 Verificación de Instalación

Ejecutar script de verificación:

```bash
node scripts/verify-categories.js
```

Este script verifica:
- ✅ Conexión a MongoDB
- ✅ Existencia de categorías
- ✅ Integridad de datos
- ✅ Archivos del sistema
- ✅ Estadísticas

---

## 📝 Flujo de Trabajo Recomendado

### Setup Inicial:

```
1. Instalar dependencias → npm install
2. Configurar .env.local
3. Seed base de datos → npm run seed
4. Verificar instalación → node scripts/verify-categories.js
5. Iniciar desarrollo → npm run dev
```

### Agregar Contenido:

```
1. Crear/verificar categorías → /admin/categorias
2. Subir imágenes (Cloudinary o local)
3. Crear productos → /admin/productos
4. Verificar en sitio web → /
```

### Deploy:

```
1. Build local → npm run build
2. Verificar que funciona → npm run start
3. Deploy en Vercel → vercel --prod
4. Configurar variables de entorno
5. Verificar producción
```

---

## 🎨 Personalización

### Colores de la Marca

Editar `tailwind.config.ts`:

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

### Categorías Iniciales

Editar `scripts/seed-db.js` y agregar tus categorías:

```javascript
const categories = [
  {
    id: 'tu-categoria',
    name: 'Tu Categoría',
    description: 'Descripción',
    emoji: '🔧'
  },
  // ... más categorías
];
```

---

## 🐛 Troubleshooting

### No puedo acceder al admin

```bash
# Regenerar contraseña
node scripts/generate-password-hash.js
# Actualizar .env.local con el nuevo hash
# Reiniciar servidor
```

### Categorías no aparecen

```bash
# Verificar MongoDB
node scripts/verify-categories.js
# Re-ejecutar seed
npm run seed
```

### Productos huérfanos

```bash
# Verificar integridad
node scripts/verify-categories.js
# Reasignar desde /admin/productos
```

### Build falla

```bash
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

---

## 📊 Roadmap

### v1.0 - ✅ Completado
- [x] Landing page responsive
- [x] Sistema de productos con modal
- [x] Formulario de contacto
- [x] WhatsApp integration
- [x] Sistema de autenticación
- [x] Panel de administración básico
- [x] CRUD de productos
- [x] CRUD de categorías
- [x] Upload de imágenes

### v1.1 - 🔄 En desarrollo
- [ ] API de productos con cache
- [ ] Sistema de búsqueda
- [ ] Filtros avanzados

### v2.0 - 📅 Planificado
- [ ] Sistema de múltiples administradores
- [ ] Analytics y estadísticas avanzadas
- [ ] Generación automática de catálogo PDF
- [ ] Email notifications
- [ ] Sistema de inventario

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT tokens para sesiones
- ✅ Middleware de protección de rutas
- ✅ Variables de entorno para credenciales
- ✅ .gitignore configurado correctamente
- ✅ Validación de integridad de datos

**⚠️ IMPORTANTE**: 
- Nunca subas `.env.local` a git
- Usa contraseñas fuertes
- En producción, configura todas las variables de entorno
- Cambia el NEXTAUTH_SECRET en producción

---

## 📧 Soporte

### Documentación:
- **Categorías**: `CATEGORIAS-SETUP.md`
- **Integración**: `INTEGRACION-CATEGORIAS.md`
- **Admin**: `ADMIN-SETUP.md`
- **Deployment**: `DEPLOYMENT.md`
- **Cloudinary**: `CLOUDINARY-SETUP.md`

### Scripts de Ayuda:
- Verificación: `node scripts/verify-categories.js`
- Password: `node scripts/generate-password-hash.js`
- Seed: `npm run seed`

---

## 📄 Licencia

Este proyecto fue creado para CALO - Ropa de Trabajo.

---

Hecho con ❤️ para equipar la Industria Nacional 🏭

**Default login credentials** (recuerda cambiarlos):
- Usuario: `admin`
- Contraseña: La que configures en `.env.local`

---

## 🎉 ¡Empezar!

```bash
# 1. Instalar
npm install

# 2. Configurar
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# 3. Inicializar
npm run seed

# 4. Verificar
node scripts/verify-categories.js

# 5. Ejecutar
npm run dev
```

¡Ya estás listo para administrar CALO! 🚀