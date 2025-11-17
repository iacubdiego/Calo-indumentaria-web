# 🔐 Sistema de Autenticación Admin - CALO

## ✅ Sistema Implementado

Has recibido un sistema completo de autenticación para administrar los productos de CALO:

- **NextAuth.js** con autenticación por credenciales
- **Contraseñas hasheadas** con bcryptjs (seguridad industrial)
- **Panel de administración** completo con CRUD de productos
- **Protección de rutas** automática con middleware
- **Session JWT** sin necesidad de base de datos
- **Interfaz moderna** con el branding de CALO

---

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install next-auth bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Generar tu contraseña

Ejecuta el script para generar el hash de tu contraseña:

```bash
node scripts/generate-password-hash.js
```

El script te pedirá tu contraseña y te dará un hash. **Guarda este hash**, lo necesitarás en el siguiente paso.

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y configura:

```env
# Genera un secret con: openssl rand -base64 32
NEXTAUTH_SECRET=tu-secret-aqui-generalo-con-openssl

# URL de tu aplicación
NEXTAUTH_URL=http://localhost:3000

# Usuario admin
ADMIN_USERNAME=admin

# Hash generado con el script
ADMIN_PASSWORD_HASH=$2a$10$tu.hash.de.contraseña.aqui
```

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🚀 Uso

### Acceder al panel admin

1. **Desarrollo**: http://localhost:3000/admin/login
2. **Producción**: https://tu-dominio.com/admin/login

### Rutas disponibles

- `/admin/login` - Página de inicio de sesión
- `/admin` - Dashboard principal
- `/admin/productos` - Gestión de productos (CRUD)

---

## 🔧 Características del CRUD

### ✅ Lo que puedes hacer:

1. **Agregar productos nuevos**
   - Nombre, categoría, descripciones
   - Múltiples imágenes por producto
   - Características en lista

2. **Editar productos existentes**
   - Actualizar cualquier campo
   - Cambiar categoría
   - Agregar/quitar imágenes

3. **Eliminar productos**
   - Con confirmación de seguridad

4. **Filtrar por categoría**
   - Uniformes, Calzado, EPP

### 📝 Estructura de datos

Los productos se guardan con esta estructura:

```typescript
{
  id: number,
  name: string,
  images: string[],
  description: string,
  detailedDescription: string,
  features: string[],
  category: 'uniformes' | 'calzado' | 'epp'
}
```

---

## 💾 Persistencia de datos

### Actualmente (Fase 1):
Los cambios se guardan **en memoria** durante la sesión. Al recargar la página, se cargan los productos desde `/components/Products.tsx`.

### Próxima fase (Recomendado):
Para persistir los cambios necesitarás:

1. **Opción A: API Routes + JSON Local**
   ```
   /api/products/route.ts
   /data/products.json
   ```

2. **Opción B: Base de datos (Supabase, Firebase)**
   - Más robusto para producción
   - Hosting de imágenes incluido

3. **Opción C: CMS Headless (Sanity, Strapi)**
   - Lo más profesional
   - Gestión de assets automática

---

## 🔒 Seguridad

### Implementado:

✅ **Contraseñas hasheadas** - Nunca se almacenan en texto plano
✅ **JWT tokens** - Sessions seguras sin base de datos
✅ **Middleware de protección** - Rutas admin protegidas automáticamente
✅ **NEXTAUTH_SECRET** - Firmado de tokens
✅ **Variables de entorno** - Credenciales fuera del código

### Recomendaciones adicionales:

- ⚠️ Nunca subas `.env.local` a git
- 🔄 Cambia el `NEXTAUTH_SECRET` en producción
- 🔐 Usa contraseñas fuertes (min 12 caracteres)
- 📱 Considera agregar 2FA en el futuro

---

## 🌐 Deploy en Producción

### En Vercel:

1. Sube tu código a GitHub
2. Conecta el repo en Vercel
3. Agrega las variables de entorno en el dashboard de Vercel:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (tu dominio de producción)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`

### En Netlify:

Similar a Vercel, agrega las variables en Site Settings > Environment Variables

---

## 🔄 Cambiar contraseña

Para cambiar tu contraseña:

1. Genera un nuevo hash:
   ```bash
   node scripts/generate-password-hash.js
   ```

2. Actualiza `ADMIN_PASSWORD_HASH` en `.env.local`

3. Reinicia el servidor de desarrollo

---

## 🐛 Troubleshooting

### "Invalid credentials"
- Verifica que las variables de entorno estén bien configuradas
- Asegúrate de haber reiniciado el servidor después de cambiar `.env.local`
- Confirma que el hash fue generado correctamente

### "Middleware not working"
- Verifica que `middleware.ts` esté en la raíz del proyecto
- Revisa que NextAuth esté correctamente instalado

### "Session not persisting"
- Verifica que `NEXTAUTH_SECRET` esté configurado
- En producción, asegúrate que `NEXTAUTH_URL` apunte a tu dominio

---

## 📚 Próximos pasos sugeridos

1. **Conectar con API de productos**
   - Crear `/api/products/route.ts`
   - Leer/escribir en `data/products.json`

2. **Upload de imágenes**
   - Integrar Cloudinary o Uploadcare
   - Drag & drop de imágenes

3. **Roles y permisos**
   - Si necesitas más de un admin
   - Diferentes niveles de acceso

4. **Analytics**
   - Ver qué productos se consultan más
   - Estadísticas del sitio

5. **Backup automático**
   - Script para respaldar products.json
   - Versioning de cambios

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa esta documentación
2. Verifica las variables de entorno
3. Revisa los logs de la consola
4. Confirma que todas las dependencias estén instaladas

---

## 📝 Checklist de configuración

- [ ] Dependencias instaladas (`npm install`)
- [ ] Contraseña hasheada generada
- [ ] Archivo `.env.local` creado
- [ ] Variables de entorno configuradas
- [ ] Servidor reiniciado
- [ ] Acceso a `/admin/login` confirmado
- [ ] Login exitoso
- [ ] CRUD de productos funcional

---

¡Tu panel de administración está listo! 🎉

Accede en: http://localhost:3000/admin/login
