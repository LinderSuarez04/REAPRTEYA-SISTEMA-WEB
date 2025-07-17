import React from 'react';
import { Award, Truck, Star, Edit, Trash2, Power } from 'lucide-react';

const StaffCard = ({ repartidor, metricas, onEditClick, onDeleteClick, onToggleDisable }) => {
  // Función para obtener color de estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'available': 
      case 'Activo': 
        return 'bg-green-200 text-green-800';
      case 'busy':
      case 'Ocupado':
        return 'bg-yellow-200 text-yellow-800';
      case 'offline':
      case 'Inactivo': 
        return 'bg-gray-200 text-gray-800';
      case 'Suspendido': 
        return 'bg-red-200 text-red-800';
      default: 
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Función para traducir el estado
  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'available': return 'Disponible';
      case 'busy': return 'Ocupado';
      case 'offline': return 'Desconectado';
      default: return estado;
    }
  };

  // Determinar si el repartidor está deshabilitado
  const isDisabled = repartidor.disabled || false;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${
      isDisabled ? 'opacity-60 border-2 border-red-300' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${isDisabled ? 'text-gray-500' : ''}`}>
          {repartidor.apellido ? `${repartidor.nombre} ${repartidor.apellido}` : repartidor.nombre}
        </h2>
        <div className="flex items-center space-x-2">
          {isDisabled && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
              DESHABILITADO
            </span>
          )}
          <span className={`
            px-2 py-1 rounded text-xs font-medium
            ${isDisabled ? 'bg-gray-200 text-gray-500' : getEstadoColor(repartidor.estado)}
          `}>
            {isDisabled ? 'Inactivo' : getEstadoTexto(repartidor.estado)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className={`flex items-center ${isDisabled ? 'text-gray-500' : ''}`}>
          <Award className="mr-2 text-gray-500" size={20} />
          <span>{repartidor.email}</span>
        </div>
        <div className={`flex items-center ${isDisabled ? 'text-gray-500' : ''}`}>
          <Truck className="mr-2 text-gray-500" size={20} />
          {repartidor.vehiculo 
            ? (repartidor.vehiculo.modelo 
                ? `${repartidor.vehiculo.tipo} - ${repartidor.vehiculo.modelo}`
                : repartidor.vehiculo.tipo)
            : 'Sin vehículo asignado'}
        </div>
      </div>

      {metricas && (
        <div className={`grid grid-cols-3 gap-2 bg-gray-100 rounded p-3 ${isDisabled ? 'opacity-50' : ''}`}>
          <div className="text-center">
            <div className="font-bold">{metricas.entregasTotales}</div>
            <div className="text-xs text-gray-600">Entregas</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Star className="mr-1 text-yellow-500" size={16} />
              <span className="font-bold">{metricas.calificacion}</span>
            </div>
            <div className="text-xs text-gray-600">Calificación</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{metricas.kmRecorridos} km</div>
            <div className="text-xs text-gray-600">Recorridos</div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onToggleDisable && onToggleDisable(repartidor.id)}
          className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
            isDisabled 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <Power size={16} className="mr-1" />
          {isDisabled ? 'Activar' : 'Desactivar'}
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onEditClick(repartidor, 'ver')}
            className={`transition-colors ${
              isDisabled 
                ? 'text-gray-400 hover:text-gray-600' 
                : 'text-blue-500 hover:text-blue-700'
            }`}
            disabled={isDisabled}
          >
            <Edit size={20} />
          </button>
          <button 
            onClick={() => onDeleteClick && onDeleteClick(repartidor.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;