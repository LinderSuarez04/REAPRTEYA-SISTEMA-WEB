import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado global de repartidores
  const [deliveryStaff, setDeliveryStaff] = useState([
    {
      id: 1,
      name: 'Carlos Martínez',
      email: 'carlos@reparteya.com',
      phone: '+51 999 123 456',
      vehicle: 'Motocicleta',
      status: 'available',
      rating: 4.9,
      deliveries: 48,
      efficiency: 98,
      zone: 'Norte',
      experience: '2 años',
      disabled: false
    },
    {
      id: 2,
      name: 'Ana Rodríguez',
      email: 'ana@reparteya.com',
      phone: '+51 999 234 567',
      vehicle: 'Bicicleta',
      status: 'busy',
      rating: 4.8,
      deliveries: 45,
      efficiency: 96,
      zone: 'Centro',
      experience: '1.5 años',
      disabled: false
    },
    {
      id: 3,
      name: 'Luis Hernández',
      email: 'luis@reparteya.com',
      phone: '+51 999 345 678',
      vehicle: 'Auto',
      status: 'available',
      rating: 4.7,
      deliveries: 42,
      efficiency: 94,
      zone: 'Sur',
      experience: '3 años',
      disabled: false
    },
    {
      id: 4,
      name: 'María García',
      email: 'maria@reparteya.com',
      phone: '+51 999 456 789',
      vehicle: 'Motocicleta',
      status: 'offline',
      rating: 4.6,
      deliveries: 40,
      efficiency: 92,
      zone: 'Este',
      experience: '1 año',
      disabled: true
    },
    {
      id: 5,
      name: 'Roberto Silva',
      email: 'roberto@reparteya.com',
      phone: '+51 999 567 890',
      vehicle: 'Bicicleta',
      status: 'available',
      rating: 4.5,
      deliveries: 38,
      efficiency: 90,
      zone: 'Oeste',
      experience: '2.5 años',
      disabled: false
    },
    {
      id: 6,
      name: 'Carmen López',
      email: 'carmen@reparteya.com',
      phone: '+51 999 678 901',
      vehicle: 'Motocicleta',
      status: 'busy',
      rating: 4.7,
      deliveries: 35,
      efficiency: 93,
      zone: 'Norte',
      experience: '1.8 años',
      disabled: true
    },
    {
      id: 7,
      name: 'Diego Torres',
      email: 'diego@reparteya.com',
      phone: '+51 999 789 012',
      vehicle: 'Auto',
      status: 'available',
      rating: 4.4,
      deliveries: 32,
      efficiency: 88,
      zone: 'Centro',
      experience: '6 meses',
      disabled: false
    },
    {
      id: 8,
      name: 'Patricia Vega',
      email: 'patricia@reparteya.com',
      phone: '+51 999 890 123',
      vehicle: 'Bicicleta',
      status: 'available',
      rating: 4.6,
      deliveries: 29,
      efficiency: 91,
      zone: 'Sur',
      experience: '1.2 años',
      disabled: false
    }
  ]);

  // Estado global de pedidos/documentos
  const [documents, setDocuments] = useState([
    {
      id: 'DOC001',
      customer: 'Restaurant El Dorado',
      address: 'Av. Larco 1234, Miraflores',
      phone: '+51 987 654 321',
      items: ['Pizza Margherita x2', 'Coca Cola x2'],
      total: 45.50,
      priority: 'high',
      estimatedTime: '25 min',
      distance: '2.3 km',
      status: 'pending',
      orderDate: '2025-07-05 14:30',
      zone: 'Centro'
    },
    {
      id: 'DOC002',
      customer: 'Farmacia San Juan',
      address: 'Jr. Lima 567, Cercado',
      phone: '+51 987 654 322',
      items: ['Medicamentos varios', 'Vitaminas'],
      total: 78.20,
      priority: 'urgent',
      estimatedTime: '15 min',
      distance: '1.8 km',
      status: 'pending',
      orderDate: '2025-07-05 15:15',
      zone: 'Centro'
    },
    {
      id: 'DOC003',
      customer: 'Supermercado Plaza',
      address: 'Av. Brasil 890, Pueblo Libre',
      phone: '+51 987 654 323',
      items: ['Abarrotes x15 productos'],
      total: 125.75,
      priority: 'medium',
      estimatedTime: '40 min',
      distance: '4.2 km',
      status: 'pending',
      orderDate: '2025-07-05 15:45',
      zone: 'Oeste'
    },
    {
      id: 'DOC004',
      customer: 'Librería Cultura',
      address: 'Av. Arequipa 456, San Isidro',
      phone: '+51 987 654 324',
      items: ['Libros educativos x8'],
      total: 89.90,
      priority: 'low',
      estimatedTime: '35 min',
      distance: '3.1 km',
      status: 'pending',
      orderDate: '2025-07-05 16:00',
      zone: 'Centro'
    },
    {
      id: 'DOC005',
      customer: 'Tienda de Electrónicos',
      address: 'Av. Tacna 789, Lima',
      phone: '+51 987 654 325',
      items: ['Smartphone', 'Auriculares', 'Cargador'],
      total: 567.30,
      priority: 'high',
      estimatedTime: '20 min',
      distance: '1.5 km',
      status: 'pending',
      orderDate: '2025-07-05 16:20',
      zone: 'Centro'
    },
    {
      id: 'DOC006',
      customer: 'Panadería Artesanal',
      address: 'Jr. Unión 234, Barranco',
      phone: '+51 987 654 326',
      items: ['Pan integral x6', 'Torta chocolate'],
      total: 34.60,
      priority: 'medium',
      estimatedTime: '30 min',
      distance: '3.8 km',
      status: 'pending',
      orderDate: '2025-07-05 16:35',
      zone: 'Sur'
    },
    {
      id: 'DOC007',
      customer: 'Veterinaria Animalitos',
      address: 'Av. Salaverry 567, Jesús María',
      phone: '+51 987 654 327',
      items: ['Alimento para mascotas', 'Medicinas veterinarias'],
      total: 156.40,
      priority: 'medium',
      estimatedTime: '45 min',
      distance: '5.2 km',
      status: 'pending',
      orderDate: '2025-07-05 17:00',
      zone: 'Norte'
    },
    {
      id: 'DOC008',
      customer: 'Floristería Bella Rosa',
      address: 'Av. Pardo 890, Miraflores',
      phone: '+51 987 654 328',
      items: ['Ramo de rosas x3', 'Plantas decorativas'],
      total: 67.80,
      priority: 'low',
      estimatedTime: '25 min',
      distance: '2.7 km',
      status: 'pending',
      orderDate: '2025-07-05 17:15',
      zone: 'Centro'
    },
    {
      id: 'DOC009',
      customer: 'Ferretería El Tornillo',
      address: 'Jr. Cusco 123, Breña',
      phone: '+51 987 654 329',
      items: ['Herramientas varias', 'Tornillos y tuercas'],
      total: 234.50,
      priority: 'medium',
      estimatedTime: '50 min',
      distance: '6.1 km',
      status: 'pending',
      orderDate: '2025-07-05 17:30',
      zone: 'Norte'
    },
    {
      id: 'DOC010',
      customer: 'Óptica VisionPlus',
      address: 'Av. La Marina 456, San Miguel',
      phone: '+51 987 654 330',
      items: ['Lentes de contacto', 'Líquido limpiador'],
      total: 145.20,
      priority: 'high',
      estimatedTime: '35 min',
      distance: '4.8 km',
      status: 'pending',
      orderDate: '2025-07-05 17:45',
      zone: 'Oeste'
    }
  ]);

  // Estado global de hojas de reparto
  const [deliverySheets, setDeliverySheets] = useState([
    {
      id: 'HR001',
      name: 'Hoja Centro - Mañana',
      date: '2025-07-05',
      shift: 'morning',
      driver: 'Carlos Martínez',
      driverId: 1,
      status: 'active',
      zone: 'Centro',
      documents: ['DOC001', 'DOC002', 'DOC004', 'DOC005'],
      totalOrders: 4,
      estimatedTime: '2h 15m',
      totalValue: 281.50
    },
    {
      id: 'HR002',
      name: 'Hoja Norte - Tarde',
      date: '2025-07-05',
      shift: 'afternoon',
      driver: 'Carmen López',
      driverId: 6,
      status: 'planning',
      zone: 'Norte',
      documents: ['DOC007', 'DOC009'],
      totalOrders: 2,
      estimatedTime: '1h 35m',
      totalValue: 390.90
    },
    {
      id: 'HR003',
      name: 'Hoja Sur - Mañana',
      date: '2025-07-05',
      shift: 'morning',
      driver: 'Luis Hernández',
      driverId: 3,
      status: 'completed',
      zone: 'Sur',
      documents: ['DOC006'],
      totalOrders: 1,
      estimatedTime: '30m',
      totalValue: 34.60
    }
  ]);

  // Estado global de rutas de entrega
  const [deliveryRoutes, setDeliveryRoutes] = useState([
    {
      id: 'RUT001',
      name: 'Ruta Centro Express',
      zone: 'Centro',
      driver: 'Carlos Martínez',
      driverId: 1,
      vehicle: 'Motocicleta',
      status: 'active',
      progress: 75,
      totalStops: 4,
      completedStops: 3,
      estimatedDuration: '2h 15m',
      actualDuration: '1h 40m',
      distance: '12.5 km',
      orders: [
        { id: 'DOC001', status: 'delivered', time: '14:45' },
        { id: 'DOC002', status: 'delivered', time: '15:20' },
        { id: 'DOC004', status: 'delivered', time: '16:10' },
        { id: 'DOC005', status: 'in_transit', time: null }
      ],
      startTime: '14:30',
      priority: 'high'
    },
    {
      id: 'RUT002',
      name: 'Ruta Norte Comercial',
      zone: 'Norte',
      driver: 'Carmen López',
      driverId: 6,
      vehicle: 'Motocicleta',
      status: 'planned',
      progress: 0,
      totalStops: 2,
      completedStops: 0,
      estimatedDuration: '1h 35m',
      actualDuration: null,
      distance: '11.3 km',
      orders: [
        { id: 'DOC007', status: 'pending', time: null },
        { id: 'DOC009', status: 'pending', time: null }
      ],
      startTime: '17:00',
      priority: 'medium'
    },
    {
      id: 'RUT003',
      name: 'Ruta Oeste Residencial',
      zone: 'Oeste',
      driver: 'Roberto Silva',
      driverId: 5,
      vehicle: 'Bicicleta',
      status: 'planned',
      progress: 0,
      totalStops: 2,
      completedStops: 0,
      estimatedDuration: '1h 50m',
      actualDuration: null,
      distance: '9.0 km',
      orders: [
        { id: 'DOC003', status: 'pending', time: null },
        { id: 'DOC010', status: 'pending', time: null }
      ],
      startTime: '18:00',
      priority: 'medium'
    },
    {
      id: 'RUT004',
      name: 'Ruta Sur Premium',
      zone: 'Sur',
      driver: 'Luis Hernández',
      driverId: 3,
      vehicle: 'Auto',
      status: 'completed',
      progress: 100,
      totalStops: 1,
      completedStops: 1,
      estimatedDuration: '30m',
      actualDuration: '25m',
      distance: '3.8 km',
      orders: [
        { id: 'DOC006', status: 'delivered', time: '16:50' }
      ],
      startTime: '16:30',
      priority: 'low'
    },
    {
      id: 'RUT005',
      name: 'Ruta Centro Nocturna',
      zone: 'Centro',
      driver: 'Ana Rodríguez',
      driverId: 2,
      vehicle: 'Bicicleta',
      status: 'planned',
      progress: 0,
      totalStops: 1,
      completedStops: 0,
      estimatedDuration: '25m',
      actualDuration: null,
      distance: '2.7 km',
      orders: [
        { id: 'DOC008', status: 'pending', time: null }
      ],
      startTime: '19:00',
      priority: 'low'
    }
  ]);

  // Funciones para manejar repartidores
  const addDeliveryStaff = (newStaff) => {
    const staff = {
      ...newStaff,
      id: Math.max(...deliveryStaff.map(s => s.id)) + 1,
      deliveries: 0,
      rating: 4.0,
      efficiency: 85,
      status: 'available'
    };
    setDeliveryStaff(prev => [...prev, staff]);
    return staff;
  };

  const updateDeliveryStaff = (id, updates) => {
    setDeliveryStaff(prev => prev.map(staff => 
      staff.id === id ? { ...staff, ...updates } : staff
    ));
  };

  const toggleDisableStaff = (id) => {
    setDeliveryStaff(prev => prev.map(staff => 
      staff.id === id ? { ...staff, disabled: !staff.disabled } : staff
    ));
  };

  const deleteDeliveryStaff = (id) => {
    setDeliveryStaff(prev => prev.filter(staff => staff.id !== id));
  };

  // Funciones para manejar documentos
  const addDocument = (newDoc) => {
    const doc = {
      ...newDoc,
      id: `DOC${String(Math.max(...documents.map(d => parseInt(d.id.slice(3)))) + 1).padStart(3, '0')}`,
      status: 'pending',
      orderDate: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setDocuments(prev => [...prev, doc]);
    return doc;
  };

  const updateDocument = (id, updates) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updates } : doc
    ));
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Funciones para manejar hojas de reparto
  const addDeliverySheet = (newSheet) => {
    const sheet = {
      ...newSheet,
      id: `HR${String(Math.max(...deliverySheets.map(s => parseInt(s.id.slice(2)))) + 1).padStart(3, '0')}`,
      status: 'planning',
      totalOrders: newSheet.documents?.length || 0,
      totalValue: newSheet.documents?.reduce((sum, docId) => {
        const doc = documents.find(d => d.id === docId);
        return sum + (doc?.total || 0);
      }, 0) || 0
    };
    setDeliverySheets(prev => [...prev, sheet]);
    return sheet;
  };

  const updateDeliverySheet = (id, updates) => {
    setDeliverySheets(prev => prev.map(sheet => {
      if (sheet.id === id) {
        const updated = { ...sheet, ...updates };
        if (updates.documents) {
          updated.totalOrders = updates.documents.length;
          updated.totalValue = updates.documents.reduce((sum, docId) => {
            const doc = documents.find(d => d.id === docId);
            return sum + (doc?.total || 0);
          }, 0);
        }
        return updated;
      }
      return sheet;
    }));
  };

  const deleteDeliverySheet = (id) => {
    setDeliverySheets(prev => prev.filter(sheet => sheet.id !== id));
  };

  // Funciones para manejar rutas
  const addDeliveryRoute = (newRoute) => {
    const route = {
      ...newRoute,
      id: `RUT${String(Math.max(...deliveryRoutes.map(r => parseInt(r.id.slice(3)))) + 1).padStart(3, '0')}`,
      status: 'planned',
      progress: 0,
      completedStops: 0,
      actualDuration: null
    };
    setDeliveryRoutes(prev => [...prev, route]);
    return route;
  };

  const updateDeliveryRoute = (id, updates) => {
    setDeliveryRoutes(prev => prev.map(route => 
      route.id === id ? { ...route, ...updates } : route
    ));
  };

  const deleteDeliveryRoute = (id) => {
    setDeliveryRoutes(prev => prev.filter(route => route.id !== id));
  };

  // Funciones de utilidad
  const getAvailableDrivers = () => {
    return deliveryStaff.filter(staff => staff.status === 'available');
  };

  const getPendingDocuments = () => {
    return documents.filter(doc => doc.status === 'pending');
  };

  const getDocumentsByZone = (zone) => {
    return documents.filter(doc => doc.zone === zone);
  };

  const getRoutesByDriver = (driverId) => {
    return deliveryRoutes.filter(route => route.driverId === driverId);
  };

  const getActiveRoutes = () => {
    return deliveryRoutes.filter(route => route.status === 'active');
  };

  const getPlannedRoutes = () => {
    return deliveryRoutes.filter(route => route.status === 'planned');
  };

  const getCompletedRoutes = () => {
    return deliveryRoutes.filter(route => route.status === 'completed');
  };

  // Estadísticas calculadas
  const getStats = () => {
    const totalDeliveries = deliveryStaff.reduce((sum, staff) => sum + staff.deliveries, 0);
    const avgRating = deliveryStaff.reduce((sum, staff) => sum + staff.rating, 0) / deliveryStaff.length;
    const totalRevenue = documents.reduce((sum, doc) => sum + doc.total, 0);
    const activeStaff = deliveryStaff.filter(staff => staff.status !== 'offline').length;
    
    return {
      totalDeliveries,
      avgRating: avgRating.toFixed(1),
      totalRevenue: totalRevenue.toFixed(2),
      activeStaff,
      totalDocuments: documents.length,
      pendingDocuments: getPendingDocuments().length,
      activeRoutes: getActiveRoutes().length,
      totalStaff: deliveryStaff.length
    };
  };

  const value = {
    // Estados
    deliveryStaff,
    documents,
    deliverySheets,
    deliveryRoutes,
    
    // Funciones de repartidores
    addDeliveryStaff,
    updateDeliveryStaff,
    toggleDisableStaff,
    deleteDeliveryStaff,
    
    // Funciones de documentos
    addDocument,
    updateDocument,
    deleteDocument,
    
    // Funciones de hojas de reparto
    addDeliverySheet,
    updateDeliverySheet,
    deleteDeliverySheet,
    
    // Funciones de rutas
    addDeliveryRoute,
    updateDeliveryRoute,
    deleteDeliveryRoute,
    
    // Funciones de utilidad
    getAvailableDrivers,
    getPendingDocuments,
    getDocumentsByZone,
    getRoutesByDriver,
    getActiveRoutes,
    getPlannedRoutes,
    getCompletedRoutes,
    getStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
