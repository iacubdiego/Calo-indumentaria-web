# 📸 Configuración de Cloudinary para Upload de Imágenes

## Paso 1: Crear cuenta en Cloudinary

1. Ve a [cloudinary.com](https://cloudinary.com/) y crea una cuenta gratuita
2. El plan gratuito incluye:
   - 25GB de almacenamiento
   - 25GB de ancho de banda mensual
   - Suficiente para ~5,000 imágenes de productos

## Paso 2: Obtener credenciales

1. Una vez logueado, ve al **Dashboard**
2. Encontrarás tus credenciales:
   - **Cloud Name**: tu-cloud-name
   - **API Key**: 123456789012345
   - **API Secret**: abcdefghijklmnopqrstuvwxyz

## Paso 3: Configurar variables de entorno

Agrega estas variables a tu archivo `.env.local`:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=tu-api-secret-aqui
```

## Paso 4: Instalar dependencia

```bash
npm install cloudinary
```

## Paso 5: Configurar en Vercel (Producción)

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las 3 variables de Cloudinary

---

## Estructura de archivos creados

```
app/
  api/
    upload/
      route.ts          # API de upload
components/
  ImageUploader.tsx     # Componente de carga
app/
  admin/
    productos/
      page.tsx          # Página actualizada
```

---

## Cómo funciona

1. **El admin arrastra imágenes** al formulario
2. **Se suben a Cloudinary** automáticamente
3. **Se obtiene la URL** permanente
4. **Se guarda en el producto** junto con los demás datos

---

## Características del sistema

- ✅ Drag & drop de imágenes
- ✅ Preview instantáneo
- ✅ Reordenar imágenes (la primera es la principal)
- ✅ Eliminar imágenes
- ✅ Validación de tipo y tamaño (máx 5MB)
- ✅ Optimización automática (Cloudinary reduce el peso)
- ✅ Límite de 5 imágenes por producto

---

## Límites del plan gratuito

| Recurso | Límite |
|---------|--------|
| Almacenamiento | 25 GB |
| Bandwidth | 25 GB/mes |
| Transformaciones | 25,000/mes |

Para CALO esto es más que suficiente. Si en algún momento necesitas más, Cloudinary tiene planes desde $99/mes.

---

## Troubleshooting

### Error "Invalid API Key"
- Verifica que las credenciales en `.env.local` sean correctas
- Reinicia el servidor de desarrollo

### Error "File too large"
- El límite está en 5MB por imagen
- Comprime las imágenes antes de subir

### Imágenes no se ven
- Verifica que la URL se guardó correctamente
- Revisa la consola del navegador por errores

---

## Seguridad

- ❌ Nunca expongas el API Secret en el frontend
- ✅ El upload se hace desde el servidor (API route)
- ✅ Las credenciales están en variables de entorno

---

## Migración de imágenes existentes

Si tenés imágenes en `/public/images/products/`, podés:

1. **Opción A**: Subirlas manualmente a Cloudinary y actualizar las URLs
2. **Opción B**: Dejarlas donde están (seguirán funcionando)
3. **Opción C**: Re-crear los productos desde el admin con las nuevas imágenes

---

¡Listo! Ahora podés subir imágenes directamente desde el panel de administración 🎉
