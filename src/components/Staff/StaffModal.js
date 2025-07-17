import React, { useState, useEffect } from 'react';

const StaffModal = ({ repartidor, mode, onClose, onSave }) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
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

  // Inicializar el formulario con los datos del repartidor
  useEffect(() => {
    if (repartidor) {
      setFormData(repartidor);
    }
  }, [repartidor]);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('vehiculo.')) {
      const vehiculoProp = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehiculo: {
          ...prev.vehiculo,
          [vehiculoProp]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

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

        <form onSubmit={handleSubmit}>
          {/* Contenido del Modal (Formulario) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">ID de Repartidor</label>
              <input 
                type="text" 
                name="id"
                value={formData.id || 'AUTO-GENERADO'} 
                readOnly 
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-2">Nombre</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre || ''} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
                required={mode !== 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Apellido</label>
              <input 
                type="text" 
                name="apellido"
                value={formData.apellido || ''} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email || ''} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
                required={mode !== 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Teléfono</label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono || ''} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Estado</label>
              <select 
                name="estado"
                className="w-full p-2 border rounded"
                value={formData.estado || 'available'}
                onChange={handleInputChange}
                disabled={mode === 'ver'}
              >
                <option value="available">Disponible</option>
                <option value="busy">Ocupado</option>
                <option value="offline">Desconectado</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Zona de Trabajo</label>
              <input 
                type="text" 
                name="zona"
                value={formData.zona || ''} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                readOnly={mode === 'ver'}
              />
            </div>
            <div>
              <label className="block mb-2">Fecha de Contratación</label>
              <input 
                type="date" 
                name="fechaContratacion"
                value={formData.fechaContratacion || ''} 
                onChange={handleInputChange}
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
                <select
                  name="vehiculo.tipo"
                  value={formData.vehiculo?.tipo || 'Motocicleta'} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  disabled={mode === 'ver'}
                >
                  <option value="Motocicleta">Motocicleta</option>
                  <option value="Bicicleta">Bicicleta</option>
                  <option value="Auto">Auto</option>
                  <option value="Camioneta">Camioneta</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Modelo</label>
                <input 
                  type="text" 
                  name="vehiculo.modelo"
                  value={formData.vehiculo?.modelo || ''} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  readOnly={mode === 'ver'}
                />
              </div>
              <div>
                <label className="block mb-2">Capacidad (m³)</label>
                <input 
                  type="number" 
                  name="vehiculo.capacidad"
                  value={formData.vehiculo?.capacidad || ''} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  readOnly={mode === 'ver'}
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Botones del Modal */}
          <div className="flex justify-end space-x-4 mt-6">
            {mode !== 'ver' && (
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {mode === 'crear' ? 'Crear Repartidor' : 'Guardar Cambios'}
              </button>
            )}
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;