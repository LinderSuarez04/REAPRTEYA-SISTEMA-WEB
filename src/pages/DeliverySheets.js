import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DeliverySheets = () => {
  const { 
    deliverySheets, 
    addDeliverySheet, 
    updateDeliverySheet, 
    deleteDeliverySheet,
    documents,
    getPendingDocuments,
    deliveryStaff,
    getAvailableDrivers
  } = useApp();

  const [selectedSheet, setSelectedSheet] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddOrdersModal, setShowAddOrdersModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [newSheetData, setNewSheetData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    shift: 'morning',
    driverId: '',
    zone: 'Centro',
    documents: []
  });

  useEffect(() => {
    if (deliverySheets.length > 0 && !selectedSheet) {
      setSelectedSheet(deliverySheets[0]);
      setSelectedOrders(deliverySheets[0].documents || []);
    }
  }, [deliverySheets, selectedSheet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSheetData({
      ...newSheetData,
      [name]: value
    });
  };

  // Obtener documentos disponibles (pendientes)
  const availableDocuments = getPendingDocuments();

  // Filtrar documentos disponibles basado en la búsqueda
  const filteredDocuments = availableDocuments.filter(doc =>
    doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener documentos seleccionados de la hoja actual
  const getSelectedDocuments = () => {
    if (!selectedSheet) return [];
    return selectedSheet.documents.map(docId => 
      documents.find(doc => doc.id === docId)
    ).filter(doc => doc);
  };

  // Mover documento de disponibles a seleccionados
  const moveToSelected = (document) => {
    if (!selectedOrders.includes(document.id)) {
      setSelectedOrders([...selectedOrders, document.id]);
    }
  };

  // Remover documento de seleccionados
  const removeFromSelected = (documentId) => {
    setSelectedOrders(selectedOrders.filter(id => id !== documentId));
  };

  // Mover todos los documentos filtrados a seleccionados
  const moveAllToSelected = () => {
    const newSelected = [...selectedOrders];
    filteredDocuments.forEach(doc => {
      if (!newSelected.includes(doc.id)) {
        newSelected.push(doc.id);
      }
    });
    setSelectedOrders(newSelected);
  };

  // Remover todos los documentos seleccionados
  const removeAllSelected = () => {
    setSelectedOrders([]);
  };

  // Crear nueva hoja de reparto
  const handleCreateSheet = () => {
    const driver = deliveryStaff.find(s => s.id === parseInt(newSheetData.driverId));
    if (!driver) {
      alert('Seleccione un repartidor válido');
      return;
    }

    const newSheet = addDeliverySheet({
      ...newSheetData,
      driver: driver.name,
      documents: []
    });
    
    setSelectedSheet(newSheet);
    setShowCreateModal(false);
    setNewSheetData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      shift: 'morning',
      driverId: '',
      zone: 'Centro',
      documents: []
    });
  };

  // Guardar documentos seleccionados en la hoja actual
  const handleSaveSelectedDocuments = () => {
    if (!selectedSheet) return;
    
    updateDeliverySheet(selectedSheet.id, {
      documents: selectedOrders
    });
    
    setShowAddOrdersModal(false);
  };

  // Eliminar hoja de reparto
  const handleDeleteSheet = () => {
    if (!selectedSheet) return;
    
    if (window.confirm('¿Está seguro de eliminar esta hoja de reparto?')) {
      deleteDeliverySheet(selectedSheet.id);
      setSelectedSheet(deliverySheets.length > 1 ? deliverySheets[0] : null);
    }
  };

  // Calcular totales de la hoja actual
  const calculateTotals = () => {
    const selectedDocs = getSelectedDocuments();
    const totalAmount = selectedDocs.reduce((sum, doc) => sum + (doc?.total || 0), 0);
    const totalOrders = selectedDocs.length;
    const totalWeight = selectedDocs.reduce((sum, doc) => sum + (Math.random() * 10 + 5), 0); // Peso simulado
    
    return {
      totalAmount,
      totalOrders,
      totalWeight
    };
  };

  const { totalAmount, totalOrders, totalWeight } = calculateTotals();

  const zones = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'];
  const shifts = [
    { value: 'morning', label: 'Mañana' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'evening', label: 'Noche' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header con lista de hojas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Hojas de Reparto</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700"
          >
            <Plus className="mr-2" /> Nueva Hoja
          </button>
        </div>

        {/* Selector de hojas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Hoja de Reparto</label>
          <div className="flex space-x-4">
            <select
              value={selectedSheet?.id || ''}
              onChange={(e) => {
                const sheet = deliverySheets.find(s => s.id === e.target.value);
                setSelectedSheet(sheet);
                setSelectedOrders(sheet?.documents || []);
              }}
              className="flex-1 p-2 border rounded-md"
            >
              {deliverySheets.length === 0 ? (
                <option value="">No hay hojas de reparto</option>
              ) : (
                deliverySheets.map(sheet => (
                  <option key={sheet.id} value={sheet.id}>
                    {sheet.name} - {sheet.date} ({sheet.driver})
                  </option>
                ))
              )}
            </select>
            {selectedSheet && (
              <button 
                onClick={handleDeleteSheet}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {selectedSheet && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{selectedSheet.name}</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
                  <Save className="mr-2" /> Guardar
                </button>
                <button 
                  onClick={() => setShowAddOrdersModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700"
                >
                  <Plus className="mr-2" /> Agregar Pedidos
                </button>
              </div>
            </div>

            {/* Información de la hoja */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Hoja</label>
                <input
                  type="text"
                  value={selectedSheet.name}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={selectedSheet.date}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
                <input
                  type="text"
                  value={selectedSheet.zone}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repartidor</label>
                <input
                  type="text"
                  value={selectedSheet.driver}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
                <input
                  type="text"
                  value={selectedSheet.shift === 'morning' ? 'Mañana' : selectedSheet.shift === 'afternoon' ? 'Tarde' : 'Noche'}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSheet.status === 'active' ? 'bg-green-100 text-green-800' :
                  selectedSheet.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                  selectedSheet.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedSheet.status === 'active' ? 'Activa' :
                   selectedSheet.status === 'planning' ? 'Planificando' :
                   selectedSheet.status === 'completed' ? 'Completada' : selectedSheet.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Importe</label>
                <input
                  type="text"
                  readOnly
                  value={`S/ ${totalAmount.toFixed(2)}`}
                  className="w-full p-2 border rounded-md bg-yellow-100 text-right font-bold text-red-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso Total (kg)</label>
                <input
                  type="text"
                  readOnly
                  value={totalWeight.toFixed(2)}
                  className="w-full p-2 border rounded-md bg-yellow-100 text-right font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"># Pedidos</label>
                <input
                  type="text"
                  readOnly
                  value={totalOrders}
                  className="w-full p-2 border rounded-md bg-yellow-100 text-right font-bold"
                />
              </div>
            </div>

            {/* Tabla de pedidos */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pedido</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSelectedDocuments().map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{order.id}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2 truncate max-w-xs">{order.address}</td>
                      <td className="px-4 py-2">{order.phone}</td>
                      <td className="px-4 py-2 truncate max-w-xs">{order.items.join(', ')}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          order.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.priority === 'urgent' ? 'Urgente' :
                           order.priority === 'high' ? 'Alta' :
                           order.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right font-medium">S/ {order.total.toFixed(2)}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => removeFromSelected(order.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {getSelectedDocuments().length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        No hay pedidos en esta hoja de reparto. Haga clic en "Agregar Pedidos" para añadir pedidos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {deliverySheets.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="mb-4">No hay hojas de reparto creadas.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Crear Primera Hoja
            </button>
          </div>
        )}
      </div>

      {/* Modal de Crear Nueva Hoja */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Nueva Hoja de Reparto</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Hoja</label>
                <input
                  type="text"
                  name="name"
                  value={newSheetData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ej: Hoja Centro - Mañana"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newSheetData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
                <select
                  name="zone"
                  value={newSheetData.zone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
                <select
                  name="shift"
                  value={newSheetData.shift}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  {shifts.map(shift => (
                    <option key={shift.value} value={shift.value}>{shift.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repartidor</label>
                <select
                  name="driverId"
                  value={newSheetData.driverId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Seleccione un repartidor</option>
                  {getAvailableDrivers().map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.zone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateSheet}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Crear Hoja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Pedidos */}
      {showAddOrdersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] p-6">
            {/* Header del Modal */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Agregar Pedidos</h2>
              <button 
                onClick={() => setShowAddOrdersModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido de dos columnas */}
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Columna Izquierda - Documentos Disponibles */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Pedidos disponibles</h3>
                  <button 
                    onClick={moveAllToSelected}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Seleccionar Todo
                  </button>
                </div>
                
                {/* Buscador */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, dirección o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>

                {/* Lista de Documentos Disponibles */}
                <div className="overflow-y-auto h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 text-left">Seleccionar</th>
                        <th className="px-2 py-1 text-left">ID</th>
                        <th className="px-2 py-1 text-left">Cliente</th>
                        <th className="px-2 py-1 text-left">Dirección</th>
                        <th className="px-2 py-1 text-left">Prioridad</th>
                        <th className="px-2 py-1 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr 
                          key={doc.id} 
                          className="hover:bg-gray-50 border-b cursor-pointer"
                          onClick={() => moveToSelected(doc)}
                        >
                          <td className="px-2 py-1">
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(doc.id)}
                              onChange={() => moveToSelected(doc)}
                              className="rounded"
                            />
                          </td>
                          <td className="px-2 py-1 font-medium">{doc.id}</td>
                          <td className="px-2 py-1">{doc.customer}</td>
                          <td className="px-2 py-1 truncate max-w-32">{doc.address}</td>
                          <td className="px-2 py-1">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              doc.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              doc.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              doc.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {doc.priority === 'urgent' ? 'Urgente' :
                               doc.priority === 'high' ? 'Alta' :
                               doc.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-right">S/ {doc.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredDocuments.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No hay pedidos disponibles
                    </div>
                  )}
                </div>
              </div>

              {/* Columna Derecha - Documentos Seleccionados */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Pedidos seleccionados</h3>
                  <button 
                    onClick={removeAllSelected}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Quitar Todo
                  </button>
                </div>

                {/* Lista de Documentos Seleccionados */}
                <div className="overflow-y-auto h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 text-left">ID</th>
                        <th className="px-2 py-1 text-left">Cliente</th>
                        <th className="px-2 py-1 text-left">Dirección</th>
                        <th className="px-2 py-1 text-left">Prioridad</th>
                        <th className="px-2 py-1 text-right">Total</th>
                        <th className="px-2 py-1">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrders.map((orderId) => {
                        const doc = documents.find(d => d.id === orderId);
                        if (!doc) return null;
                        return (
                          <tr key={doc.id} className="hover:bg-gray-50 border-b">
                            <td className="px-2 py-1 font-medium">{doc.id}</td>
                            <td className="px-2 py-1">{doc.customer}</td>
                            <td className="px-2 py-1 truncate max-w-32">{doc.address}</td>
                            <td className="px-2 py-1">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                doc.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                doc.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                doc.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {doc.priority === 'urgent' ? 'Urgente' :
                                 doc.priority === 'high' ? 'Alta' :
                                 doc.priority === 'medium' ? 'Media' : 'Baja'}
                              </span>
                            </td>
                            <td className="px-2 py-1 text-right">S/ {doc.total.toFixed(2)}</td>
                            <td className="px-2 py-1">
                              <button
                                onClick={() => removeFromSelected(doc.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  {selectedOrders.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No hay pedidos seleccionados
                    </div>
                  )}
                </div>

                {/* Resumen de seleccionados */}
                {selectedOrders.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <div className="text-sm">
                      <p><strong>Total pedidos:</strong> {selectedOrders.length}</p>
                      <p><strong>Total importe:</strong> S/ {selectedOrders.reduce((sum, orderId) => {
                        const doc = documents.find(d => d.id === orderId);
                        return sum + (doc?.total || 0);
                      }, 0).toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
              <button 
                onClick={() => setShowAddOrdersModal(false)}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveSelectedDocuments}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar Selección
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverySheets;