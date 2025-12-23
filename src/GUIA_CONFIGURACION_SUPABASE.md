# Guía Completa: Configurar Supabase para tu Aplicación de Gastos

## Paso 1: Crear una cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Puedes registrarte con:
   - GitHub (recomendado, más rápido)
   - Google
   - Email y contraseña

## Paso 2: Crear un nuevo proyecto

1. Una vez dentro, haz clic en **"New Project"**
2. Completa la información:
   - **Name**: Por ejemplo "control-gastos" o el nombre que prefieras
   - **Database Password**: Crea una contraseña segura (guárdala, la necesitarás)
   - **Region**: Selecciona la región más cercana a ti (por ejemplo, "South America (São Paulo)" si estás en Latinoamérica)
   - **Pricing Plan**: Selecciona **"Free"** (incluye todo lo que necesitas)
3. Haz clic en **"Create new project"**
4. Espera 1-2 minutos mientras Supabase configura tu proyecto

## Paso 3: Obtener las credenciales de tu proyecto

1. Una vez que tu proyecto esté listo, ve a **Settings** (⚙️ icono en el menú lateral izquierdo)
2. En el menú de Settings, selecciona **API**
3. Verás dos valores importantes:
   - **Project URL**: algo como `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: una clave larga que empieza con `eyJ...`
4. **¡NO CIERRES ESTA VENTANA!** Necesitarás estos valores en el siguiente paso

## Paso 4: Conectar Supabase en Figma Make

1. En Figma Make, busca el botón o modal para conectar Supabase
2. Pega los valores que copiaste:
   - **Supabase URL**: Pega el "Project URL"
   - **Anon Key**: Pega la clave "anon public"
3. Confirma la conexión

## Paso 5: Crear la tabla en Supabase

1. Vuelve a tu proyecto de Supabase
2. En el menú lateral, haz clic en **SQL Editor** (icono </>)
3. Haz clic en **"New query"**
4. En Figma Make, abre el archivo **`supabase-setup.sql`** y copia TODO su contenido
5. Pega el contenido en el editor SQL de Supabase
6. Haz clic en **"RUN"** (botón en la esquina inferior derecha)
7. Deberías ver un mensaje de éxito: ✓ Success. No rows returned

## Paso 6: Verificar que todo funciona

1. En Supabase, ve a **Table Editor** (icono de tabla en el menú lateral)
2. Deberías ver una tabla llamada **"facturas"**
3. Haz clic en ella para ver su estructura (estará vacía por ahora)
4. Vuelve a Figma Make y prueba agregar una factura
5. Refresca la página de Table Editor en Supabase - ¡deberías ver tu factura!

## Paso 7: Probar la sincronización

1. Abre tu aplicación en dos navegadores diferentes (o dos pestañas)
2. Agrega una factura en uno
3. La factura debería aparecer automáticamente en el otro (puede tardar 1-2 segundos)

---

## ¿Problemas?

### "Cannot read properties of undefined"
- Asegúrate de haber conectado Supabase en Figma Make correctamente
- Verifica que hayas pegado ambas credenciales (URL y Anon Key)

### "Row Level Security"
- El script SQL ya configura las políticas de seguridad para acceso público
- Si ves errores de permisos, verifica que el script SQL se haya ejecutado completamente

### La tabla no aparece
- Asegúrate de haber ejecutado TODO el contenido del archivo `supabase-setup.sql`
- Verifica que no haya errores en la consola SQL

### Las facturas no se sincronizan
- Verifica que la tabla se haya creado correctamente
- Revisa la consola del navegador (F12) para ver si hay errores

---

## Plan Gratuito de Supabase incluye:

✅ 500 MB de almacenamiento en base de datos  
✅ 1 GB de almacenamiento de archivos  
✅ 2 GB de ancho de banda  
✅ 50,000 usuarios activos mensuales  
✅ 500,000 llamadas a la API por mes  

**¡Más que suficiente para uso personal!**
