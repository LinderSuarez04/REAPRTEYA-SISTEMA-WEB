import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import ForgotPassword from './ForgotPassword';

const Login = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!dni.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    // Simulamos una autenticación (en un escenario real, esto se haría con una API)
    // Para pruebas, aceptamos cualquier combinación de usuario/contraseña
    setError('');
    onLogin();
  };

  // Si se debe mostrar la pantalla de olvidaste contraseña
  if (showForgotPassword) {
    return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-600 text-white h-20 w-20 rounded-full flex items-center justify-center mb-4">
            <Truck size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            ReparteYA
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="dni"
              name="dni"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="text-center">
            <button 
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-500 underline cursor-pointer bg-transparent border-none p-0"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;