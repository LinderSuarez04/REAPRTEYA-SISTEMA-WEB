import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Truck,
  Mail,
  Database,
  Smartphone,
  Monitor,
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Estados para configuraciones
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'ReparteYA',
    timezone: 'America/Lima',
    language: 'es',
    currency: 'PEN',
    dateFormat: 'DD/MM/YYYY'
  });

  const [userSettings, setUserSettings] = useState({
    firstName: 'Admin',
    lastName: 'Usuario',
    email: 'admin@reparteya.com',
    phone: '+51 999 888 777',
    role: 'Administrador',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    deliveryAlerts: true,
    systemAlerts: true,
    reportAlerts: false,
    soundEnabled: true,
    frequency: 'immediate'
  });

  const [deliverySettings, setDeliverySettings] = useState({
    defaultDeliveryTime: '30',
    maxDeliveryRadius: '25',
    allowWeekendDelivery: true,
    requireSignature: false,
    enableTracking: true,
    autoAssignRoutes: true,
    maxOrdersPerRoute: '15',
    deliveryFee: '5.00'
  });

  const [systemSettings, setSystemSettings] = useState({
    backupFrequency: 'daily',
    autoLogout: '30',
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: '1000',
    maxFileSize: '10'
  });

  const categories = [
    {
      id: 'general',
      name: 'General',
      icon: <SettingsIcon size={20} />,
      description: 'Configuración básica del sistema'
    },
    {
      id: 'user',
      name: 'Perfil de Usuario',
      icon: <User size={20} />,
      description: 'Información personal y cuenta'
    },
    {
      id: 'notifications',
      name: 'Notificaciones',
      icon: <Bell size={20} />,
      description: 'Alertas y avisos del sistema'
    },
    {
      id: 'delivery',
      name: 'Entregas',
      icon: <Truck size={20} />,
      description: 'Configuración de servicios de entrega'
    },
    {
      id: 'system',
      name: 'Sistema',
      icon: <Database size={20} />,
      description: 'Configuración técnica avanzada'
    }
  ];

  const handleSave = () => {
    // Aquí iría la lógica para guardar en el backend
    setHasChanges(false);
    // Simular guardado exitoso
    setTimeout(() => {
      alert('Configuración guardada exitosamente');
    }, 500);
  };

  const handleReset = () => {
    // Resetear a valores por defecto
    setHasChanges(false);
    alert('Configuración restablecida a valores por defecto');
  };

  const updateSetting = (category, field, value) => {
    setHasChanges(true);
    switch(category) {
      case 'general':
        setGeneralSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'user':
        setUserSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'delivery':
        setDeliverySettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'system':
        setSystemSettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            value={generalSettings.companyName}
            onChange={(e) => updateSetting('general', 'companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zona Horaria
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="America/Lima">Lima (UTC-5)</option>
            <option value="America/Bogota">Bogotá (UTC-5)</option>
            <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
            <option value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-3)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Idioma
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Moneda
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => updateSetting('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="PEN">Soles Peruanos (S/)</option>
            <option value="USD">Dólares (USD)</option>
            <option value="EUR">Euros (EUR)</option>
            <option value="COP">Pesos Colombianos (COP)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formato de Fecha
          </label>
          <select
            value={generalSettings.dateFormat}
            onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            value={userSettings.firstName}
            onChange={(e) => updateSetting('user', 'firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido
          </label>
          <input
            type="text"
            value={userSettings.lastName}
            onChange={(e) => updateSetting('user', 'lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={userSettings.email}
            onChange={(e) => updateSetting('user', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={userSettings.phone}
            onChange={(e) => updateSetting('user', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Actual
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userSettings.currentPassword}
                onChange={(e) => updateSetting('user', 'currentPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={userSettings.newPassword}
              onChange={(e) => updateSetting('user', 'newPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={userSettings.confirmPassword}
              onChange={(e) => updateSetting('user', 'confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tipos de Notificación</h3>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Notificaciones por Email', icon: <Mail size={16} /> },
              { key: 'smsNotifications', label: 'Notificaciones por SMS', icon: <Smartphone size={16} /> },
              { key: 'pushNotifications', label: 'Notificaciones Push', icon: <Monitor size={16} /> },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings[item.key]}
                    onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Categorías de Alerta</h3>
          <div className="space-y-4">
            {[
              { key: 'deliveryAlerts', label: 'Alertas de Entrega', icon: <Truck size={16} /> },
              { key: 'systemAlerts', label: 'Alertas del Sistema', icon: <AlertTriangle size={16} /> },
              { key: 'reportAlerts', label: 'Reportes Automáticos', icon: <Info size={16} /> },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings[item.key]}
                    onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frecuencia de Notificaciones
          </label>
          <select
            value={notificationSettings.frequency}
            onChange={(e) => updateSetting('notifications', 'frequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="immediate">Inmediato</option>
            <option value="hourly">Cada Hora</option>
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Sonidos Habilitados</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.soundEnabled}
              onChange={(e) => updateSetting('notifications', 'soundEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDeliverySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo de Entrega por Defecto (minutos)
          </label>
          <input
            type="number"
            value={deliverySettings.defaultDeliveryTime}
            onChange={(e) => updateSetting('delivery', 'defaultDeliveryTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Radio Máximo de Entrega (km)
          </label>
          <input
            type="number"
            value={deliverySettings.maxDeliveryRadius}
            onChange={(e) => updateSetting('delivery', 'maxDeliveryRadius', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Máximo de Pedidos por Ruta
          </label>
          <input
            type="number"
            value={deliverySettings.maxOrdersPerRoute}
            onChange={(e) => updateSetting('delivery', 'maxOrdersPerRoute', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarifa de Entrega (S/)
          </label>
          <input
            type="number"
            step="0.01"
            value={deliverySettings.deliveryFee}
            onChange={(e) => updateSetting('delivery', 'deliveryFee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Opciones de Entrega</h3>
          <div className="space-y-4">
            {[
              { key: 'allowWeekendDelivery', label: 'Permitir Entregas en Fin de Semana' },
              { key: 'requireSignature', label: 'Requerir Firma del Cliente' },
              { key: 'enableTracking', label: 'Habilitar Seguimiento GPS' },
              { key: 'autoAssignRoutes', label: 'Asignación Automática de Rutas' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverySettings[item.key]}
                    onChange={(e) => updateSetting('delivery', item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle size={20} className="text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            Configuración Avanzada - Solo para administradores técnicos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frecuencia de Respaldo
          </label>
          <select
            value={systemSettings.backupFrequency}
            onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="hourly">Cada Hora</option>
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cierre de Sesión Automático (minutos)
          </label>
          <input
            type="number"
            value={systemSettings.autoLogout}
            onChange={(e) => updateSetting('system', 'autoLogout', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Límite de Solicitudes API (por hora)
          </label>
          <input
            type="number"
            value={systemSettings.apiRateLimit}
            onChange={(e) => updateSetting('system', 'apiRateLimit', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamaño Máximo de Archivo (MB)
          </label>
          <input
            type="number"
            value={systemSettings.maxFileSize}
            onChange={(e) => updateSetting('system', 'maxFileSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Modos de Sistema</h3>
          <div className="space-y-4">
            {[
              { 
                key: 'maintenanceMode', 
                label: 'Modo de Mantenimiento',
                description: 'Bloquea el acceso para usuarios regulares'
              },
              { 
                key: 'debugMode', 
                label: 'Modo de Depuración',
                description: 'Muestra información técnica detallada'
              },
            ].map((item) => (
              <div key={item.key} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings[item.key]}
                      onChange={(e) => updateSetting('system', item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeCategory) {
      case 'general':
        return renderGeneralSettings();
      case 'user':
        return renderUserSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'delivery':
        return renderDeliverySettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
          <p className="text-gray-600 mt-1">Personaliza el sistema según tus necesidades</p>
        </div>
        
        {/* Botones de acción */}
        {hasChanges && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={16} className="mr-2" />
              Restablecer
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Guardar Cambios
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar de categorías */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'}>
                      {category.icon}
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {categories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {categories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Indicador de cambios */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              Tienes cambios sin guardar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;