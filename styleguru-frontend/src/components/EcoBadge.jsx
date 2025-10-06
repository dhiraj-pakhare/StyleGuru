import React from 'react';

export default function EcoBadge({ label = 'Eco-friendly' }) {
  return (
    <span className="absolute left-0 top-0 z-10 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-xl rounded-tr-lg shadow-md" style={{transform: 'translate(-10%, -30%)'}}>
      {label}
    </span>
  );
} 