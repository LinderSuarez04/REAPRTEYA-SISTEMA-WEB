import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  UserPlus,
  Users,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';
import StaffCard from '../components/Staff/StaffCard';
import StaffModal from '../components/Staff/StaffModal';

const DeliveryStaffManagement = () => {
  // Usar el contexto de la aplicación
  const { 
    deliveryStaff, 
    addDeliveryStaff, 
    updateDeliveryStaff, 
    toggleDisableStaff,
    deleteDeliveryStaff
  } = useApp();
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [disabledFilter, setDisabledFilter] = useState('');
  
  // Estados para modal de repartidor
  const [modalRepartidor, setModalRepartidor] = useState(null);
  const [modalMode, setModalMode] = useState('ver');
  const [showModal, setShowModal] = useState(false);

  // Métricas calculadas
  const [metricas, setMetricas] = useState([]);

  // Actualizar métricas cuando cambie el personal
  useEffect(() => {
    const activeStaff = deliveryStaff.filter(staff => staff.status !== 'offline').length;
    const avgRating = deliveryStaff.reduce((sum, staff) => sum + staff.rating, 0) / deliveryStaff.length || 0;
    const totalDeliveries = deliveryStaff.reduce((sum, staff) => sum + staff.deliveries, 0);
    const avgEfficiency = deliveryStaff.reduce((sum, staff) => sum + staff.efficiency, 0) / deliveryStaff.length || 0;

    setMetricas([
      {
        label: 'Total Repartidores',
        value: deliveryStaff.length,
        icon: <Users className="text-blue-600" />,
        color: 'bg-blue-50',
        subtitle: `${activeStaff} activos`
      },
      {
        label: 'Rating Promedio',
        value: avgRating.toFixed(1),
        icon: <Star className="text-yellow-600" />,
        color: 'bg-yellow-50',
        subtitle: 'de 5.0'
      },
      {
        label: 'Entregas Totales',
        value: totalDeliveries,
        icon: <TrendingUp className="text-green-600" />,
        color: 'bg-green-50',
        subtitle: 'este mes'
      },
      {
        label: 'Eficiencia Promedio',
        value: `${avgEfficiency.toFixed(1)}%`,
        icon: <Clock className="text-purple-600" />,
        color: 'bg-purple-50',
        subtitle: 'rendimiento'
      }
    ]);
  }, [deliveryStaff]);

  // Función para filtrar repartidores
  const filteredStaff = deliveryStaff.filter(staff => {
    const matchSearchTerm = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || staff.status === statusFilter;
    const matchZone = !zoneFilter || staff.zone === zoneFilter;
    const matchDisabled = !disabledFilter || 
      (disabledFilter === 'active' && !staff.disabled) ||
      (disabledFilter === 'disabled' && staff.disabled);
    
    return matchSearchTerm && matchStatus && matchZone && matchDisabled;
  });

  // Función para abrir modal de repartidor
  const abrirModalRepartidor = (staff, modo) => {
    setModalMode(modo);
    if (modo === 'crear') {
      setModalRepartidor({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        estado: 'available',
        vehiculo: { tipo: 'Motocicleta', modelo: '', capacidad: '' },
        zona: 'Centro',
        fechaContratacion: ''
      });
    } else {
      setModalRepartidor({
        id: staff.id,
        nombre: staff.name,
        apellido: '',
        email: staff.email,
        telefono: staff.phone,
        estado: staff.status,
        vehiculo: { tipo: staff.vehicle, modelo: '', capacidad: '' },
        zona: staff.zone,
        fechaContratacion: ''
      });
    }
    setShowModal(true);
  };

  // Función para guardar repartidor
  const guardarRepartidor = (formData) => {
    if (modalMode === 'crear') {
      // Convertir datos del formulario al formato del contexto
      const newStaff = {
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        vehicle: formData.vehiculo?.tipo || 'Motocicleta',
        zone: formData.zona,
        status: formData.estado
      };
      addDeliveryStaff(newStaff);
    } else if (modalMode === 'editar') {
      // Convertir datos del formulario al formato del contexto para actualización
      const updates = {
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        vehicle: formData.vehiculo?.tipo || 'Motocicleta',
        zone: formData.zona,
        status: formData.estado
      };
      updateDeliveryStaff(modalRepartidor.id, updates);
    }
    setShowModal(false);
    setModalRepartidor(null);
  };

  // Función para eliminar repartidor
  const eliminarRepartidor = (id) => {
    const repartidor = deliveryStaff.find(staff => staff.id === id);
    const nombreCompleto = repartidor ? repartidor.name : 'este repartidor';
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${nombreCompleto}? Esta acción no se puede deshacer.`)) {
      deleteDeliveryStaff(id);
      // Opcional: mostrar notificación de éxito
      console.log(`Repartidor ${nombreCompleto} eliminado exitosamente`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Repartidores</h1>
          <p className="text-gray-600 mt-1">Administra tu equipo de reparto</p>
        </div>
        <button 
          onClick={() => abrirModalRepartidor(null, 'crear')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <UserPlus className="mr-2" size={20} /> Nuevo Repartidor
        </button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {metricas.map((metrica, index) => (
          <div key={index} className={`${metrica.color} rounded-lg p-6 border`}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-white">
                {metrica.icon}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{metrica.label}</p>
              <p className="text-3xl font-bold text-gray-900">{metrica.value}</p>
              {metrica.subtitle && (
                <p className="text-xs text-gray-600 mt-1">{metrica.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="min-w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="available">Disponible</option>
              <option value="busy">Ocupado</option>
              <option value="offline">Desconectado</option>
            </select>
          </div>

          <div className="min-w-48">
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las zonas</option>
              <option value="Centro">Centro</option>
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
            </select>
          </div>

          <div className="min-w-48">
            <select
              value={disabledFilter}
              onChange={(e) => setDisabledFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="active">Solo Activos</option>
              <option value="disabled">Solo Deshabilitados</option>
            </select>
          </div>

          <div className="min-w-48">
            <select
              value={disabledFilter}
              onChange={(e) => setDisabledFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="active">Solo Activos</option>
              <option value="disabled">Solo Deshabilitados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Repartidores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <StaffCard 
            key={staff.id}
            repartidor={{
              id: staff.id,
              nombre: staff.name,
              apellido: '', // Agregar apellido vacío por ahora
              email: staff.email,
              telefono: staff.phone,
              estado: staff.status,
              vehiculo: { tipo: staff.vehicle },
              zona: staff.zone,
              rating: staff.rating,
              entregas: staff.deliveries,
              eficiencia: staff.efficiency,
              experiencia: staff.experience,
              disabled: staff.disabled
            }}
            metricas={{
              entregasTotales: staff.deliveries,
              calificacion: staff.rating,
              kmRecorridos: Math.floor(Math.random() * 500 + 100) // Simulado
            }}
            onEditClick={() => abrirModalRepartidor(staff, 'editar')}
            onDeleteClick={eliminarRepartidor}
            onToggleDisable={toggleDisableStaff}
          />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron repartidores</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || zoneFilter || disabledFilter
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primer repartidor'
            }
          </p>
          {!searchTerm && !statusFilter && !zoneFilter && !disabledFilter && (
            <button
              onClick={() => abrirModalRepartidor(null, 'crear')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Agregar Repartidor
            </button>
          )}
        </div>
      )}

      {/* Modal de Repartidor */}
      {showModal && (
        <StaffModal
          repartidor={modalRepartidor}
          mode={modalMode}
          onClose={() => {
            setShowModal(false);
            setModalRepartidor(null);
          }}
          onSave={guardarRepartidor}
        />
      )}
    </div>
  );
};

export default DeliveryStaffManagement;
