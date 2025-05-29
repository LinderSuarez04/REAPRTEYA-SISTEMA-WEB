import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Clock 
} from 'lucide-react';
import KeyIndicators from '../components/dashboard/KeyIndicators';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecentDeliveriesTable from '../components/dashboard/RecentDeliveriesTable';

const Dashboard = () => {
  // Estado para los indicadores y datos
  const [keyIndicators, setKeyIndicators] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [recentDeliveries, setRecentDeliveries] = useState([]);

  // Simulación de carga de datos (normalmente vendría de una API)
  useEffect(() => {
    // Indicadores Clave
    setKeyIndicators([
      {
        label: 'Total Entregas',
        value: 523,
        icon: <Package />,
        color: 'bg-blue-500 text-blue-100'
      },
      {
        label: 'Entregas Completadas',
        value: 456,
        icon: <CheckCircle2 />,
        color: 'bg-green-500 text-green-100'
      },
      {
        label: 'Entregas Pendientes',
        value: 67,
        icon: <Clock />,
        color: 'bg-yellow-500 text-yellow-100'
      },
      {
        label: 'Incidencias',
        value: 12,
        icon: <AlertCircle />,
        color: 'bg-red-500 text-red-100'
      }
    ]);

    // Datos de Rendimiento de Entregas
    setPerformanceData([
      { mes: 'Ene', entregas: 40 },
      { mes: 'Feb', entregas: 55 },
      { mes: 'Mar', entregas: 45 },
      { mes: 'Abr', entregas: 65 },
      { mes: 'May', entregas: 75 }
    ]);

    // Entregas Recientes
    setRecentDeliveries([
      {
        id: 'ENT-001',
        cliente: 'Juan Pérez',
        estado: 'Completada',
        fecha: '2024-05-07',
        repartidor: 'Carlos Martínez'
      },
      {
        id: 'ENT-002',
        cliente: 'María García',
        estado: 'En Proceso',
        fecha: '2024-05-06',
        repartidor: 'Luis Hernández'
      },
      {
        id: 'ENT-003',
        cliente: 'Roberto Sánchez',
        estado: 'Pendiente',
        fecha: '2024-05-05',
        repartidor: 'Ana Rodríguez'
      }
    ]);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Principal</h1>
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-blue-600" />
          <span className="text-gray-600">Última actualización: Hoy</span>
        </div>
      </div>

      {/* Indicadores Clave */}
      <KeyIndicators indicators={keyIndicators} />

      {/* Gráfico de Rendimiento */}
      <PerformanceChart data={performanceData} />

      {/* Entregas Recientes */}
      <RecentDeliveriesTable deliveries={recentDeliveries} />
    </div>
  );
};

export default Dashboard;