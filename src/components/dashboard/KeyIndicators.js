import React from 'react';

const KeyIndicators = ({ indicators }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {indicators.map((indicator) => (
        <div 
          key={indicator.label} 
          className={`
            ${indicator.color} 
            p-4 rounded-lg shadow-md flex items-center justify-between 
            transform transition hover:scale-105
          `}
        >
          <div>
            <div className="text-2xl font-bold">{indicator.value}</div>
            <div className="text-sm mt-1">{indicator.label}</div>
          </div>
          <div className="opacity-75">{indicator.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default KeyIndicators;