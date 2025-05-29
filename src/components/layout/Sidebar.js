import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  FileText,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const Sidebar = ({ onMenuChange, isSidebarOpen, toggleSidebar, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Definición de los elementos del menú
  const menuItems = [
    { 
      icon: <LayoutDashboard />, 
      label: 'Dashboard', 
      key: 'dashboard' 
    },
    { 
      icon: <Truck />, 
      label: 'Gestión de Entregas', 
      key: 'deliveries' 
    },
    { 
      icon: <Users />, 
      label: 'Repartidores', 
      key: 'delivery-staff' 
    },
    { 
      icon: <FileText />, 
      label: 'Reportes', 
      key: 'reports' 
    }
  ];

  // Función para manejar el cambio de menú
  const handleMenuClick = (key) => {
    setActiveMenu(key);
    if (onMenuChange) {
      onMenuChange(key);
    }
  };

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button 
        className={`fixed top-4 ${isSidebarOpen ? 'left-64' : 'left-4'} z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden transition-all duration-300`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para cerrar sidebar en móviles */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 w-64 bg-gray-800 text-white fixed left-0 top-0 h-screen p-4 
          overflow-y-auto z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="mb-8 text-2xl font-bold text-center py-4 border-b border-gray-700">
          Sistema de Entregas
        </div>
        
        <nav className="mt-4">
          {menuItems.map((item) => (
            <div 
              key={item.key}
              className={`
                flex items-center p-3 mb-2 cursor-pointer rounded transition-colors duration-200
                ${activeMenu === item.key 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
              onClick={() => handleMenuClick(item.key)}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Pie de sidebar con información adicional */}
        <div className="absolute bottom-12 left-0 w-full p-4 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">
            © 2024 Sistema de Entregas
          </p>
        </div>
        
        {/* Botón de cerrar sesión */}
        <div 
          className="absolute bottom-0 left-0 w-full p-4 cursor-pointer hover:bg-red-700 flex items-center justify-center"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          <span className="text-sm">Cerrar sesión</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;