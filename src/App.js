import React, { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import Login from './components/auth/Login';
import { AppProvider } from './context/AppContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Comprobar si hay una sesión guardada
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Función para manejar el login
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AppProvider>
      <div className="App">
        {isAuthenticated ? (
          <MainLayout onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </AppProvider>
  );
}

export default App;
