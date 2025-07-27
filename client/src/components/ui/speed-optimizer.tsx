import React, { useCallback, useMemo } from 'react';
import { Zap, Clock, CheckCircle } from 'lucide-react';

// ⚡ SPEED OPTIMIZATION Component
export const SpeedOptimizer: React.FC<{
  isProcessing: boolean;
  processingTime?: number;
  toolName: string;
}> = ({ isProcessing, processingTime, toolName }) => {
  
  const speedInfo = useMemo(() => {
    if (processingTime) {
      if (processingTime < 500) {
        return { level: 'Ultra Fast', color: 'text-green-500', icon: <Zap className="w-4 h-4" /> };
      } else if (processingTime < 1000) {
        return { level: 'Fast', color: 'text-blue-500', icon: <Clock className="w-4 h-4" /> };
      } else {
        return { level: 'Normal', color: 'text-yellow-500', icon: <CheckCircle className="w-4 h-4" /> };
      }
    }
    return { level: 'Processing', color: 'text-gray-500', icon: <Clock className="w-4 h-4" /> };
  }, [processingTime]);

  if (!isProcessing && !processingTime) return null;

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className={`flex items-center space-x-1 ${speedInfo.color}`}>
        {speedInfo.icon}
        <span className="text-xs font-medium">
          {isProcessing ? 'Fast Processing...' : `${speedInfo.level} (${processingTime}ms)`}
        </span>
      </div>
      
      {!isProcessing && processingTime && (
        <div className="text-xs text-gray-500">
          ⚡ {toolName} optimized
        </div>
      )}
    </div>
  );
};

// ⚡ Fast Processing Hook
export const useFastProcessing = () => {
  const processWithSpeed = useCallback(async (
    endpoint: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ) => {
    const startTime = Date.now();
    
    try {
      // Start progress immediately
      onProgress?.(10);
      
      const response = await fetch(`/api/tools/${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      onProgress?.(70);
      
      const data = await response.json();
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      onProgress?.(100);
      
      console.log(`⚡ Fast processing completed: ${processingTime}ms`);
      
      return {
        ...data,
        processingTime,
        fastMode: true
      };
    } catch (error) {
      console.error('Fast processing error:', error);
      throw error;
    }
  }, []);

  return { processWithSpeed };
};