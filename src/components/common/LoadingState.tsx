import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading healthcare information...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="status">
      <Loader2 className="w-8 h-8 text-[#0D9488] animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
};
