import React from 'react';
import { Award, Truck, Star, Edit, Trash2 } from 'lucide-react';

const StaffCard = ({ repartidor, metricas, onEditClick }) => {
  // Función para obtener color de estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo': return 'bg-green-200 text-green-800';
      case 'Inactivo': return 'bg-gray-200 text-gray-800';
      case 'Suspendido': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {`${repartidor.nombre} ${repartidor.apellido}`}
        </h2>
        <span className={`
          px-2 py-1 rounded text-xs font-medium
          ${getEstadoColor(repartidor.estado)}
        `}>
          {repartidor.estado}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <Award className="mr-2 text-gray-500" size={20} />
          <span>{repartidor.email}</span>
        </div>
        <div className="flex items-center">
          <Truck className="mr-2 text-gray-500" size={20} />
          {repartidor.vehiculo 
            ? `${repartidor.vehiculo.tipo} - ${repartidor.vehiculo.modelo}`
            : 'Sin vehículo asignado'}
        </div>
      </div>

      {metricas && (
        <div className="grid grid-cols-3 gap-2 bg-gray-100 rounded p-3">
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

      <div className="flex justify-end space-x-2 mt-4">
        <button 
          onClick={() => onEditClick(repartidor, 'ver')}
          className="text-blue-500 hover:text-blue-700"
        >
          <Edit size={20} />
        </button>
        <button 
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default StaffCard;