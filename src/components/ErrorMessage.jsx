import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, resolution }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
      <div className="flex items-center">
        <AlertCircle className="h-6 w-6 mr-2" />
        <p className="font-bold">Error</p>
      </div>
      <p className="mt-2">{message}</p>
      {resolution && (
        <p className="mt-2">
          <strong>How to resolve:</strong> {resolution}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;