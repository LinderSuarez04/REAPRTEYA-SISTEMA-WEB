import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const PerformanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Rendimiento de Entregas
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="mes" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '8px', 
              border: '1px solid #e0e0e0' 
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="entregas" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 6, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;