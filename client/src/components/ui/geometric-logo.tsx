import React from 'react';
import { cn } from '@/lib/utils';

interface GeometricLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const GeometricLogo: React.FC<GeometricLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className 
}) => {
  const sizeClasses = {
    'sm': 'w-8 h-8',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-20 h-20'
  };

  const textSizeClasses = {
    'sm': 'text-lg',
    'md': 'text-xl',
    'lg': 'text-2xl',
    'xl': 'text-3xl'
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {/* Geometric Logo - Same as reference */}
      <div className={cn('relative', sizeClasses[size])}>
        {/* Teal curved shape - top left */}
        <div className="absolute top-0 left-0 w-1/2 h-3/4 bg-gradient-to-br from-teal-400 to-teal-500 rounded-tl-3xl rounded-bl-lg" />
        {/* Beige curved shape - top right */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-tr-3xl rounded-br-lg" />
        {/* Bottom beige shape - bottom right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-br-3xl rounded-bl-lg" />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            'font-bold text-white',
            textSizeClasses[size]
          )}>
            SUNTYN AI
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              Neural Intelligence
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeometricLogo;