import React, { useState } from 'react';
import { 
  Map, 
  Route, 
  Clock, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Navigation,
  Users,
  Play,
  Pause,
  CheckCircle,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const DeliveryRoutes = () => {
  const { 
    deliveryRoutes, 
    addDeliveryRoute, 
    updateDeliveryRoute, 
    deleteDeliveryRoute,
    getAvailableDrivers,
    deliveryStaff
  } = useApp();

  const [activeTab, setActiveTab] = useState('active');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newRouteData, setNewRouteData] = useState({
    name: '',
    zone: 'Centro',
    driverId: '',
    vehicle: 'Motocicleta',
    startTime: '',
    estimatedDuration: '',
    priority: 'medium',
    orders: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRouteData({
      ...newRouteData,
      [name]: value
    });
  };

  // Crear nueva ruta
  const handleCreateRoute = () => {
    const driver = deliveryStaff.find(s => s.id === parseInt(newRouteData.driverId));
    if (!driver) {
      alert('Seleccione un repartidor válido');
      return;
    }

    addDeliveryRoute({
      ...newRouteData,
      driver: driver.name,
      totalStops: newRouteData.orders.length,
      distance: (Math.random() * 20 + 10).toFixed(1) + ' km'
    });
    
    setShowCreateModal(false);
    setNewRouteData({
      name: '',
      zone: 'Centro',
      driverId: '',
      vehicle: 'Motocicleta',
      startTime: '',
      estimatedDuration: '',
      priority: 'medium',
      orders: []
    });
  };

  // Actualizar estado de ruta
  const handleUpdateRouteStatus = (routeId, newStatus) => {
    updateDeliveryRoute(routeId, { status: newStatus });
  };

  // Eliminar ruta
  const handleDeleteRoute = (routeId) => {
    if (window.confirm('¿Está seguro de eliminar esta ruta?')) {
      deleteDeliveryRoute(routeId);
    }
  };

  // Datos de estadísticas dinámicas
  const getStats = () => {
    const activeRoutes = deliveryRoutes.filter(r => r.status === 'active').length;
    const pendingDeliveries = deliveryRoutes.reduce((sum, route) => {
      return sum + (route.totalStops - route.completedStops);
    }, 0);
    const activeDrivers = deliveryStaff.filter(s => s.status !== 'offline').length;
    const avgTime = deliveryRoutes.length > 0 
      ? deliveryRoutes.reduce((sum, route) => {
          const duration = parseFloat(route.estimatedDuration?.replace(/[^\d.]/g, '') || 0);
          return sum + duration;
        }, 0) / deliveryRoutes.length
      : 0;

    return [
      { label: 'Rutas Activas', value: activeRoutes.toString(), icon: <Route className="text-blue-600" />, color: 'bg-blue-50' },
      { label: 'Entregas Pendientes', value: pendingDeliveries.toString(), icon: <MapPin className="text-orange-600" />, color: 'bg-orange-50' },
      { label: 'Repartidores Activos', value: activeDrivers.toString(), icon: <Users className="text-green-600" />, color: 'bg-green-50' },
      { label: 'Tiempo Promedio', value: avgTime > 0 ? avgTime.toFixed(1) + 'h' : '0h', icon: <Clock className="text-purple-600" />, color: 'bg-purple-50' }
    ];
  };

  const stats = getStats();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'En Curso';
      case 'planned': return 'Planificada';
      case 'completed': return 'Completada';
      case 'delayed': return 'Retrasada';
      default: return 'Desconocido';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredRoutes = deliveryRoutes.filter(route => {
    const matchesTab = activeTab === 'all' || route.status === activeTab;
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const zones = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'];
  const vehicles = ['Motocicleta', 'Bicicleta', 'Auto'];
  const priorities = [
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rutas de Entrega</h1>
          <p className="text-gray-600 mt-1">Gestiona y optimiza las rutas de tus repartidores</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Nueva Ruta
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <Navigation size={20} className="mr-2" />
            Optimizar Rutas
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-6 border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Principal de Rutas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs y Filtros */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-2 border-b-2 text-sm font-medium ${
                      activeTab === 'active'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Activas ({deliveryRoutes.filter(r => r.status === 'active').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('planned')}
                    className={`pb-2 border-b-2 text-sm font-medium ${
                      activeTab === 'planned'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Planificadas ({deliveryRoutes.filter(r => r.status === 'planned').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`pb-2 border-b-2 text-sm font-medium ${
                      activeTab === 'completed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Completadas ({deliveryRoutes.filter(r => r.status === 'completed').length})
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar ruta..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Rutas */}
            <div className="divide-y">
              {filteredRoutes.length === 0 ? (
                <div className="p-8 text-center">
                  <Map className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay rutas disponibles</h3>
                  <p className="text-gray-500 mb-4">Crea tu primera ruta para comenzar a gestionar entregas</p>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Crear Primera Ruta
                  </button>
                </div>
              ) : (
                filteredRoutes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-6 hover:bg-gray-50 cursor-pointer ${
                      selectedRoute?.id === route.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                              {getStatusText(route.status)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteRoute(route.id);
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users size={16} className="mr-2" />
                            {route.driver}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            {route.zone}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            {route.estimatedDuration}
                          </div>
                          <div className="flex items-center">
                            <Route size={16} className="mr-2" />
                            {route.distance}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                              Progreso: {route.completedStops}/{route.totalStops} paradas
                            </span>
                            <span className={`text-sm font-medium ${getPriorityColor(route.priority)}`}>
                              Prioridad: {route.priority === 'high' ? 'Alta' : route.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${route.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {route.status === 'active' && (
                          <div className="mt-3 flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateRouteStatus(route.id, 'completed');
                              }}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              <CheckCircle size={14} className="inline mr-1" />
                              Completar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateRouteStatus(route.id, 'planned');
                              }}
                              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                            >
                              <Pause size={14} className="inline mr-1" />
                              Pausar
                            </button>
                          </div>
                        )}

                        {route.status === 'planned' && (
                          <div className="mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateRouteStatus(route.id, 'active');
                              }}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              <Play size={14} className="inline mr-1" />
                              Iniciar Ruta
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Panel de Detalles */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedRoute ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de Ruta</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre</label>
                    <p className="text-gray-900">{selectedRoute.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Repartidor</label>
                    <p className="text-gray-900">{selectedRoute.driver}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Vehículo</label>
                    <p className="text-gray-900">{selectedRoute.vehicle}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Zona</label>
                    <p className="text-gray-900">{selectedRoute.zone}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Pedidos en la Ruta</label>
                    <div className="mt-2 space-y-2">
                      {selectedRoute.orders && selectedRoute.orders.length > 0 ? (
                        selectedRoute.orders.map((order, index) => (
                          <div key={index} className="border rounded p-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{order.id}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status === 'delivered' ? 'Entregado' :
                                 order.status === 'in_transit' ? 'En tránsito' : 'Pendiente'}
                              </span>
                            </div>
                            {order.time && (
                              <p className="text-sm text-gray-600 mt-1">Entregado a las {order.time}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No hay pedidos asignados</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Map className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una ruta</h3>
                <p className="text-gray-500">Haz clic en una ruta para ver sus detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Crear Nueva Ruta */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Nueva Ruta de Entrega</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Ruta</label>
                <input
                  type="text"
                  name="name"
                  value={newRouteData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ej: Ruta Centro - Mañana"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
                <select
                  name="zone"
                  value={newRouteData.zone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repartidor</label>
                <select
                  name="driverId"
                  value={newRouteData.driverId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Seleccione un repartidor</option>
                  {getAvailableDrivers().map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.zone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                <select
                  name="vehicle"
                  value={newRouteData.vehicle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  {vehicles.map(vehicle => (
                    <option key={vehicle} value={vehicle}>{vehicle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
                <input
                  type="time"
                  name="startTime"
                  value={newRouteData.startTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración Estimada</label>
                <input
                  type="text"
                  name="estimatedDuration"
                  value={newRouteData.estimatedDuration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ej: 2h 30m"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                  name="priority"
                  value={newRouteData.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateRoute}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Crear Ruta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryRoutes;
