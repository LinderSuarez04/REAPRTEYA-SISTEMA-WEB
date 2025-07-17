# Configuración de Google Maps para ReparteYA

## Descripción

El dashboard de ReparteYA ahora incluye soporte para Google Maps real además del mapa simulado. Puedes alternar entre ambos modos usando el botón "Usar Google Maps" en la esquina superior derecha del mapa.

## Características Implementadas

### 1. Mapa Simulado (Por defecto)
- Diseño visual con calles, marcadores y rutas
- Marcadores coloreados según el estado de entrega:
  - 🟢 Verde: Entregado
  - 🔵 Azul: En progreso
  - 🟡 Amarillo: Pendiente
- Leyenda explicativa
- Controles de zoom
- Rutas animadas

### 2. Google Maps Real
- Integración con Google Maps JavaScript API
- Marcadores interactivos
- Estilos personalizados
- Coordenadas reales de Lima, Perú
- Clic en marcadores para mostrar detalles

## Configuración de Google Maps API

### Paso 1: Obtener API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita la API de Google Maps JavaScript
4. Crea una API key en "Credenciales"
5. Configura las restricciones de la API key (opcional pero recomendado)

### Paso 2: Configurar en el código
1. Abre el archivo `src/pages/Dashboard.js`
2. Busca la línea:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Reemplaza `'YOUR_API_KEY_HERE'` con tu API key real:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'tu_api_key_aqui';
   ```

### Paso 3: Configurar restricciones (Recomendado)
En Google Cloud Console, configura restricciones para tu API key:
- **Restricciones de aplicación**: HTTP referrers
- **Restricciones de referencia**: 
  - `http://localhost:3000/*`
  - `http://localhost:3001/*`
  - Tu dominio de producción

## Uso

### Alternar entre modos
- Haz clic en "Usar Google Maps" para activar el mapa real
- Haz clic en "Mapa Real" para volver al mapa simulado

### Funcionalidades disponibles
1. **Mapa simulado**: Siempre disponible, no requiere configuración
2. **Google Maps**: Requiere API key, pero ofrece mapas reales

### Interacciones
- Clic en marcadores para mostrar detalles de entrega
- Zoom y navegación (solo en Google Maps)
- Selección de entregas desde la lista

## Datos de Prueba

El sistema incluye 3 entregas de prueba:
1. **Juan Pérez** - Entregado (Verde)
2. **María García** - En Progreso (Azul)  
3. **Roberto Sánchez** - Pendiente (Amarillo)

## Estructura del Código

```
src/pages/Dashboard.js
├── Estados de Google Maps
│   ├── useGoogleMaps (boolean)
│   ├── mapRef (useRef)
│   └── googleMapRef (useRef)
├── Configuración
│   ├── GOOGLE_MAPS_API_KEY
│   └── useEffect para cargar mapas
└── Componentes UI
    ├── Botón de alternancia
    ├── Mapa simulado
    └── Contenedor Google Maps
```

## Dependencias

- `@googlemaps/js-api-loader`: Para cargar Google Maps API
- `react`: Para los hooks y componentes
- `lucide-react`: Para iconos

## Solución de Problemas

### Error: "Google Maps no configurado"
- Verifica que hayas configurado tu API key
- Asegúrate de que la API key sea válida
- Verifica que tengas créditos en Google Cloud

### Error: "Loading Google Maps"
- Verifica tu conexión a internet
- Comprueba que la API de Google Maps esté habilitada
- Revisa las restricciones de tu API key

### Marcadores no aparecen
- Verifica que los datos de entregas estén cargados
- Comprueba que las coordenadas sean válidas
- Asegúrate de que el mapa esté completamente cargado

## Próximas Mejoras

- [ ] Geocodificación automática de direcciones
- [ ] Rutas optimizadas entre entregas
- [ ] Tiempo real de ubicación del repartidor
- [ ] Clustering de marcadores
- [ ] Filtros por estado de entrega

## Contacto

Para soporte técnico o preguntas sobre la implementación, consulta la documentación oficial de Google Maps JavaScript API.
