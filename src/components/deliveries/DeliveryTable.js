import React from 'react';
import { MapPin, Edit, Trash2 } from 'lucide-react';

const DeliveryTable = ({ deliveries, repartidores, onEditClick }) => {
  // Función para obtener color de estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completada': return 'bg-green-200 text-green-800';
      case 'En Proceso': return 'bg-yellow-200 text-yellow-800';
      case 'Pendiente': return 'bg-blue-200 text-blue-800';
      case 'Cancelada': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Función para obtener color de prioridad
  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'Baja': return 'bg-green-100 text-green-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Cliente</th>
            <th className="p-3 text-left">Dirección</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Repartidor</th>
            <th className="p-3 text-left">Prioridad</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((entrega) => (
            <tr 
              key={entrega.id} 
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="p-3">{entrega.id}</td>
              <td className="p-3">{entrega.cliente}</td>
              <td className="p-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 text-gray-500" size={16} />
                  {entrega.direccion}
                </div>
              </td>
              <td className="p-3">
                <span className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${getEstadoColor(entrega.estado)}
                `}>
                  {entrega.estado}
                </span>
              </td>
              <td className="p-3">
                {repartidores.find(r => r.id === entrega.repartidor)
                  ? `${repartidores.find(r => r.id === entrega.repartidor)?.nombre} ${repartidores.find(r => r.id === entrega.repartidor)?.apellido}`
                  : 'No asignado'}
              </td>
              <td className="p-3">
                <span className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${getPrioridadColor(entrega.prioridad)}
                `}>
                  {entrega.prioridad}
                </span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEditClick(entrega, 'ver')}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;