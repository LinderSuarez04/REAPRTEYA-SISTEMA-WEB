import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import DeliveryManagement from '../../pages/DeliveryManagement';
import DeliveryStaffManagement from '../../pages/DeliveryStaffManagement';
import Reports from '../../pages/Reports';

const MainLayout = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'deliveries':
        return <DeliveryManagement />;
      case 'delivery-staff':
        return <DeliveryStaffManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar 
        onMenuChange={setCurrentPage} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        } flex-1`}
      >
        {/* Espacio para el botón hamburguesa en dispositivos móviles */}
        <div className="h-16 lg:hidden"></div>
        {renderPage()}
      </div>
    </div>
  );
};

export default MainLayout;