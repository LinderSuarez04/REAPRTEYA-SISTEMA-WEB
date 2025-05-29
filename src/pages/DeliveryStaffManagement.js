import React, { useState, useEffect } from 'react';
import { 
  Search, 
  UserPlus
} from 'lucide-react';
import StaffCard from '../components/Staff/StaffCard';
import StaffModal from '../components/Staff/StaffModal';

const DeliveryStaffManagement = () => {
  // Estados para repartidores y métricas
  const [repartidores, setRepartidores] = useState([]);
  const [metricas, setMetricas] = useState([]);
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  
  // Estados para modal de repartidor
  const [modalRepartidor, setModalRepartidor] = useState(null);
  const [modalMode, setModalMode] = useState('ver');

  // Carga de datos simulados
  useEffect(() => {
    // Datos de repartidores
    const mockRepartidores = [
      {
        id: 'R001',
        nombre: 'Carlos',
        apellido: 'Martínez',
        email: 'carlos.martinez@empresa.com',
        telefono: '555-1234',
        fechaContratacion: '2023-01-15',
        estado: 'Activo',
        vehiculo: {
          tipo: 'Camioneta',
          modelo: 'Ford Transit',
          capacidad: 1.5
        }
      },
      {
        id: 'R002',
        nombre: 'María',
        apellido: 'García',
        email: 'maria.garcia@empresa.com',
        telefono: '555-5678',
        fechaContratacion: '2023-03-20',
        estado: 'Activo',
        vehiculo: {
          tipo: 'Motocicleta',
          modelo: 'Honda CBR',
          capacidad: 0.2
        }
      },
      {
        id: 'R003',
        nombre: 'Luis',
        apellido: 'Hernández',
        email: 'luis.hernandez@empresa.com',
        telefono: '555-9012',
        fechaContratacion: '2023-06-10',
        estado: 'Suspendido',
        vehiculo: {
          tipo: 'Bicicleta',
          modelo: 'Urbana Eléctrica',
          capacidad: 0.1
        }
      }
    ];
    setRepartidores(mockRepartidores);

    // Métricas de repartidores
    const mockMetricas = [
      {
        repartidorId: 'R001',
        entregasTotales: 180,
        entregasCompletadas: 170,
        entregasPendientes: 10,
        calificacion: 4.7,
        kmRecorridos: 1200
      },
      {
        repartidorId: 'R002',
        entregasTotales: 150,
        entregasCompletadas: 145,
        entregasPendientes: 5,
        calificacion: 4.5,
        kmRecorridos: 950
      },
      {
        repartidorId: 'R003',
        entregasTotales: 60,
        entregasCompletadas: 50,
        entregasPendientes: 10,
        calificacion: 3.8,
        kmRecorridos: 400
      }
    ];
    setMetricas(mockMetricas);
  }, []);

  // Función para filtrar repartidores
  const filteredRepartidores = repartidores.filter(repartidor => {
    const matchSearchTerm = 
      repartidor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repartidor.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repartidor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = !estadoFiltro || repartidor.estado === estadoFiltro;
    
    return matchSearchTerm && matchEstado;
  });

  // Función para abrir modal de repartidor
  const abrirModalRepartidor = (repartidor, modo) => {
    setModalMode(modo);
    setModalRepartidor(repartidor || {
      id: `R${(repartidores.length + 1).toString().padStart(3, '0')}`,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fechaContratacion: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Repartidores</h1>
        <button 
          onClick={() => abrirModalRepartidor(null, 'crear')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <UserPlus className="mr-2" /> Nuevo Repartidor
        </button>
      </div>

      {/* Sección de Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex space-x-4">
          {/* Barra de Búsqueda */}
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Buscar repartidores por nombre, apellido o email..." 
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
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      {/* Grid de Repartidores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepartidores.map((repartidor) => {
          // Encontrar métricas del repartidor
          const metricasRepartidor = metricas.find(m => m.repartidorId === repartidor.id);
          
          return (
            <StaffCard 
              key={repartidor.id}
              repartidor={repartidor}
              metricas={metricasRepartidor}
              onEditClick={abrirModalRepartidor}
            />
          );
        })}
      </div>

      {/* Modal de Detalle/Edición de Repartidor */}
      {modalRepartidor && (
        <StaffModal 
          repartidor={modalRepartidor}
          mode={modalMode}
          onClose={() => setModalRepartidor(null)}
        />
      )}
    </div>
  );
};

export default DeliveryStaffManagement;