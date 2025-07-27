import React from 'react';
import { cn } from '@/lib/utils';

interface FastLoadingProps {
  className?: string;
  text?: string;
  showProgress?: boolean;
}

export const FastLoading: React.FC<FastLoadingProps> = ({ 
  className, 
  text = "Processing...", 
  showProgress = false 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {/* ⚡ FAST Loading Animation - Optimized */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
        <div className="absolute inset-2 w-8 h-8 border-2 border-transparent rounded-full animate-spin border-t-blue-400 animate-reverse"></div>
      </div>
      
      {/* Fast Processing Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          ⚡ {text}
        </p>
        {showProgress && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optimized for speed
          </p>
        )}
      </div>
      
      {/* Progress Bar for Fast Loading */}
      {showProgress && (
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

// ⚡ Fast Processing Indicator
export const FastProcessIndicator: React.FC<{ isProcessing: boolean; toolName?: string }> = ({ 
  isProcessing, 
  toolName = "Tool" 
}) => {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <FastLoading 
          text={`Processing ${toolName}...`}
          showProgress={true}
        />
        <div className="mt-4 text-center">
          <p className="text-xs text-green-600 dark:text-green-400">
            ⚡ Fast Mode: 0.1-1.0 seconds
          </p>
        </div>
      </div>
    </div>
  );
};