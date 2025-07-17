import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Package,
  MapPin,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  Search,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const Reports = () => {
  // Usar el contexto de la aplicación
  const { getStats, deliveryStaff } = useApp();
  
  const [activeTab, setActiveTab] = useState('general');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Obtener estadísticas dinámicas
  const stats = getStats();

  // Datos simulados para métricas generales usando estadísticas reales
  const generalMetrics = [
    {
      title: 'Entregas Totales',
      value: stats.totalDeliveries,
      change: '+12.5%',
      trend: 'up',
      icon: <Package className="text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Tasa de Éxito',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: <CheckCircle2 className="text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Personal Activo',
      value: `${stats.activeStaff}/${stats.totalStaff}`,
      change: stats.activeStaff > stats.totalStaff * 0.8 ? '+8.3%' : '-8.3%',
      trend: stats.activeStaff > stats.totalStaff * 0.8 ? 'up' : 'down',
      icon: <Users className="text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Ingresos',
      value: `S/ ${stats.totalRevenue}`,
      change: '+15.7%',
      trend: 'up',
      icon: <DollarSign className="text-green-600" />,
      color: 'bg-green-50'
    }
  ];

  // Datos para gráficos simulados
  const deliveryData = [
    { day: 'Lun', completed: 180, pending: 20, failed: 5 },
    { day: 'Mar', completed: 195, pending: 15, failed: 3 },
    { day: 'Mié', completed: 210, pending: 25, failed: 8 },
    { day: 'Jue', completed: 185, pending: 18, failed: 4 },
    { day: 'Vie', completed: 220, pending: 30, failed: 6 },
    { day: 'Sáb', completed: 165, pending: 12, failed: 2 },
    { day: 'Dom', completed: 145, pending: 8, failed: 1 }
  ];

  // Reportes disponibles
  const availableReports = [
    {
      id: 1,
      name: 'Reporte de Entregas Diarias',
      description: 'Análisis detallado de entregas por día con métricas de rendimiento',
      icon: <BarChart3 className="text-blue-600" />,
      category: 'Operaciones',
      lastGenerated: '2025-07-05 09:30',
      format: 'PDF, Excel',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Rendimiento de Repartidores',
      description: 'Evaluación individual y comparativa del desempeño del personal',
      icon: <Users className="text-green-600" />,
      category: 'Recursos Humanos',
      lastGenerated: '2025-07-04 16:45',
      format: 'PDF, Excel',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Análisis de Rutas',
      description: 'Optimización y eficiencia de rutas de entrega por zona',
      icon: <MapPin className="text-purple-600" />,
      category: 'Logística',
      lastGenerated: '2025-07-03 14:20',
      format: 'PDF',
      status: 'processing'
    },
    {
      id: 4,
      name: 'Reporte Financiero',
      description: 'Ingresos, costos y rentabilidad por período',
      icon: <DollarSign className="text-yellow-600" />,
      category: 'Finanzas',
      lastGenerated: '2025-07-01 11:15',
      format: 'PDF, Excel',
      status: 'ready'
    },
    {
      id: 5,
      name: 'Satisfacción del Cliente',
      description: 'Encuestas y métricas de calidad del servicio',
      icon: <Star className="text-orange-600" />,
      category: 'Calidad',
      lastGenerated: '2025-06-30 13:30',
      format: 'PDF',
      status: 'ready'
    },
    {
      id: 6,
      name: 'Incidencias y Problemas',
      description: 'Registro de problemas, retrasos y soluciones implementadas',
      icon: <AlertTriangle className="text-red-600" />,
      category: 'Operaciones',
      lastGenerated: '2025-06-29 10:00',
      format: 'PDF, Excel',
      status: 'ready'
    }
  ];

  // Top performers usando datos reales
  const topPerformers = deliveryStaff
    .sort((a, b) => b.deliveries - a.deliveries)
    .slice(0, 5)
    .map(staff => ({
      name: staff.name,
      deliveries: staff.deliveries,
      rating: staff.rating,
      efficiency: staff.efficiency
    }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready': return 'Listo';
      case 'processing': return 'Procesando';
      case 'error': return 'Error';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reportes</h1>
          <p className="text-gray-600 mt-1">Analytics y reportes del sistema de entregas</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="today">Hoy</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Año</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Download size={20} className="mr-2" />
            Exportar Todo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-8 border-b">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reportes Disponibles
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics Avanzado
          </button>
        </div>
      </div>

      {activeTab === 'general' && (
        <>
          {/* Métricas Generales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {generalMetrics.map((metric, index) => (
              <div key={index} className={`${metric.color} rounded-lg p-6 border`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg bg-white">
                    {metric.icon}
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1">{metric.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Entregas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Entregas por Día</h3>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Ver detalles
                </button>
              </div>
              
              {/* Gráfico simulado */}
              <div className="space-y-3">
                {deliveryData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 text-sm text-gray-600">{day.day}</div>
                    <div className="flex-1 flex items-center space-x-1">
                      <div 
                        className="bg-green-500 h-6 rounded-l"
                        style={{ width: `${(day.completed / 250) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500 h-6"
                        style={{ width: `${(day.pending / 250) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-6 rounded-r"
                        style={{ width: `${(day.failed / 250) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 w-16 text-right">
                      {day.completed + day.pending + day.failed}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Leyenda */}
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Completadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Pendientes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Fallidas</span>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Repartidores</h3>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.deliveries} entregas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-sm font-medium">{performer.rating}</span>
                      </div>
                      <p className="text-xs text-gray-600">{performer.efficiency}% eficiencia</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar reporte..."
                    className="pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                <select className="px-4 py-2 border rounded-lg">
                  <option value="">Todas las categorías</option>
                  <option value="operations">Operaciones</option>
                  <option value="hr">Recursos Humanos</option>
                  <option value="logistics">Logística</option>
                  <option value="finance">Finanzas</option>
                  <option value="quality">Calidad</option>
                </select>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
                <FileText size={20} className="mr-2" />
                Nuevo Reporte
              </button>
            </div>
          </div>

          {/* Lista de Reportes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    {report.icon}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{report.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Formato:</span>
                    <span className="font-medium">{report.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última generación:</span>
                    <span className="font-medium">{report.lastGenerated}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center"
                    disabled={report.status === 'processing'}
                  >
                    <Eye size={14} className="mr-1" />
                    Ver
                  </button>
                  <button 
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700 flex items-center justify-center"
                    disabled={report.status === 'processing'}
                  >
                    <Download size={14} className="mr-1" />
                    Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <PieChart size={60} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Analytics Avanzado</h2>
            <p className="text-gray-600 mb-6">
              Análisis profundo con machine learning e inteligencia artificial
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Predicción de Demanda</h3>
                <p className="text-sm text-gray-600">IA para predecir volumen de entregas</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Optimización de Rutas</h3>
                <p className="text-sm text-gray-600">Algoritmos para rutas más eficientes</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Análisis de Comportamiento</h3>
                <p className="text-sm text-gray-600">Patrones de clientes y repartidores</p>
              </div>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Próximamente Disponible
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;