import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus
} from 'lucide-react';
import DeliveryTable from '../components/deliveries/DeliveryTable';
import DeliveryModal from '../components/deliveries/DeliveryModal';

const DeliveryManagement = () => {
  // Estados para gestión de entregas
  const [deliveries, setDeliveries] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [repartidorFiltro, setRepartidorFiltro] = useState('');
  
  // Estados para modal de entrega
  const [modalEntrega, setModalEntrega] = useState(null);
  const [modalMode, setModalMode] = useState('ver');

  // Carga de datos simulados
  useEffect(() => {
    // Datos de repartidores
    const mockRepartidores = [
      { id: 'R001', nombre: 'Carlos', apellido: 'Martínez' },
      { id: 'R002', nombre: 'María', apellido: 'García' },
      { id: 'R003', nombre: 'Luis', apellido: 'Hernández' }
    ];
    setRepartidores(mockRepartidores);

    // Datos de entregas
    const mockDeliveries = [
      {
        id: 'ENT-001',
        cliente: 'Juan Pérez',
        direccion: 'Av. Siempre Viva 123',
        ciudad: 'Ciudad de México',
        estado: 'Completada',
        repartidor: 'R001',
        fechaCreacion: '2024-05-01',
        fechaEntrega: '2024-05-05',
        peso: 5.5,
        volumen: 0.3,
        prioridad: 'Media'
      },
      {
        id: 'ENT-002',
        cliente: 'María López',
        direccion: 'Calle Principal 456',
        ciudad: 'Guadalajara',
        estado: 'En Proceso',
        repartidor: 'R002',
        fechaCreacion: '2024-05-03',
        peso: 2.7,
        volumen: 0.2,
        prioridad: 'Alta'
      },
      {
        id: 'ENT-003',
        cliente: 'Roberto Sánchez',
        direccion: 'Av. Reforma 789',
        ciudad: 'Monterrey',
        estado: 'Pendiente',
        repartidor: 'R003',
        fechaCreacion: '2024-05-04',
        peso: 1.2,
        volumen: 0.1,
        prioridad: 'Baja'
      }
    ];
    setDeliveries(mockDeliveries);
  }, []);

  // Función para filtrar entregas
  const filteredDeliveries = deliveries.filter(entrega => {
    const matchSearchTerm = entrega.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            entrega.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = !estadoFiltro || entrega.estado === estadoFiltro;
    const matchRepartidor = !repartidorFiltro || entrega.repartidor === repartidorFiltro;
    
    return matchSearchTerm && matchEstado && matchRepartidor;
  });

  // Función para abrir modal de entrega
  const abrirModalEntrega = (entrega, modo) => {
    setModalMode(modo);
    setModalEntrega(entrega || {
      id: `ENT-${(deliveries.length + 1).toString().padStart(3, '0')}`,
      cliente: '',
      direccion: '',
      ciudad: '',
      estado: 'Pendiente',
      fechaCreacion: new Date().toISOString().split('T')[0],
      prioridad: 'Baja'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Entregas</h1>
        <button 
          onClick={() => abrirModalEntrega(null, 'crear')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" /> Nueva Entrega
        </button>
      </div>

      {/* Sección de Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex space-x-4">
          {/* Barra de Búsqueda */}
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Buscar entregas por cliente o ID..." 
              className="w-full p-2 pl-8 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-3 text-gray-400" />
          </div>

          {/* Filtro de Estado */}
          <select 
            className="p-2 border rounded-lg"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Todos los Estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>

          {/* Filtro de Repartidor */}
          <select 
            className="p-2 border rounded-lg"
            value={repartidorFiltro}
            onChange={(e) => setRepartidorFiltro(e.target.value)}
          >
            <option value="">Todos los Repartidores</option>
            {repartidores.map(repartidor => (
              <option key={repartidor.id} value={repartidor.id}>
                {`${repartidor.nombre} ${repartidor.apellido}`}
              </option>
            ))}
          </select>

          {/* Botón de Filtros Avanzados */}
          <button className="bg-gray-200 p-2 rounded-lg flex items-center">
            <Filter className="mr-2" /> Filtros
          </button>
        </div>
      </div>

      {/* Tabla de Entregas */}
      <DeliveryTable 
        deliveries={filteredDeliveries} 
        repartidores={repartidores} 
        onEditClick={abrirModalEntrega}
      />

      {/* Modal de Detalle/Edición de Entrega */}
      {modalEntrega && (
        <DeliveryModal 
          delivery={modalEntrega}
          mode={modalMode}
          onClose={() => setModalEntrega(null)}
          repartidores={repartidores}
        />
      )}
    </div>
  );
};

export default DeliveryManagement;