import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Clock,
  MapPin,
  Search,
  Filter,
  Eye,
  Phone,
  X,
  ChevronRight,
  Camera,
  Navigation,
  Check
} from 'lucide-react';

const Dashboard = () => {
  // Estado para los indicadores, datos y vista activa
  const [keyIndicators, setKeyIndicators] = useState([]);
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [activeView, setActiveView] = useState('administrador');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [activeTab, setActiveTab] = useState('detalles');
  const [deliveryStep, setDeliveryStep] = useState('en_camino'); // en_camino, llegado, completado
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

  // CONFIGURACIÓN DE GOOGLE MAPS
  const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE'; // Reemplazar con tu API key real

  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Para usar Google Maps real, configura tu API key en GOOGLE_MAPS_API_KEY');
        return;
      }

      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"]
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          // Centro de Lima, Perú
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: -12.0464, lng: -77.0428 },
            zoom: 13,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e3f2fd' }]
              }
            ]
          });

          googleMapRef.current = map;

          // Agregar marcadores para las entregas
          recentDeliveries.forEach((delivery, index) => {
            // Coordenadas simuladas para Lima
            const positions = [
              { lat: -12.0464, lng: -77.0428 },
              { lat: -12.0564, lng: -77.0328 },
              { lat: -12.0364, lng: -77.0528 }
            ];

            const marker = new google.maps.Marker({
              position: positions[index],
              map: map,
              title: `Entrega a ${delivery.cliente}`,
              icon: {
                url: delivery.estado === 'Entregado' ? 
                  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
                  ) :
                  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>'
                  ),
                scaledSize: new google.maps.Size(30, 30)
              }
            });

            marker.addListener('click', () => {
              setSelectedDelivery(delivery);
            });
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (useGoogleMaps && recentDeliveries.length > 0) {
      loadGoogleMaps();
    }
  }, [useGoogleMaps, recentDeliveries, GOOGLE_MAPS_API_KEY]);

  // Simulación de carga de datos (normalmente vendría de una API)
  useEffect(() => {    // Indicadores Clave - ajustados a los datos del diseño
    setKeyIndicators([
      {
        label: 'Total de entregas',
        value: 479,
        icon: <Package />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
      },
      {
        label: 'Entregas completadas',
        value: 205,
        icon: <CheckCircle2 />,
        color: 'text-green-500',
        bgColor: 'bg-green-50'
      },
      {
        label: 'Entregas pendientes',
        value: 274,
        icon: <Clock />,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50'
      },
      {
        label: 'Tasa de entregas a tiempo',
        value: '96.48%',
        icon: <TrendingUp />,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        subtitle: 'Tiempo promedio: 76 mins'
      }
    ]);    // Entregas Recientes - manteniendo los clientes originales
    setRecentDeliveries([
      {
        id: 'ENT-001',
        cliente: 'Juan Pérez',
        direccion: 'Av. Los Héroes 1234, Lima',
        estado: 'Entregado',
        tiempo: '14:30',
        repartidor: 'Carlos Martínez',
        telefono: '987-654-321',
        productos: ['Incredible Bronze Salad', 'Refined Rubber Salad', 'Sleek Bronze Table'],
        notas: 'Entrega realizada sin inconvenientes. Cliente satisfecho.',
        fechaCreacion: '4 jul 2025, 13:45',
        entregaEstimada: '4 jul 2025, 14:30'
      },
      {
        id: 'ENT-002',
        cliente: 'María García',
        direccion: 'Jr. Las Flores 567, San Isidro',
        estado: 'En Progreso',
        tiempo: '15:45',
        repartidor: 'Luis Hernández',
        telefono: '912-345-678',
        productos: ['Premium Coffee Set', 'Ceramic Dinnerware'],
        notas: 'Cliente prefiere entrega en horario de tarde.',
        fechaCreacion: '4 jul 2025, 14:00',
        entregaEstimada: '4 jul 2025, 15:45'
      },
      {
        id: 'ENT-003',
        cliente: 'Roberto Sánchez',
        direccion: 'Calle Principal 890, Miraflores',
        estado: 'Pendiente',
        tiempo: '16:20',
        repartidor: 'Ana Rodríguez',
        telefono: '956-789-012',
        productos: ['Electronic Gadgets', 'Accessories Pack'],
        notas: 'Llamar antes de llegar. Portón azul.',
        fechaCreacion: '4 jul 2025, 14:15',
        entregaEstimada: '4 jul 2025, 16:20'
      }
    ]);
  }, []);
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ReparteYA - Sistema de Entregas</h1>
            <p className="text-gray-600 text-sm">Gestión de entregas y seguimiento en tiempo real</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveView('administrador')}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeView === 'administrador'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista de administrador
          </button>
          <button
            onClick={() => setActiveView('transportista')}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeView === 'transportista'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista del transportista
          </button>
        </div>
      </div>

      {/* Contenido condicional según la vista activa */}
      {activeView === 'administrador' ? (
        <>
          {/* Indicadores principales */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {keyIndicators.map((indicator, index) => (
                <div key={index} className={`${indicator.bgColor} rounded-lg p-6 border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{indicator.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{indicator.value}</p>
                      {indicator.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{indicator.subtitle}</p>
                      )}
                    </div>
                    <div className={`${indicator.color} p-3 rounded-lg bg-white`}>
                      {indicator.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido principal: Mapa y Entregas */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mapa de entregas */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Mapa de entregas</h3>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setUseGoogleMaps(!useGoogleMaps)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          useGoogleMaps 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {useGoogleMaps ? 'Mapa Real' : 'Usar Google Maps'}
                      </button>
                      <button className="text-blue-600 text-sm hover:text-blue-800">
                        Ver mapa completo
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {useGoogleMaps ? (
                    /* Google Maps Real */
                    <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden border">
                      {GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE' ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="text-center p-6">
                            <div className="text-gray-400 mb-3">
                              <MapPin size={48} className="mx-auto" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Google Maps no configurado</h4>
                            <p className="text-gray-600 text-sm mb-4">
                              Para usar Google Maps real, necesitas configurar tu API key en el código.
                            </p>
                            <p className="text-xs text-gray-500">
                              Edita GOOGLE_MAPS_API_KEY en el componente Dashboard
                            </p>
                            <button 
                              onClick={() => setUseGoogleMaps(false)}
                              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Usar mapa simulado
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div ref={mapRef} className="w-full h-full"></div>
                      )}
                    </div>
                  ) : (
                    /* Mapa simulado */
                    <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden border">
                      {/* Fondo del mapa con patrones */}
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" className="absolute inset-0">
                          <defs>
                            <pattern id="roads" patternUnits="userSpaceOnUse" width="40" height="40">
                              <path d="M 0,20 L 40,20 M 20,0 L 20,40" stroke="#94a3b8" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#roads)"/>
                        </svg>
                      </div>
                      
                      {/* Calles principales */}
                      <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-300"></div>
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300"></div>
                        <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-300"></div>
                        <div className="absolute top-0 left-1/4 h-full w-1 bg-gray-300"></div>
                        <div className="absolute top-0 left-1/2 h-full w-1 bg-gray-300"></div>
                        <div className="absolute top-0 left-3/4 h-full w-1 bg-gray-300"></div>
                      </div>

                      {/* Marcadores de entregas */}
                      <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-green-500"></div>
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                            Juan Pérez - Entregado
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-blue-500"></div>
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                            María García - En Progreso
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-yellow-500"></div>
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                            Roberto Sánchez - Pendiente
                          </div>
                        </div>
                      </div>

                      {/* Ruta simulada */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path 
                          d="M 128 96 Q 200 150 256 192 Q 300 220 320 240" 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          strokeDasharray="5,5" 
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>

                      {/* Controles del mapa */}
                      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
                        <div className="flex flex-col space-y-1">
                          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600">
                            +
                          </button>
                          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600">
                            -
                          </button>
                        </div>
                      </div>

                      {/* Leyenda */}
                      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Leyenda</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Entregado</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">En progreso</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600">Pendiente</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Entregas recientes */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Entregas recientes</h3>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                        <Eye size={16} className="mr-1" />
                        Ver todas
                      </button>
                    </div>
                  </div>
                  {/* Barra de búsqueda */}
                  <div className="mt-3 relative">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar entregas..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-3 top-2">
                      <Filter size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="divide-y">
                  {recentDeliveries.map((delivery, index) => (
                    <div 
                      key={index} 
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedDelivery(delivery)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm text-gray-900">{delivery.id}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              delivery.estado === 'Entregado' 
                                ? 'bg-green-100 text-green-800' 
                                : delivery.estado === 'En Progreso'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {delivery.estado}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 mt-1">{delivery.cliente}</p>
                          <p className="text-xs text-gray-500">{delivery.direccion}</p>
                          <p className="text-xs text-gray-500 mt-1">{delivery.repartidor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{delivery.tiempo}</p>
                          <ChevronRight size={16} className="text-gray-400 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel de detalles de entrega */}
          {selectedDelivery && (
            <div className="px-6 pb-6">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Detalles de la entrega</h3>
                    <button 
                      onClick={() => setSelectedDelivery(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-lg text-gray-900">#{selectedDelivery.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedDelivery.estado === 'Entregado' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedDelivery.estado === 'En Progreso'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedDelivery.estado}
                      </span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Fecha de creación: {selectedDelivery.fechaCreacion}</p>
                      <p>Entrega estimada: {selectedDelivery.entregaEstimada}</p>
                    </div>
                  </div>
                </div>

                {/* Tabs de navegación */}
                <div className="border-b">
                  <nav className="flex space-x-8 px-4">
                    <button
                      onClick={() => setActiveTab('detalles')}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'detalles'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => setActiveTab('cliente')}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'cliente'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Cliente
                    </button>
                    <button
                      onClick={() => setActiveTab('ruta')}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'ruta'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Ruta
                    </button>
                  </nav>
                </div>

                {/* Contenido de las pestañas */}
                <div className="p-6">
                  {activeTab === 'detalles' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Productos</h4>
                        <ul className="space-y-2">
                          {selectedDelivery.productos.map((producto, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <span className="text-gray-700">{producto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Notas</h4>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">{selectedDelivery.notas}</p>
                        </div>
                      </div>

                      <div className="text-center pt-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Ver detalles completos
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'cliente' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Cliente</h4>
                        <p className="text-lg font-semibold text-gray-900">{selectedDelivery.cliente}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Teléfono</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">{selectedDelivery.telefono}</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Phone size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Dirección</h4>
                        <p className="text-gray-700">{selectedDelivery.direccion}</p>
                      </div>

                      <div className="text-center pt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto">
                          <MapPin size={16} />
                          <span>Abrir en mapa</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ruta' && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        {selectedDelivery.estado === 'Pendiente' 
                          ? 'Todavía no hay un conductor asignado'
                          : `Repartidor asignado: ${selectedDelivery.repartidor}`
                        }
                      </p>
                      {selectedDelivery.estado === 'Pendiente' && (
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                          Asignar conductor
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Vista del Transportista */
        <div className="px-6 py-6">
          <div className="max-w-md mx-auto">
            {/* Información del pedido actual */}
            <div className="bg-white rounded-lg border mb-6">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Vista del Transportista</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Pendiente
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Pedido #{recentDeliveries[1]?.id || 'ENT-002'}</p>
              </div>

              {/* Estado de la entrega */}
              <div className="p-4">
                {deliveryStep === 'en_camino' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Navigation size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">En camino a la entrega</p>
                        <p className="text-sm text-gray-600">{recentDeliveries[1]?.direccion}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">Hora estimada: {recentDeliveries[1]?.tiempo}</p>
                    </div>
                  </div>
                )}

                {deliveryStep === 'llegado' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">¡Has llegado al destino!</p>
                        <p className="text-sm text-gray-600">{recentDeliveries[1]?.direccion}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">Confirma la entrega realizando estas acciones:</p>
                      <ol className="mt-2 space-y-1 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-medium">1.</span>
                          <span>Entrega el paquete al cliente</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-medium">2.</span>
                          <span>Captura una foto o documento firmado</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-medium">3.</span>
                          <span>Marca como entregado</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                )}

                {deliveryStep === 'completado' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">¡Entrega completada!</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Has entregado con éxito el pedido #{recentDeliveries[1]?.id}
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium">
                        Ver próxima entrega
                      </button>
                      <button className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50">
                        Volver al tablero
                      </button>
                    </div>
                  </div>
                )}

                {/* Información del cliente */}
                {deliveryStep !== 'completado' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Cliente</h4>
                      <p className="text-lg font-semibold text-gray-900">{recentDeliveries[1]?.cliente}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Teléfono</h4>
                        <p className="text-gray-700">{recentDeliveries[1]?.telefono}</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                        <Phone size={16} />
                        <span>Llamar</span>
                      </button>
                    </div>

                    {/* Botones de acción */}
                    <div className="pt-4 space-y-3">
                      {deliveryStep === 'en_camino' && (
                        <button 
                          onClick={() => setDeliveryStep('llegado')}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                        >
                          He llegado
                        </button>
                      )}
                      
                      {deliveryStep === 'llegado' && (
                        <div className="space-y-3">
                          <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2">
                            <Camera size={16} />
                            <span>Capturar foto</span>
                          </button>
                          <button 
                            onClick={() => setDeliveryStep('completado')}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                          >
                            <Check size={16} />
                            <span>Entregado</span>
                          </button>
                        </div>
                      )}
                      
                      <button className="w-full text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2">
                        <MapPin size={16} />
                        <span>Abrir en Maps</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;