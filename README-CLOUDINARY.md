# Configuración de Cloudinary para RedCultiva

Este documento explica cómo configurar Cloudinary para la subida de imágenes en RedCultiva.

## Paso 1: Crear una cuenta en Cloudinary

1. Ve a [Cloudinary](https://cloudinary.com/) y regístrate para obtener una cuenta gratuita.
2. Una vez registrado, accede al dashboard de Cloudinary.

## Paso 2: Obtener las credenciales de API

En el dashboard de Cloudinary, encontrarás la siguiente información que necesitarás:

- **Cloud Name**: El nombre de tu nube de Cloudinary
- **API Key**: La clave de API
- **API Secret**: El secreto de API

## Paso 3: Crear un Upload Preset

1. En el dashboard de Cloudinary, ve a "Settings" > "Upload".
2. Desplázate hacia abajo hasta "Upload presets" y haz clic en "Add upload preset".
3. Configura el preset:
   - **Nombre**: Elige un nombre descriptivo (por ejemplo, "redcultiva_seeds")
   - **Signing Mode**: Selecciona "Unsigned" para permitir subidas desde el cliente
   - **Folder**: Opcionalmente, puedes especificar una carpeta donde se guardarán las imágenes (por ejemplo, "seeds")
   - Guarda la configuración

## Paso 4: Configurar las variables de entorno

Añade las siguientes variables a tu archivo `.env.local`:

```
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

## Paso 5: Configurar CORS en Cloudinary

Para evitar problemas de CORS en producción:

1. Ve a "Settings" > "Security" en el dashboard de Cloudinary.
2. En la sección "Allowed origins", añade los dominios desde los que se realizarán las subidas:
   - `http://localhost:3000` (para desarrollo)
   - `https://redcultiva.ecohuertosalduie.com` (para producción)

## Ventajas de Cloudinary sobre Firebase Storage

- **Sin problemas de CORS**: Cloudinary está diseñado para ser utilizado desde el navegador.
- **Transformaciones de imágenes**: Puedes redimensionar, recortar y optimizar imágenes al vuelo.
- **CDN global**: Las imágenes se sirven desde una red de distribución de contenido global.
- **Plan gratuito generoso**: 25GB de almacenamiento y 25GB de ancho de banda mensual.
- **Optimización automática**: Cloudinary optimiza automáticamente las imágenes para mejorar el rendimiento.

## Uso en el código

El proyecto ya está configurado para utilizar Cloudinary. Los componentes relevantes son:

- `src/lib/cloudinary.ts`: Configuración de Cloudinary
- `src/components/SeedImageUploader.tsx`: Componente para subir imágenes
- `src/components/create-edit-seed-modal.tsx`: Modal para crear/editar semillas

## Solución de problemas

Si encuentras problemas con la subida de imágenes:

1. Verifica que las variables de entorno estén correctamente configuradas.
2. Asegúrate de que el upload preset esté configurado como "Unsigned".
3. Comprueba que los dominios estén permitidos en la configuración de CORS de Cloudinary.
4. Revisa la consola del navegador para ver si hay errores específicos. 