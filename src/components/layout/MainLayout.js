import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import DeliveryManagement from '../../pages/DeliveryManagement';
import DeliveryStaffManagement from '../../pages/DeliveryStaffManagement';
import Reports from '../../pages/Reports';
import DeliverySheets from '../../pages/DeliverySheets';
import DeliveryRoutes from '../../pages/DeliveryRoutes';
import Settings from '../../pages/Settings';

const MainLayout = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Cambiar a true por defecto

  console.log('MainLayout renderizado - Página actual:', currentPage, 'Sidebar abierto:', isSidebarOpen); // Debug

  // Función para abrir/cerrar el sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Detectar cambios en el tamaño de pantalla para gestionar el sidebar en modo responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Configuración inicial basada en el tamaño de pantalla
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Renderizar la página correspondiente según la selección del menú
  const renderPage = () => {
    console.log('Renderizando página:', currentPage); // Debug
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'delivery-sheets':
        return <DeliverySheets />;
      case 'deliveries':
        return <DeliveryManagement />;
      case 'delivery-staff':
        return <DeliveryStaffManagement />;
      case 'delivery-routes':
        return <DeliveryRoutes />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        onMenuChange={setCurrentPage} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        } flex-1 w-full`}
      >
        {/* Botón hamburguesa para móviles */}
        <div className="h-16 lg:hidden flex items-center justify-start px-4">
          <button 
            className="p-2 bg-gray-800 text-white rounded-md"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Contenido principal */}
        <main className="w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;