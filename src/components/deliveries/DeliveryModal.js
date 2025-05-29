import React from 'react';

const DeliveryModal = ({ delivery, mode, onClose, repartidores }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'crear' 
              ? 'Crear Nueva Entrega' 
              : mode === 'editar' 
              ? 'Editar Entrega' 
              : 'Detalle de Entrega'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Contenido del Modal (Formulario) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">ID de Entrega</label>
            <input 
              type="text" 
              value={delivery.id} 
              readOnly 
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2">Cliente</label>
            <input 
              type="text" 
              value={delivery.cliente || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Dirección</label>
            <input 
              type="text" 
              value={delivery.direccion || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Ciudad</label>
            <input 
              type="text" 
              value={delivery.ciudad || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <select 
              className="w-full p-2 border rounded"
              value={delivery.estado || 'Pendiente'}
              disabled={mode === 'ver'}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Repartidor</label>
            <select 
              className="w-full p-2 border rounded"
              disabled={mode === 'ver'}
            >
              <option value="">Seleccionar repartidor</option>
              {repartidores.map(repartidor => (
                <option 
                  key={repartidor.id} 
                  value={repartidor.id}
                  selected={repartidor.id === delivery.repartidor}
                >
                  {repartidor.nombre} {repartidor.apellido}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Prioridad</label>
            <select 
              className="w-full p-2 border rounded"
              value={delivery.prioridad || 'Baja'}
              disabled={mode === 'ver'}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>

        {/* Botones del Modal */}
        <div className="flex justify-end space-x-4 mt-6">
          {mode !== 'ver' && (
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          )}
          <button 
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;