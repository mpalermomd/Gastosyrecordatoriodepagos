# 🚀 Desplegar en Vercel

## Pasos para publicar tu aplicación:

### 1️⃣ Sube los nuevos archivos a GitHub

**IMPORTANTE**: Asegúrate de subir estos archivos nuevos que se acaban de crear:
- `index.html`
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `postcss.config.js`
- `vercel.json` (actualizado)
- `src/main.tsx`
- `.gitignore`

Comandos para actualizar tu repositorio:
```bash
git add .
git commit -m "Configuración completa para Vercel"
git push origin main
```

### 2️⃣ Re-despliega en Vercel

**Opción A: Vercel hará el redespliegue automáticamente** después del push a GitHub

**Opción B: Redespliegue manual:**
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en tu proyecto
3. Ve a la pestaña "Deployments"
4. Haz clic en los 3 puntos del último deployment
5. Selecciona "Redeploy"

### 3️⃣ ¡Listo! 🎉

En unos minutos tu aplicación estará publicada y tendrás una URL como:
```
https://tu-proyecto.vercel.app
```

## ✅ Características:

- ✅ **Sincronización en la nube**: Tus facturas se sincronizan entre todos tus dispositivos
- ✅ **Backend funcionando**: Usa Supabase Edge Functions que ya están configuradas
- ✅ **Gratis**: Vercel ofrece hosting gratuito
- ✅ **Actualizaciones automáticas**: Cada vez que hagas un cambio en GitHub, Vercel actualizará tu app automáticamente

## 🔧 Configuración técnica:

No necesitas configurar variables de entorno porque el proyecto ya incluye las credenciales de Supabase en `/utils/supabase/info.tsx`.

El backend está alojado en:
```
https://ezmuulhonaxtktusrnue.supabase.co/functions/v1/make-server-1b159016
```

## 📱 Compatibilidad:

- ✅ Desktop (Windows, Mac, Linux)
- ✅ Mobile (iOS, Android)
- ✅ Tablets
- ✅ Todos los navegadores modernos

---

## 🐛 Solución de problemas:

### Si la página sigue en blanco:
1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en la pestaña "Deployments"
3. Verifica que el build haya sido exitoso (debe tener un ✅)
4. Si hay errores, haz clic para ver los logs del build
5. Asegúrate de que todos los archivos nuevos estén en GitHub

### Si hay errores de build:
- Verifica que `package.json` esté en la raíz del repositorio
- Verifica que `index.html` esté en la raíz del repositorio
- Verifica que la carpeta `src/` con `main.tsx` exista

---

**¿Problemas?** Verifica que:
1. Todos los archivos nuevos estén en GitHub
2. El repositorio sea público (o que Vercel tenga acceso)
3. Vercel esté configurado para usar el framework "Vite"
4. El comando de build sea: `npm run build`
5. El directorio de output sea: `dist`