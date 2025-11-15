# 🚀 Guía Rápida de Deployment

## Opción 1: Vercel (MÁS FÁCIL - Recomendado)

### Paso 1: Preparar el proyecto
```bash
cd calo-landing
npm install
npm run build  # Verifica que todo compile
```

### Paso 2: Deploy con Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login (primera vez)
vercel login

# Deploy
vercel

# Cuando pregunte:
# - Set up and deploy? YES
# - Which scope? Tu cuenta
# - Link to existing project? NO
# - What's your project's name? calo-landing
# - In which directory? ./
# - Override settings? NO

# Después de unos segundos tendrás tu URL!
```

### Paso 3: Deploy a Producción
```bash
vercel --prod
```

¡Listo! Tu sitio está en: `https://calo-landing.vercel.app`

---

## Opción 2: Vercel con GitHub (AUTOMÁTICO)

1. **Push a GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/calo-landing.git
git push -u origin main
```

2. **Conectar en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Click "Deploy"

3. **Deploy automático**: Cada vez que hagas push, se despliega automáticamente!

---

## Opción 3: Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

---

## Configuración de Dominio Personalizado

### En Vercel:
1. Ve a tu proyecto
2. Settings > Domains
3. Agrega tu dominio (ej: `www.calo.com.ar`)
4. Configura los DNS según las instrucciones

### DNS Records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: calo.vercel.app
```

---

## Checklist Pre-Deploy

- [ ] Todas las dependencias instaladas
- [ ] `npm run build` funciona sin errores
- [ ] Imágenes optimizadas y subidas
- [ ] Video del hero agregado (o placeholder funciona)
- [ ] Información de contacto actualizada
- [ ] Productos actualizados
- [ ] Links de redes sociales (si aplica)
- [ ] Favicon agregado

---

## URLs Importantes

**Desarrollo Local**: http://localhost:3000
**Vercel Dashboard**: https://vercel.com/dashboard
**Netlify Dashboard**: https://app.netlify.com

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build localmente
npm run start

# Linter
npm run lint

# Deploy rápido a Vercel
vercel --prod
```

---

## Troubleshooting

### Error: Module not found
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Build falla en Vercel
- Revisa los logs en el dashboard de Vercel
- Verifica que todas las imágenes existan en /public
- Asegúrate que no hay errores de TypeScript

### Sitio carga lento
- Optimiza imágenes con TinyPNG
- Comprime el video del hero
- Revisa el peso total del proyecto

---

## Actualizaciones Futuras

Para actualizar el sitio después del deploy:

### Con Vercel CLI:
```bash
# Hacer cambios en el código
git add .
git commit -m "Actualización"
vercel --prod
```

### Con GitHub (si conectaste el repo):
```bash
git add .
git commit -m "Actualización"
git push
# Se despliega automáticamente!
```

---

¡Tu sitio estará online en menos de 5 minutos! 🚀
