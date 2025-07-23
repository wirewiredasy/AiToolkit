import { LucideIcon } from 'lucide-react';
import { getToolIcon } from '@/lib/tool-icons';

interface ToolIconProps {
  toolId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ToolIcon({ toolId, className = "", size = 'md' }: ToolIconProps) {
  const IconComponent = getToolIcon(toolId);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${className}`} 
    />
  );
}