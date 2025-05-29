import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reportes</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <FileText size={60} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Módulo de Reportes</h2>
          <p className="text-gray-600">
            Próximamente podrás generar reportes detallados del sistema.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;