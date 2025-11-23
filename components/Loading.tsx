import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4 relative z-10" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Constructing Your Campus</h2>
        <p className="text-slate-500">Our AI architects are laying the foundation...</p>
      </div>
    </div>
  );
};

export default Loading;