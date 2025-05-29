import React from 'react';

const StaffModal = ({ repartidor, mode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'crear' 
              ? 'Crear Nuevo Repartidor' 
              : mode === 'editar' 
              ? 'Editar Repartidor' 
              : 'Detalle de Repartidor'}
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
            <label className="block mb-2">ID de Repartidor</label>
            <input 
              type="text" 
              value={repartidor.id} 
              readOnly 
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2">Nombre</label>
            <input 
              type="text" 
              value={repartidor.nombre || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Apellido</label>
            <input 
              type="text" 
              value={repartidor.apellido || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input 
              type="email" 
              value={repartidor.email || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Teléfono</label>
            <input 
              type="tel" 
              value={repartidor.telefono || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <select 
              className="w-full p-2 border rounded"
              value={repartidor.estado || 'Activo'}
              disabled={mode === 'ver'}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Suspendido">Suspendido</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Fecha de Contratación</label>
            <input 
              type="date" 
              value={repartidor.fechaContratacion || ''} 
              className="w-full p-2 border rounded"
              readOnly={mode === 'ver'}
            />
          </div>
        </div>

        {/* Sección de vehículo */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-3">Información del Vehículo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Tipo de Vehículo</label>
              <input 
                type="text" 
                value={repartidor.vehiculo?.tipo || ''} 
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Modelo</label>
              <input 
                type="text" 
                value={repartidor.vehiculo?.modelo || ''} 
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Capacidad (m³)</label>
              <input 
                type="number" 
                value={repartidor.vehiculo?.capacidad || ''} 
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
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

export default StaffModal;