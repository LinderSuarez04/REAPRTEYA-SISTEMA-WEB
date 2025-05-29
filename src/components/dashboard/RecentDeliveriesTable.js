import React from 'react';

const RecentDeliveriesTable = ({ deliveries }) => {
  // Función para obtener el color de estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Completada':
        return 'bg-green-200 text-green-800';
      case 'En Proceso':
        return 'bg-yellow-200 text-yellow-800';
      case 'Pendiente':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Entregas Recientes
      </h2>
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="p-3 text-left text-sm font-medium text-gray-600">Cliente</th>
            <th className="p-3 text-left text-sm font-medium text-gray-600">Estado</th>
            <th className="p-3 text-left text-sm font-medium text-gray-600">Fecha</th>
            <th className="p-3 text-left text-sm font-medium text-gray-600">Repartidor</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr 
              key={delivery.id} 
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="p-3 text-sm">{delivery.id}</td>
              <td className="p-3 text-sm">{delivery.cliente}</td>
              <td className="p-3">
                <span className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${getStatusColor(delivery.estado)}
                `}>
                  {delivery.estado}
                </span>
              </td>
              <td className="p-3 text-sm">{delivery.fecha}</td>
              <td className="p-3 text-sm">{delivery.repartidor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDeliveriesTable;