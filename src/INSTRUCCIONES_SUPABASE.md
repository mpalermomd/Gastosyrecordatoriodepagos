# Configuración de Supabase para Control de Gastos

## Paso 1: Crear la tabla en Supabase

1. Abre tu proyecto de Supabase en [https://supabase.com](https://supabase.com)
2. Ve a la sección **SQL Editor** en el menú lateral
3. Copia y pega todo el contenido del archivo `supabase-setup.sql` en el editor
4. Haz clic en **RUN** para ejecutar el script
5. Verifica que la tabla se haya creado correctamente yendo a **Table Editor** > **facturas**

## Paso 2: Verificar las políticas de seguridad

Las políticas RLS (Row Level Security) ya están configuradas en el script SQL para permitir acceso público. Esto significa que cualquier persona con acceso a la aplicación podrá ver y modificar las facturas.

**⚠️ IMPORTANTE:** Si deseas mayor seguridad y que cada usuario solo vea sus propias facturas, deberás:
1. Implementar autenticación de usuarios en Supabase
2. Modificar las políticas RLS para filtrar por usuario autenticado
3. Agregar una columna `user_id` a la tabla facturas

## Paso 3: Probar la aplicación

1. La aplicación ya está conectada a Supabase
2. Intenta agregar una factura desde la aplicación
3. Verifica en el **Table Editor** de Supabase que los datos se guardaron correctamente
4. Abre la aplicación en otro navegador o computadora y verás las mismas facturas

## Características implementadas

✅ **Sincronización en tiempo real**: Los cambios se reflejan automáticamente en todas las ventanas abiertas  
✅ **Acceso multi-dispositivo**: Accede a tus facturas desde cualquier computadora  
✅ **Persistencia en la nube**: Los datos se guardan de forma permanente en Supabase  
✅ **Notificaciones**: Mensajes de éxito/error para cada operación  

## Migración de datos locales (opcional)

Si tenías facturas guardadas en localStorage, puedes migrarlas manualmente:
1. Abre la consola del navegador (F12)
2. Ejecuta: `console.log(localStorage.getItem('facturas'))`
3. Copia los datos
4. Agrégalos uno por uno usando el formulario de la aplicación

O puedes crear un script de migración si tienes muchos datos.
