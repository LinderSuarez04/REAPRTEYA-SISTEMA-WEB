import React, { useState } from 'react';
import { Truck, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!email.trim()) {
      setError('Por favor, ingrese su email');
      return;
    }
    
    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un email válido');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulamos el envío del email (en un escenario real, esto se haría con una API)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto bg-green-100 text-green-600 h-20 w-20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              ¡Email Enviado!
            </h2>
            <p className="text-gray-600">
              Hemos enviado las instrucciones para restablecer tu contraseña a:
            </p>
            <p className="text-blue-600 font-medium mt-2">{email}</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Próximos pasos:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Revisa tu bandeja de entrada</li>
                <li>• Verifica también la carpeta de spam</li>
                <li>• Sigue las instrucciones del email</li>
                <li>• El enlace expira en 24 horas</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onBackToLogin}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-150"
              >
                Volver al Login
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-150"
              >
                Enviar Otro Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-600 text-white h-20 w-20 rounded-full flex items-center justify-center mb-4">
            <Truck size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-gray-600 text-sm">
            No te preocupes, te enviaremos instrucciones para restablecerla
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email de recuperación
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition duration-150 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Instrucciones'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition duration-150"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver al inicio de sesión
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">¿Necesitas ayuda adicional?</p>
            <div className="space-y-1">
              <p>📧 soporte@reparteya.com</p>
              <p>📞 +51 999 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
