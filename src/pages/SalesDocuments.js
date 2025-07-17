import React, { useState } from 'react';
import { Search, Calendar, FileCheck } from 'lucide-react';

const SalesDocuments = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Datos simulados basados en la imagen
  const documents = [
    {id: 'B170-0008471', emisión: '1/31/2024', razónSocial: 'VARGAS IRIGOIN HADA YESSICA', dirección: 'CAL. LAS PALMERAS 200 PISO 2 MCDO MOSHOQUEQUEC', fp: 'CO', vendedor: 'G - BAXTER MONDOY', total: 1150.00},
    {id: 'B170-0008471', emisión: '1/31/2024', razónSocial: 'VARGAS IRIGOIN HADA YESSICA', dirección: 'CAL. LAS PALMERAS 200 PISO 2 MCDO MOSHOQUEQUEC', fp: 'CO', vendedor: 'G - BAXTER MONDOY', total: 921.60},
    {id: 'F120-0002251', emisión: '2/1/2024', razónSocial: 'DE LOS SANTOS SANTISTEBAN GERSON', dirección: 'AV. NICOLAS AYLLON 1099 - JOSE LEONARDO ORTIZ', fp: 'CO', vendedor: 'E - TULIO CHECA', total: 49.93},
    {id: 'F120-0002252', emisión: '2/1/2024', razónSocial: 'GALVEZ QUIROZ MARISOL', dirección: 'CAL. ESPAÑA 998 I SEC.URB. BRUNAGA', fp: 'CO', vendedor: 'E - TULIO CHECA', total: 33.43},
    {id: 'F120-0002253', emisión: '2/1/2024', razónSocial: 'NEGOCIOS GENERALES SAN JUAN-LLA', dirección: 'CAL. MOCHICAS MZ C LT 12 VILLA EL SOL - JOSE LEONARDO', fp: 'CO', vendedor: 'E - TULIO CHECA', total: 275.44},
    {id: 'B170-0008472', emisión: '2/1/2024', razónSocial: 'ASENJO NAVAL MARIA ROSARIO', dirección: 'CAL. PUERTO RICO 135 P.J. LUJAN - JOSE LEONARDO', fp: 'CO', vendedor: 'E - TULIO CHECA', total: 87.50},
  ];
  
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedDocuments(documents.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (id) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.razónSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSeleccionado = selectedDocuments
    .map(id => documents.find(doc => doc.id === id)?.total || 0)
    .reduce((sum, total) => sum + total, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Documentos de Venta pendientes de Reparto</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
          >
            <FileCheck className="mr-2" /> Procesar
          </button>
          <button 
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Filtros de fecha y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-2 border rounded-md pl-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-2 border rounded-md pl-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="w-full p-2 border rounded-l-md pl-10"
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
              <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Totales y selección */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-1"
            />
            Seleccionar todos los documentos
          </label>
        </div>
        <div className="text-lg font-bold">
          Total Seleccionado: <span className="text-red-600">{totalSeleccionado.toFixed(2)}</span>
        </div>
      </div>

      {/* Tabla de documentos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seleccionar</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TD</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro Documento</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emisión</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Social / Nombres</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input 
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                  />
                </td>
                <td className="px-4 py-2">{doc.id.substring(0, 1)}</td>
                <td className="px-4 py-2">{doc.id}</td>
                <td className="px-4 py-2">{doc.emisión}</td>
                <td className="px-4 py-2">{doc.razónSocial}</td>
                <td className="px-4 py-2 truncate max-w-xs">{doc.dirección}</td>
                <td className="px-4 py-2">{doc.fp}</td>
                <td className="px-4 py-2">{doc.vendedor}</td>
                <td className="px-4 py-2 text-right">{doc.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDocuments;